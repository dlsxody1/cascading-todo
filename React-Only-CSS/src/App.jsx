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
  const [modifyInputData, setModifyInputData] = useState("");
  const [todoToggle, setTodoToggle] = useState({
    id: 0,
    toggle: false,
  });

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

  const updataMutate = useMutation(
    (modifyInputData, id) => updateTodo(modifyInputData, id),
    {
      onSuccess: () => queryClient.invalidateQueries(query),
      onError: () => {
        console.log("추가 실패!");
      },
    }
  );

  const modifyOnSubmitValue = (e, todo, id) => {
    e.preventDefault();
    updataMutate(todo, id).mutate(todo);
    console.log(todo);
  };
  const onSubmitValue = (e, todo) => {
    e.preventDefault();
    postMutate.mutate(todo);
    console.log(todo);
  };

  const onChangeValue = (e) => {
    setInputData(e.target.value);
  };

  const modifyOnChangeValue = (e) => {
    setModifyInputData(e.target.value);
    console.log(modifyInputData);
  };

  const modifyTodo = (id) => {
    const todoId = parseInt(id);
    setTodoToggle((prev) => {
      console.log(prev.id);
      if (prev.id !== id) {
        return { id: todoId, toggle: true };
      } else {
        return { id, toggle: false };
      }
    });
  };

  const updateSubmitTodo = (e, todo, id) => {
    e.preventDefault();
    updateTodo(todo, id);
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
                        {todoToggle.id !== el.id || !todoToggle.toggle ? (
                          <div>{el.todo}</div>
                        ) : (
                          <input
                            onChange={modifyOnChangeValue}
                            name={el.id}
                            type="text"
                            defaultValue={el.todo}
                          />
                        )}

                        <div className="button__box">
                          {todoToggle.id !== el.id || !todoToggle.toggle ? (
                            <button
                              className="button__modify"
                              onClick={() => modifyTodo(el.id)}
                              data-todo-id={el.id}
                            >
                              수정
                            </button>
                          ) : (
                            <form
                              onSubmit={(e) =>
                                updateSubmitTodo(e, modifyInputData, el.id)
                              }
                            >
                              <button className="button__modify__submit">
                                완료
                              </button>
                            </form>
                          )}

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
