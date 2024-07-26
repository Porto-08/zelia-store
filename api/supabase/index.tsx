import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mirhpwnicgjjffmsedfg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcmhwd25pY2dqamZmbXNlZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2ODM4MDgsImV4cCI6MjAzNzI1OTgwOH0.gH3jpsGD37MNQ60yqTBxLgRqFlwQT4z2LWEWf8-6saY"
);

export default supabase;
