import { Book } from "./types";
import { supabase } from "./supabase";

export async function getAllBooks(): Promise<Book[]> {
  const { data, error } = await supabase.from('books').select('*').order('title');
  if (error) {
    console.error("Error fetching books:", error);
    return [];
  }
  return data as Book[];
}

export async function addBook(book: Omit<Book, "id">): Promise<Book | null> {
  const { data, error } = await supabase.from('books').insert([book]).select().single();
  if (error) {
    console.error("Error adding book:", error);
    return null;
  }
  return data as Book;
}

export async function deleteBook(id: string): Promise<boolean> {
  const { error } = await supabase.from('books').delete().eq('id', id);
  if (error) {
    console.error("Error deleting book:", error);
    return false;
  }
  return true;
}

export async function borrowBook(id: string): Promise<Book | null> {
  const { data: book, error: fetchError } = await supabase.from('books').select('*').eq('id', id).single();
  if (fetchError || !book) return null;
  
  if (book.borrowed >= book.copies) return null;
  
  const { data: updatedBook, error: updateError } = await supabase
    .from('books')
    .update({ borrowed: book.borrowed + 1 })
    .eq('id', id)
    .select()
    .single();
    
  if (updateError) return null;
  return updatedBook as Book;
}

export async function returnBook(id: string): Promise<Book | null> {
  const { data: book, error: fetchError } = await supabase.from('books').select('*').eq('id', id).single();
  if (fetchError || !book) return null;
  
  if (book.borrowed <= 0) return null;
  
  const { data: updatedBook, error: updateError } = await supabase
    .from('books')
    .update({ borrowed: book.borrowed - 1 })
    .eq('id', id)
    .select()
    .single();
    
  if (updateError) return null;
  return updatedBook as Book;
}

export async function updateCopies(id: string, newCopies: number): Promise<Book | null> {
  const { data: book, error: fetchError } = await supabase.from('books').select('*').eq('id', id).single();
  if (fetchError || !book) return null;
  
  if (newCopies < 1 || newCopies < book.borrowed) return null;
  
  const { data: updatedBook, error: updateError } = await supabase
    .from('books')
    .update({ copies: newCopies })
    .eq('id', id)
    .select()
    .single();
    
  if (updateError) return null;
  return updatedBook as Book;
}
