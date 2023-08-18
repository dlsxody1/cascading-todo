import { useState } from "react";

interface ICheckProps {
  id: number;
  toggle: boolean;
}
export const useCheckout = () => {
  const [checkValue, setCheckValue] = useState<ICheckProps | undefined>();
  const [completedTodos, setCompletedTodos] = useState<number[]>([]);

  const toggleCheckBox = (id: number) => {
    setCheckValue((prev) => {
      if (prev?.id !== id) {
        return { id, toggle: true };
      } else {
        return undefined;
      }
    });
  };

  const changeCheckBox = (id: number) => {
    if (completedTodos?.includes(id)) {
      setCompletedTodos(
        completedTodos.filter((completedId) => completedId !== id)
      );
    } else {
      setCompletedTodos([...completedTodos, id]);
    }
  };
  return {
    toggleCheckBox,
    setCheckValue,
    checkValue,
    changeCheckBox,
    completedTodos,
  };
};
