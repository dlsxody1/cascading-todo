import React from "react";

import TodoBefore from "../components/TodoBefore";
import TodoAfter from "../components/TodoAfter";

const Todo = () => {
  return (
    <div className="w-full h-100vh flex items-center justify-center">
      <div className="w-2/6 h-3/4 bg-orange-200">
        <TodoBefore />
      </div>
      <div className="w-2/6 h-3/4 bg-green-500">
        <TodoAfter />
      </div>
    </div>
  );
};

export default Todo;
