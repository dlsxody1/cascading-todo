import React, { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useInput } from "../hooks/useInput";

const SignIn = () => {
  const [inputValue] = useState();
  const { onChange, onSubmit, value } = useInput(inputValue);

  return (
    <div className="flex items-center justify-center h-100vh">
      <div className="flex flex-col h-2/3 w-96 p-4 border border-black ">
        <Typography className="text-center text-lg mb-3">
          인가된 사용자만 로그인 가능합니다
        </Typography>
        <form className="mt-3" onSubmit={onSubmit}>
          <Input
            className=" mb-3"
            label="Email"
            crossOrigin={undefined}
            onChange={onChange}
          />
          <Input
            className=" mb-3"
            label="Password"
            crossOrigin={undefined}
            onChange={onChange}
          />
          <div>
            <Button>버튼</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
