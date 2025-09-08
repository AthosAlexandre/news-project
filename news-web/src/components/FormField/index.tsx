"use client";

import { ChangeEvent, forwardRef } from "react";
import clsx from "clsx";

type BaseProps = {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
};

type InputProps = BaseProps & {
  as?: "input";
  type?: "text" | "email" | "password" | "url";
};

type TextareaProps = BaseProps & {
  as: "textarea";
  rows?: number;
};

export type FormFieldProps = InputProps | TextareaProps;

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  (props, ref) => {
    const {
      id,
      name,
      label,
      value,
      onChange,
      required,
      disabled,
      className,
      error,
    } = props;

    const isTextarea = props.as === "textarea";

    const fieldClasses = clsx(
      "peer w-full rounded-lg border bg-white px-4 py-3 text-gray-900 placeholder-transparent",
      "outline-none transition focus:border-[#199BD7] focus:ring-4 focus:ring-[#199BD7]/20",
      "border-gray-300",
      disabled && "opacity-60 cursor-not-allowed",
      error && "border-red-400 focus:border-red-500 focus:ring-red-200",
      className
    );

    const labelClasses = clsx(
      "pointer-events-none absolute left-3 bg-white px-1 text-gray-500 transition-all",
      "top-1/2 -translate-y-1/2 text-base",
      "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2",
      "peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-[#199BD7]",
      "peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs",
      error && "peer-focus:text-red-600"
    );

    return (
      <div className="relative">
        {isTextarea ? (
          <textarea
            ref={ref as any}
            id={id}
            name={name ?? id}
            rows={(props as TextareaProps).rows ?? 6}
            className={clsx(
              fieldClasses,
              "min-h-[160px]"
            )}
            placeholder=" "
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
          />
        ) : (
          <input
            ref={ref as any}
            id={id}
            name={name ?? id}
            type={(props as InputProps).type ?? "text"}
            className={fieldClasses}
            placeholder=" "
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
          />
        )}

        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;
