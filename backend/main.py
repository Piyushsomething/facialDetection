from typing import Optional, List
from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy import Integer, create_engine, Column, String, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.staticfiles import StaticFiles
from contextlib import contextmanager

# Database setup
DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, pool_size=20, max_overflow=0)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Context manager for database sessions
@contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Security setup
SECRET_KEY = "bhaad_m_jaaye"
ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Create a user model
class User(Base):
    __tablename__ = "users"
    username = Column(String, primary_key=True, index=True)
    hashed_password = Column(String)
    disabled = Column(Boolean, default=False)

# Create an entry model
class Entry(Base):
    __tablename__ = "entries"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    identity_number = Column(String)
    country = Column(String)
    date_of_operation = Column(String)  # Use date type in production
    area_of_operation = Column(String)
    weapons_details = Column(String)
    vessel_name = Column(String)
    vessel_captured_by_pirates = Column(Boolean)
    association_with_company = Column(String, nullable=True)
    last_sighting = Column(String)
    naval_ship_name = Column(String)
    remarks = Column(String, nullable=True)
    user_id = Column(String)  # Foreign key to User
    file_path = Column(String)  # New column to store file path
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI()
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Security
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Pydantic models
class UserCreate(BaseModel):
    username: str
    password: str

class UserInDB(UserCreate):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str
class UserResponse(BaseModel):
    username : str
class TokenData(BaseModel):
    username: str

class EntryModel(BaseModel):
    name: str
    identity_number: str
    country: str
    date_of_operation: str
    area_of_operation: str
    weapons_details: str
    vessel_name: str
    vessel_captured_by_pirates: bool
    association_with_company: Optional[str] = None
    last_sighting: str
    naval_ship_name: str
    remarks: Optional[str] = None
class EntryResponse(BaseModel):
    id: int
    name: str
    identity_number: str
    country: str
    date_of_operation: str
    area_of_operation: str
    weapons_details: str
    vessel_name: str
    vessel_captured_by_pirates: bool
    association_with_company: Optional[str] = None
    last_sighting: str
    naval_ship_name: str
    remarks: Optional[str] = None
    file_path: str  # Include file path in the response

    class Config:
        from_attributes = True

# Utility functions
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(SessionLocal(), token_data.username)
    if user is None:
        raise credentials_exception
    return user
def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    with get_db() as db:
        user = get_user(db, token_data.username)
    if user is None:
        raise credentials_exception
    return user

# Routes
@app.post("/signup/", response_model=UserCreate)
async def signup(user: UserCreate):
    with get_db() as db:
        if get_user(db, user.username):
            raise HTTPException(status_code=400, detail="Username already registered")
        hashed_password = get_password_hash(user.password)
        new_user = User(username=user.username, hashed_password=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    return user

@app.post("/token/", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    with get_db() as db:
        user = get_user(db, form_data.username)
        if not user or not verify_password(form_data.password, user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect username or password")
        access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/entries/")
async def create_entry(
    name: str = Form(...),
    identity_number: str = Form(...),
    country: str = Form(...),
    date_of_operation: str = Form(...),
    area_of_operation: str = Form(...),
    weapons_details: str = Form(...),
    vessel_name: str = Form(...),
    vessel_captured_by_pirates: bool = Form(...),
    association_with_company: Optional[str] = Form(None),
    last_sighting: str = Form(...),
    naval_ship_name: str = Form(...),
    remarks: Optional[str] = Form(None),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    with get_db() as db:
        # Save the uploaded file
        file_location = f"uploads/{file.filename}"
        with open(file_location, "wb") as f:
            content = await file.read()
            f.write(content)
    # Create a new entry instance
    entry_data = Entry(
        name=name,
        identity_number=identity_number,
        country=country,
        date_of_operation=date_of_operation,
        area_of_operation=area_of_operation,
        weapons_details=weapons_details,
        vessel_name=vessel_name,
        vessel_captured_by_pirates=vessel_captured_by_pirates,
        association_with_company=association_with_company,
        last_sighting=last_sighting,
        naval_ship_name=naval_ship_name,
        remarks=remarks,
        user_id=current_user.username,
        file_path=file_location  # Save the file path
    )

    db.add(entry_data)
    db.commit()
    db.refresh(entry_data)

    return JSONResponse(status_code=201, content={"message": "Entry created successfully", "file_location": file_location})

@app.get("/entries/me/", response_model=List[EntryResponse])
async def read_user_entries(current_user: User = Depends(get_current_user)):
    db = SessionLocal()
    entries = db.query(Entry).filter(Entry.user_id == current_user.username).all()
    
    return entries  # This now includes file_path

@app.get("/whoami/")
async def whoami(current_user: User = Depends(get_current_user)):
    return UserResponse(username=current_user.username)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
