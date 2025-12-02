import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'https://884a9edb-2422-4222-b55a-b7d6b7be530a.us-east-1.cloud.genez.io';


const isWeb = typeof window !== 'undefined' && typeof window.document !== 'undefined';

const fallbackSecureStore = {
  getItemAsync: async (key) => {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      console.warn('⚠️ Web SecureStore fallback getItemAsync failed:', err.message);
      return null;
    }
  },
  setItemAsync: async (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.warn('⚠️ Web SecureStore fallback setItemAsync failed:', err.message);
    }
  },
  deleteItemAsync: async (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn('⚠️ Web SecureStore fallback deleteItemAsync failed:', err.message);
    }
  },
};

const Storage = isWeb ? fallbackSecureStore : SecureStore;

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,
};

const AuthContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return { ...state, ...action.payload, isInitialized: true };
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null, token: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateApiClient = (token) => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
  };

  const getToken = async () => {
    try {
      const token = await Storage.getItemAsync('jwtToken');
      return token;
    } catch (err) {
      console.error('❌ Error getting token:', err.message);
      return null;
    }
  };

  const setToken = async (token) => {
    try {
      await Storage.setItemAsync('jwtToken', token);
    } catch (err) {
      console.error('❌ Failed to save token to SecureStore:', err.message);
    }
  };

  const deleteToken = async () => {
    try {
      await Storage.deleteItemAsync('jwtToken');
    } catch (err) {
      console.error('❌ Failed to delete token from SecureStore:', err.message);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/auth/user`);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch user:', err.message);
      return null;
    }
  };

  const loginWithEmailPassword = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      const { user, token } = res.data;
      await setToken(token);
      updateApiClient(token);
      dispatch({ type: 'LOGIN', payload: { user, token } });
    } catch (err) {
      console.error('❌ Login error:', err.response?.data || err.message);
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const signUpWithEmailPassword = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/signup`, { email, password });
      const { user, token } = res.data;
      await setToken(token);
      updateApiClient(token);
      dispatch({ type: 'LOGIN', payload: { user, token } });
    } catch (err) {
      console.error('❌ Signup error:', err.response?.data || err.message);
      throw new Error(err.response?.data?.message || 'Signup failed');
    }
  };

  const logout = async () => {
    await deleteToken();
    updateApiClient(null);
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await getToken();

        if (token) {
          updateApiClient(token);
          const user = await fetchUserDetails();

          if (user) {
            dispatch({
              type: 'INIT',
              payload: { isAuthenticated: true, user, token },
            });
            console.log('👤 AuthContext initialized with user:', user);
            return;
          }
        }

        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null, token: null } });
        console.log('👤 AuthContext initialized with no user');
      } catch (err) {
        console.error('❌ Auth initialization failed:', err.message);
        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null, token: null } });
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginWithEmailPassword,
        signUpWithEmailPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export { AuthContext };

export default AuthContext;