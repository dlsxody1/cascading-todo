import { ChangeEvent, FormEvent, useState } from "react";
import { signIn } from "../lib/supabase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInput = (initState: any) => {
  const [state, setState] = useState(initState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault();
    if (type === "login") {
      await signIn(state);
    }
  };

  return { onChange, onSubmit, state };
};

export { useInput };
