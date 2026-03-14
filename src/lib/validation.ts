export interface ValidationError {
  field: string;
  message: string;
}

export function validateBookInput(title: string, author: string, genre: string): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!title.trim()) errors.push({ field: "title", message: "Title is required" });
  if (!author.trim()) errors.push({ field: "author", message: "Author is required" });
  if (!genre.trim()) errors.push({ field: "genre", message: "Genre is required" });
  return errors;
}
