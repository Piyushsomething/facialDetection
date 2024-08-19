import { create } from "zustand";
import apiService from "@/components/Home/apiService";

const useStore = create((set, get) => ({
  accessToken: null,
  entries: [],
  isLoggedIn: false,
  loginError: "",
  signupError: "",
  uploadError: "",
  username: null,
  isLoading: false,
  tokenError: '',

  setAccessToken: (token) => set({ accessToken: token }),
  setEntries: (entries) => set({ entries }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setLoginError: (error) => set({ loginError: error }),
  setSignupError: (error) => set({ signupError: error }),
  setUploadError: (error) => set({ uploadError: error }),

  login: async (username, password) => {
    try {
      const data = await apiService.login(username, password);
      set({
        accessToken: data.access_token,
        isLoggedIn: true,
        loginError: "",
        username: username,
      });
      localStorage.setItem("access_token", data.access_token);
      return true;
    } catch (error) {
      set({ loginError: "Incorrect username or password." });
      return false;
    }
  },

  signup: async (username, password) => {
    try {
      await apiService.signup(username, password);
      set({ signupError: "" });
      return true;
    } catch (error) {
      set({ signupError: error.message });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("access_token");
    set({ accessToken: null, isLoggedIn: false, entries: [], username: null });
  },

  fetchUsername: async (accessToken) => {
    set({ isLoading: true,tokenError: '' });
    try {
      // const token = localStorage.getItem('access_token');
      const data = await apiService.fetchUsername(accessToken);
      set({ username: data.username });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        set({ tokenError: 'Session expired or invalid token.', isLoggedIn: false });
      } else {
        console.error('Error fetching username:', error);
      }
    } finally {
      set({ isLoading: false });
    }
  },
  fetchEntries: async () => {
    try {
      const token = get().accessToken;
      const data = await apiService.fetchEntries(token);
      set({ entries: data });
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  },

  uploadEntry: async (formData) => {
    try {
      const token = get().accessToken;

      await apiService.uploadEntry(formData, token);
      set({ uploadError: "" });
      return true;
    } catch (error) {
      set({ uploadError: "Failed to upload entry. Please try again." });
      return false;
    }
  },
}));

export default useStore;
