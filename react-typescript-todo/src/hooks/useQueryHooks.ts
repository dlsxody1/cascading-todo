import { useMutation, useQuery, useQueryClient } from "react-query";
import supabase from "../lib/supabase/supabase";

export const useQueryHooks = () => {
  const queryClient = useQueryClient();
  const { getTodo, addTodo, deleteTodo, updateTodo } = supabase;

  const query = ["todos"];

  const useGetTodoQuery = () => {
    const { data, error, isLoading } = useQuery(query, getTodo);
    if (error) throw error;
    return { data, isLoading };
  };

  const useAddTodoQuery = (todo: string) => {
    const { mutate } = useMutation(() => addTodo(todo), {
      onSuccess: () => queryClient.invalidateQueries(query),
      onError: () => {
        console.log("추가 실패!");
      },
    });
    return mutate;
  };

  return { useGetTodoQuery, useAddTodoQuery };
};
