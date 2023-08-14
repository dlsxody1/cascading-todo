import React from "react";
import { Typography } from "@material-tailwind/react";
import { AiFillGithub } from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "../lib/supabase";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center h-100vh">
      <div className="flex flex-col h-2/3 w-96 p-4 border border-black ">
        <Typography className="text-center text-lg mb-3">
          회원 가입하고 Todo List를 작성해보세요!
        </Typography>
        <form className="mt-3 flex items-center justify-center flex-col">
          <button onClick={() => signIn("kakao")}>
            <div className="flex  text-sm whitespace-nowrap items-center bg-kakao w-48 h-10 rounded-lg p-3 m-4">
              <RiKakaoTalkFill className="mr-3 text-lg" />
              <div>카카오로 로그인하기</div>
            </div>
          </button>
          <button onClick={() => signIn("github")}>
            <div className="flex  text-sm whitespace-nowrap items-center bg-githup text-white w-48 h-10 rounded-lg p-3 m-4">
              <AiFillGithub className="mr-3 text-lg" />
              <div>깃허브로 로그인하기</div>
            </div>
          </button>
          <button onClick={() => signIn("google")}>
            <div className="flex  text-sm whitespace-nowrap items-center border w-48 h-10 rounded-lg p-3 m-4">
              <FcGoogle className="mr-3 text-lg" />
              <div>구글로 로그인하기</div>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
