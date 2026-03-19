import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xzfgxjxtonmbvenqynts.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Zmd4anh0b25tYnZlbnF5bnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTE5NzQsImV4cCI6MjA4OTQ4Nzk3NH0.T0F7A7l-XOU9IxC1aycxx2EGFYtt2zUQN2XhmpnH6Ik";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
