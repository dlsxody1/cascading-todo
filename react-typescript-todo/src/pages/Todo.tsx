import { useEffect, useState } from "react";
import TodoBefore from "../components/TodoBefore";
import supabase from "../lib/supabase/supabase";
import Error from "../components/Error";

const Todo = () => {
  const { getSocialSession } = supabase;
  const [socialSession, setSocialSession] = useState("");
  useEffect(() => {
    getSocialSession().then((session) => {
      setSocialSession(session.session?.access_token as string);
    });
  }, []);

  if (socialSession == undefined) return <Error />;
  return (
    <>
      <div className="w-full h-100vh flex items-center justify-center">
        <div className="w-1/2 h-3/4 bg-orange-200">
          <TodoBefore />
        </div>
      </div>
    </>
  );
};

export default Todo;
