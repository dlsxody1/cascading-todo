import "./style/todo.css";
import { useEffect, useState } from "react";
import supabase from "./lib/supabase/supabase";
import { useQuery } from "react-query";
// eslint-disable-next-line no-unused-vars

function App() {
  const { addTodo, deleteTodo, getTodo, updateTodo } = supabase;
  const [inputData, setInputData] = useState("");
  const [todoToggle, setTodoToggle] = useState(false);
  const { data, refetch } = useQuery(["todo"], getTodo, {
    refetchOnMount: true,
  });

  // issue 발생
  // todo를 삭제했을 때 refetch가 안됨
  // 시도 1.

  useEffect(() => {
    refetch();
  }, [data]);

  const onChangeValue = (e) => {
    setInputData(e.target.value);
  };

  const onSubmitValue = (e, todo) => {
    e.preventDefault();
    addTodo(inputData);
    console.log("데이터 잘 들어갑니다.");
  };

  const modifyTodo = () => {
    setTodoToggle((prev) => !prev);
    console.log(todoToggle);
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
                            onClick={() => {
                              deleteTodo(el.id);
                            }}
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
