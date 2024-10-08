export type Category = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export type CategoryDTO = {
  name?: string;
  description?: string;
}