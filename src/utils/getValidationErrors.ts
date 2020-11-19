import { ValidationError } from 'yup';

interface validationErrors {
  [key: string]: string;
}

export default function getValidationErrors(
  err: ValidationError,
): validationErrors {
  const validationError: validationErrors = {};

  err.inner.forEach(error => {
    validationError[error.path] = error.message;
  });

  return validationError;
}
