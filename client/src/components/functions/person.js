import axios from "axios";
const API = "http://localhost:8000/api";

export const createPerson = async (formData, authtoken,setUploadPerscentage) =>
  await axios.post(`${API}/person`, formData, {
    headers: {
      authtoken,
    },
    onUploadProgress:progressEvent =>{
      setUploadPerscentage(
        parseInt(Math.round((progressEvent.loaded *100)/progressEvent.total)));
    }
  });

export const getPerson = async (authtoken) =>
  await axios.get(`${API}/person`, {
    headers: {
      authtoken,
    },
  });

  export const getPersons = async (id,authtoken) =>
  await axios.get(`${API}/person/${id}`, {
    headers: {
      authtoken,
    },
  });

export const removePerson = async (id,authtoken) =>
  await axios.delete(`${API}/person/${id}`, {
    headers: {
      authtoken,
    },
  });

export const updatePerson = async (name,id,authtoken) =>
  await axios.put(`${API}/person/${id}`,
  name, {
    headers: {
      authtoken,
    },
  });

