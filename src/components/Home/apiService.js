const apiService = {
  async fetchUsername(token) {
    const response = await fetch('/api/username', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      throw { response: { status: 401 } };
    }
    if (!response.ok) {
      throw new Error("Failed to fetch username");
    }
    return await response.json();
  },

  async fetchEntries(token) {
    try {
      const response = await fetch('/api/entries', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching entries:", error);
      throw error;
    }
  },

  async uploadEntry(formData, accessToken) {
    try {
      const response = await fetch('/api/entries', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload entry");
      }
      return await response.json();
    } catch (error) {
      console.error("Error uploading entry:", error);
      throw error;
    }
  },

  async login(username, password) {
    try {
      const response = await fetch('/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  async signup(username, password) {
    try {
      const response = await fetch('/api/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Signup failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },
};

export default apiService;