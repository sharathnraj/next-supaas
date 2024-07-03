import { FieldError } from 'react-hook-form';

export default function FormInputError({ errors }: { errors?: FieldError }) {
  if (!errors) return null;

  return (
    <div className="flex items-center gap-1">
      <span className="material-icons text-2xl text-feedbackError">error</span>
      <p className="m-0 text-feedbackError">{errors?.message}</p>
    </div>
  );
}
