import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xzfgxjxtonmbvenqynts.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Zmd4anh0b25tYnZlbnF5bnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTE5NzQsImV4cCI6MjA4OTQ4Nzk3NH0.T0F7A7l-XOU9IxC1aycxx2EGFYtt2zUQN2XhmpnH6Ik"
);

async function test() {
  console.log("Fetching books...");
  const { data, error } = await supabase.from('books').select('*');
  if (error) {
    console.error("Fetch Error:", error);
  } else {
    console.log("Books fetched:", data);
  }

  console.log("Adding a test book...");
  const { data: insertData, error: insertError } = await supabase.from('books').insert([{
    title: "Test Book API",
    author: "Agent",
    genre: "Testing",
    copies: 1,
    borrowed: 0
  }]).select();

  if (insertError) {
    console.error("Insert Error:", insertError);
  } else {
    console.log("Insert Success:", insertData);
  }
}

test();
