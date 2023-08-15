import { createClient } from "@supabase/supabase-js";
import type { ProviderTypes } from "../../types/LoginProps";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

const getTodo = async () => {
  const { data: todo, error } = await supabase.from("vitetodo").select();
  console.log("요청함");
  if (error) throw error;
  //DB에서 에러가 발생했을 때 에러를 받기 위함.
  return todo;
};

const addTodo = async (todo: string) => {
  const { error } = await supabase
    .from("vitetodo")
    .insert([{ todo: todo }])
    .select();
  //insert문을 쓰고나서 select문을 사용한 이유는
  //데이터가 잘 들어갔는지 확인하기 위함.
  if (error) throw error;
};

const deleteTodo = async (id: string) => {
  const { error } = await supabase.from("vitetodo").delete().eq("id", id);

  if (error) throw error;
};

const updateTodo = async (todo: string, id: string) => {
  const { error } = await supabase
    .from("vitetodo")
    .update({
      todo,
    })
    .eq("id", id);
  console.log("업데이트 잘됐음");
  if (error) throw error;
};

export const signIn = async (provider: ProviderTypes): Promise<void> => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
  });
  if (error) throw error;
};

export default { updateTodo, addTodo, deleteTodo, getTodo, signIn };
