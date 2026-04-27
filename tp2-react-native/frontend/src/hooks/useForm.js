import { useState } from "react";

export const useForm = (initialValue) => {
  const [formState, setForm] = useState(initialValue);

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;

    const valueToUpdate = type === "checkbox" ? checked : value;

    setForm({ ...formState, [name]: valueToUpdate });
  };

  const handleReset = () => {
    console.log(initialValue);
    setForm(initialValue);
  };

  return {
    formState,
    handleChange,
    handleReset,
    setForm,
  };
};

//Empezar por event e ir mirando la consola para ver como funciona el objeto.
