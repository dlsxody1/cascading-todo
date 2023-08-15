import { Checkbox } from "@material-tailwind/react";
import React from "react";

const TodoBox = () => {
  return (
    <div>
      <div className=" flex items-center w-full border rounded-md border-blue-gray-300 hover:shadow-md">
        <Checkbox crossOrigin={undefined} />
        <div>할 일</div>
      </div>
    </div>
  );
};

export default TodoBox;
