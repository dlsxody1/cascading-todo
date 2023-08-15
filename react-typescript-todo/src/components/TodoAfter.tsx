import { Checkbox } from "@material-tailwind/react";
import React from "react";

const TodoAfter = () => {
  return (
    <div className="flex items-center w-40 border rounded-md border-blue-gray-300 hover:shadow-md">
      <Checkbox crossOrigin={undefined} />
      <div>할 일</div>
    </div>
  );
};

export default TodoAfter;
