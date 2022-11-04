import { useState } from "react";

export default function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
