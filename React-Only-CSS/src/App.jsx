import "./style/todo.css";
import { useEffect, useState } from "react";
import supabase from "./lib/supabase/supabase";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useGetQuery, usePostQuery } from "./hooks/useQueryhooks";
// eslint-disable-next-line no-unused-vars

function App() {
  const { addTodo, deleteTodo, getTodo, updateTodo } = supabase;
  const [inputData, setInputData] = useState("");
  const [todoToggle, setTodoToggle] = useState(false);
  //
  const queryClient = useQueryClient();
  const query = ["todo"];
  const { data } = useQuery(["todo"], getTodo);

  const { mutate } = useMutation((id) => deleteTodo(id), {
    onSuccess: () => queryClient.invalidateQueries(query),
    onError: () => {
      console.log("삭제 실패!");
    },
  });

  const postMutate = useMutation((inputData) => addTodo(inputData), {
    onSuccess: () => queryClient.invalidateQueries(query),
    onError: () => {
      console.log("추가 실패!");
    },
  });
  const onSubmitValue = (e, todo) => {
    e.preventDefault();
    postMutate.mutate(todo);
    console.log(todo);
  };

  const onChangeValue = (e) => {
    setInputData(e.target.value);
  };

  const modifyTodo = () => {
    setTodoToggle((prev) => !prev);
  };

  return (
    <>
      <div>
        <div className="wrapper">
          <div className="todo__container">
            <div className="todo__list__container">
              <div className="todo__list__title">TODO LIST</div>
              <form
                className="todo__form"
                onSubmit={(e) => onSubmitValue(e, inputData)}
              >
                <input
                  className="todo__input"
                  type="text"
                  placeholder="할 일을 입력하세요"
                  onChange={onChangeValue}
                />
                <button className="todo__button">추가</button>
              </form>
              <div className="todo__list">
                <div className="todo">
                  {data?.map((el) => {
                    return (
                      <div className="todo__box" key={el.id} name={el.id}>
                        <div>{el.todo}</div>
                        <div className="button__box">
                          <button
                            className="button__modify"
                            onClick={modifyTodo}
                          >
                            수정
                          </button>
                          <button
                            className="button__delete"
                            onClick={() => mutate(el.id)}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
