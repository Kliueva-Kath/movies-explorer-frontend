import { useState, useCallback } from "react";
import * as EmailValidator from "email-validator";

export default function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(false);

  const handleChange = (evt) => {
    const validityState = evt.target.validity;
    const { value, name } = evt.target;
    if (name === "email") {
      if (validityState.valueMissing) {
        evt.target.setCustomValidity("Пожалуйста заполните это поле");
      } else if (!EmailValidator.validate(value)) {
        evt.target.setCustomValidity("Необходимо ввести корректный e-mail");
      } else {
        evt.target.setCustomValidity("");
      }
    }

    if (name === "name") {
      if (validityState.valueMissing) {
        evt.target.setCustomValidity("Пожалуйста заполните это поле");
      } else if (validityState.tooShort) {
        evt.target.setCustomValidity("Имя должно содержать от двух символов");
      } else if (validityState.patternMismatch) {
        evt.target.setCustomValidity(
          "Имя должно содержать только латиницу, кириллицу, пробел или дефис"
        );
      } else {
        evt.target.setCustomValidity("");
      }
    }

    if (name === "password") {
      if (validityState.valueMissing) {
        evt.target.setCustomValidity("Пожалуйста заполните это поле");
      } else if (validityState.tooShort) {
        evt.target.setCustomValidity("Пароль должно содержать от 8 символов");
      } else {
        evt.target.setCustomValidity("");
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setValid(evt.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setValid(newIsValid);
    },
    [setValues, setErrors, setValid]
  );
  return {
    values,
    handleChange,
    setValues,
    errors,
    setErrors,
    isValid,
    setValid,
    resetForm,
  };
}
