import { Input } from "@nextui-org/react";
import React, { ReactNode, useState } from "react";
import { Control, useController, useForm } from "react-hook-form";
import clsx from "clsx";
import {Eye, EyeSlash} from "@phosphor-icons/react";

interface IInputdiv {
  startContent?: ReactNode;
  endContent?: ReactNode;
  label?: string | ReactNode;
  placeholder?: string;
  control: Control;
  name: string;
  className?: string;
  required?: boolean;
  errors?: any;
  readOnly?: boolean;
  defaultValue?: any;
  isDisabled?: boolean;
  type?: any;
}

const InputComponent = (props: IInputdiv) => {
  const {
    startContent,
    endContent,
    label,
    errors,
    placeholder,
    type,
    className = "",
    control,
    readOnly,
    isDisabled,
    required,
    defaultValue,
    name,
    ...rest
  } = props;
  const { field } = useController({
    name,
    control,
    rules: { required },
  });
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex flex-col gap-1">
      {
        type === "password" ? (
          <Input
            startContent={startContent}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                {isVisible ? (
                  <Eye size={20} />

                ) : (
                  <EyeSlash size={20} />
                )}
              </button>
            }
            name={field?.name}
            type={isVisible ? "text" : "password"}
            onBlur={field.onBlur}
            isDisabled={isDisabled}
            value={field?.value}
            readOnly={readOnly}
            defaultValue={defaultValue}
            onChange={field?.onChange}
            radius="md"
            className={clsx("rounded-md", {
              [className]: !!className,
            })}
            label={
              <>
                {
                  <div className="text-gray-500">
                    {label}
                  </div>
                }
              </>
            }
            classNames={{
              inputWrapper: [
                "border-1",
                "bg-[#08080A08]",
                errors?.[name]?.message
                  ? "!border-error-500"
                  : "border-neutral-100",
                "transition-all border, border-[#08080A1A] data-[hover=true]:bg-[#F4F4F5], data-[hover=true]:border-neutral-300 data-[focus=true]:!bg-[#2EB9FF0D] group-data-[focus=true]:!border-black",
                startContent ? "px-3" : "px-4",
              ],
              input: [readOnly ? "!text-secondary" : "!primary"],
            }}
            placeholder={placeholder}
            labelPlacement="outside"
            {...rest}
          />
        ) : (
          <Input
            startContent={startContent}
            endContent={endContent}
            name={field?.name}
            type={type}
            onBlur={field.onBlur}
            isDisabled={isDisabled}
            value={field?.value}
            readOnly={readOnly}
            defaultValue={defaultValue}
            onChange={field?.onChange}
            radius="md"
            className={clsx("rounded-md", {
              [className]: !!className,
            })}
            label={
              <>
                {
                  <div className="text-gray-500">
                    {label}
                  </div>
                }
              </>
            }
            classNames={{
              inputWrapper: [
                "border-1",
                "bg-[#08080A08]",
                errors?.[name]?.message
                  ? "!border-error-500"
                  : "border-neutral-100",
                "transition-all border, border-[#08080A1A] data-[hover=true]:bg-[#F4F4F5], data-[hover=true]:border-neutral-300 data-[focus=true]:!bg-[#2EB9FF0D] group-data-[focus=true]:border-black",
                startContent ? "px-3" : "px-4",
              ],
              input: [readOnly ? "!text-secondary" : "!primary"],
            }}
            placeholder={placeholder}
            labelPlacement="outside"
            {...rest}
          />
        )
      }

      {errors?.[name]?.message && required && (
        <div className="text-red-500">
          {errors?.[name]?.message}
        </div>
      )}
    </div>
  );
};
export default InputComponent;
