import { Button, Checkbox } from "@material-tailwind/react";
import React, { useState } from "react";
import { useQueryHooks } from "../hooks/useQueryHooks";
import Loading from "./Loading";
import { ResponseProps } from "../types/TodoProps";

const TodoBox = () => {
  const { useGetTodoQuery, useDeleteTodoQuery, useUpdateTodoQuery } =
    useQueryHooks();
  const { data, isLoading } = useGetTodoQuery();
  const { deleteTodoHandler } = useDeleteTodoQuery();
  const { updateTodoHandler } = useUpdateTodoQuery();
  const [completedTodos, setCompletedTodos] = useState<number[]>([]);
  const [modifyInputData, setModifyInputData] = useState("");
  const [todoToggle, setTodoToggle] = useState({
    id: 0,
    toggle: false,
  });

  const modifyOnChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifyInputData(e.target.value);
    console.log(modifyInputData);
  };

  const modifyTodo = (id: number) => {
    setTodoToggle((prev) => {
      console.log(prev.id);
      if (prev.id !== id) {
        return { id: id, toggle: true };
      } else {
        return { id, toggle: false };
      }
    });
  };

  const handleCheckboxChange = (id: number) => {
    if (completedTodos.includes(id)) {
      setCompletedTodos(
        completedTodos.filter((completedId) => completedId !== id)
      );
    } else {
      setCompletedTodos([...completedTodos, id]);
    }
  };

  return (
    <div>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : data?.length === 0 ? (
        <div className="flex  bg-white justify-center  items-center w-full h-96 border rounded-md border-blue-gray-300 hover:shadow-md mb-3">
          할 일이 없습니다~ 오늘 할 일을 적어보세요 !
        </div>
      ) : (
        data?.map(({ todo, createdAt, id }: ResponseProps) => {
          const isCompelted = completedTodos.includes(Number(id));
          return (
            <div
              key={id}
              id={id.toString()}
              className="flex justify-between bg-white  items-center w-full border rounded-md border-blue-gray-300 hover:shadow-md mb-3 "
            >
              <Checkbox
                checked={isCompelted}
                crossOrigin={undefined}
                onChange={() => handleCheckboxChange(Number(id))}
              />
              {todoToggle.id !== Number(id) || !todoToggle.toggle ? (
                <div className={`${isCompelted ? "line-through" : ""}`}>
                  {todo}
                </div>
              ) : (
                <input
                  onChange={modifyOnChangeValue}
                  name={id.toString()}
                  type="text"
                  defaultValue={todo}
                />
              )}

              <div>{createdAt?.toISOString()}</div>
              <div className="">
                {todoToggle.id !== Number(id) || !todoToggle.toggle ? (
                  <Button
                    onClick={() => modifyTodo(Number(id))}
                    className="bg-green-400 m-2"
                  >
                    수정
                  </Button>
                ) : (
                  <Button
                    className="bg-blue-500"
                    onClick={() => {
                      updateTodoHandler({ id, todo: modifyInputData });
                      modifyTodo(Number(id));
                    }}
                  >
                    완료
                  </Button>
                )}

                <Button
                  className="bg-red-400 m-2"
                  onClick={() => deleteTodoHandler(Number(id))}
                >
                  삭제
                </Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TodoBox;
