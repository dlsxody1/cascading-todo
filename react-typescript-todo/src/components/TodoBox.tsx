import { Button, Checkbox } from "@material-tailwind/react";
import { useQueryHooks } from "../hooks/useQueryHooks";
import Loading from "./Loading";
import { ResponseProps } from "../types/TodoProps";
import { useCheckout } from "../hooks/useCheckout";
import { useInput } from "../hooks/useInput";

const TodoBox = () => {
  const { useGetTodoQuery, useDeleteTodoQuery, useUpdateTodoQuery } =
    useQueryHooks();
  const { data, isLoading } = useGetTodoQuery();
  const { deleteTodoHandler } = useDeleteTodoQuery();
  const { updateTodoHandler } = useUpdateTodoQuery();
  const {
    toggleCheckBox,
    checkValue,
    setCheckValue,
    changeCheckBox,
    completedTodos,
  } = useCheckout();
  const { onTextChange, state } = useInput("");

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
        data?.map(({ todo, id }: ResponseProps) => {
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
                onChange={() => changeCheckBox(Number(id))}
              />
              {checkValue?.id !== Number(id) || !checkValue?.toggle ? (
                <div className={`${isCompelted ? "line-through" : ""}`}>
                  {todo}
                </div>
              ) : (
                <input
                  onChange={onTextChange}
                  name={id.toString()}
                  type="text"
                  defaultValue={todo}
                />
              )}

              <div>
                {checkValue?.id !== Number(id) || !checkValue?.toggle ? (
                  <Button
                    onClick={() => {
                      toggleCheckBox(Number(id));
                    }}
                    className="bg-green-400 m-2"
                  >
                    수정
                  </Button>
                ) : (
                  <Button
                    className="bg-blue-500"
                    onClick={() => {
                      updateTodoHandler({ id, todo: state });
                      toggleCheckBox(Number(id));
                      setCheckValue(undefined);
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
