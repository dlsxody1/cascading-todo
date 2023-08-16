import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  const useAddTodoQuery = () => {
    const { mutate } = useMutation((todo: string) => addTodo(todo), {
      onSuccess: () => queryClient.invalidateQueries(query),
      onError: () => {
        console.log("추가 실패!");
      },
    });
    return { addTodoHandler: mutate };
  };

  const useDeleteTodoQuery = () => {
    const { mutate } = useMutation((id: number) => deleteTodo(id), {
      onSuccess: () => queryClient.invalidateQueries(query),
      onError: () => {
        console.log("추가 실패!");
      },
    });
    return { deleteTodoHandler: mutate };
  };

  const useUpdateTodoQuery = () => {
    const { mutate } = useMutation(
      ({ id, todo }: { id: number; todo: string }) => updateTodo(id, todo),
      {
        onSuccess: () => queryClient.invalidateQueries(query),
        onError: () => {
          console.log("추가 실패!");
        },
      }
    );
    return { updateTodoHandler: mutate };
  };

  return {
    useGetTodoQuery,
    useAddTodoQuery,
    useDeleteTodoQuery,
    useUpdateTodoQuery,
  };
};
