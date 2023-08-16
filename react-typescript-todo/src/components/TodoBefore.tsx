import { Typography } from "@material-tailwind/react";
import TodoBox from "./TodoBox";
import { useQueryHooks } from "../hooks/useQueryHooks";
import { useState } from "react";

const TodoBefore = () => {
  const { useAddTodoQuery } = useQueryHooks();
  const { addTodoHandler } = useAddTodoQuery();
  const [todo, setTodo] = useState("");
  const todoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  const todoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodo("");
    addTodoHandler(todo);
  };
  return (
    <>
      <form
        onSubmit={(e) => todoSubmit(e)}
        className="flex justify-center items-center flex-col "
      >
        <Typography>오늘 할 일</Typography>
        <input
          value={todo}
          onChange={(e) => todoInputChange(e)}
          className="w-2/3 mb-6"
          placeholder="오늘 할 일을 적어 보세요"
        />
      </form>
      <div className="h-4/6 m-5  scrollbar-hide overflow-scroll">
        <TodoBox />
      </div>
    </>
  );
};

export default TodoBefore;
