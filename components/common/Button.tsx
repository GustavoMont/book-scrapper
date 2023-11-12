import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ButtonColors = "primary" | "danger";

type Props = {
  icon?: JSX.Element;
  color?: ButtonColors;
  isLoading?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const buttonStyles: Record<ButtonColors, string> = {
  danger: "bg-red-500 text-white hover:bg-red-600", //className,
  primary: "bg-emerald-400 text-white hover:bg-emerald-600",
};

export const Button: React.FC<PropsWithChildren<Props>> = ({
  color = "primary",
  icon,
  children,
  className,
  isLoading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        `py-2 transition-all duration-100 ease-in-out flex gap-4 items-center self-end px-5 rounded-full text-center  hover:scale-105 trasnform active:scale-95 ${buttonStyles[color]}`,
        className
      )}
    >
      {isLoading ? (
        <div className="animate-spin h-6 w-6 aspect-square rounded-full border-l border-t border-white" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
};
