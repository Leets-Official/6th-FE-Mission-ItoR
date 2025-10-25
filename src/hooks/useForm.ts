import { useState, useCallback } from "react";

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

interface UseFormParams {
  initialValues: FormValues;
  validate?: (values: FormValues) => FormErrors;
}

interface UseFormReturn {
  values: FormValues;
  errors: FormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  reset: () => void;
  setValue: (name: string, value: string) => void;
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
  runValidation: () => boolean;
}

export function useForm({ initialValues, validate }: UseFormParams): UseFormReturn {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const runValidation = useCallback(() => {
    if (!validate) return true;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const hasError = Object.values(nextErrors).some((msg) => msg && msg.length > 0);
    return !hasError;
  }, [validate, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const setValue = useCallback((name: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return {
    values,
    errors,
    handleChange,
    reset,
    setValue,
    setValues,
    runValidation,
  };
}
