import axios from "axios";

export const api = axios.create({
  baseURL: "https://mirhpwnicgjjffmsedfg.supabase.co/rest/v1",
  headers: {
    apikey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcmhwd25pY2dqamZmbXNlZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2ODM4MDgsImV4cCI6MjAzNzI1OTgwOH0.gH3jpsGD37MNQ60yqTBxLgRqFlwQT4z2LWEWf8-6saY",
  },
});
