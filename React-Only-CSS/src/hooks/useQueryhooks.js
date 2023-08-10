import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import supabase from "../lib/supabase/supabase";

/**
 * 데이터를 불러들여 오는데만 사용한다.
 */

const { addTodo } = supabase;
export const useGetQuery = (queryVal, queryFn) => {
  const { data } = useQuery(queryVal, queryFn);
  return data;
};

export const usePostQuery = (todo, query) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addTodo(todo), {
    onSuccess: () => queryClient.invalidateQueries(query),
    onError: () => {
      console.log("만들기 실패!");
    },
  });

  return mutate;
};
