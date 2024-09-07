import axios from "axios";

export const api = axios.create({
  baseURL: process.env.SUPABASE_URL,
  headers: {
    apikey: process.env.SUPABASE_KEY,
  },
});
