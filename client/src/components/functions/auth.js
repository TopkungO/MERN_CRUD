import axios from "axios";
const API = "http://localhost:8000/api";


export const registerHandler = async (user) => {
  return await axios.post(`${API}/register`, user, {
    headers: {
      "content-Type": "application/json",
    },
  });
};

export const loginHandler = async (user) => {
  return await axios.post(`${API}/login`, user, {
    headers: {
      "content-Type": "application/json",
    },
  });
};

export const currentUser = async (authtoken) => {
  return await axios.post(`${API}/current-user`,
   {}, {
    headers: {
      authtoken
    },
  });
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(`${API}/current-admin`,
   {}, {
    headers: {
      authtoken
    },
  });
};
