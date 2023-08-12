import { ChangeEvent, FormEvent, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInput = (initState: any) => {
  const [value, setValue] = useState(initState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return { onChange, onSubmit, value };
};

export { useInput };
