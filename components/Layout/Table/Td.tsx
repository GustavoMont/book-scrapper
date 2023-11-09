import React, { PropsWithChildren } from "react";

interface Props {
  as?: "td" | "th";
  dataType?: "text" | "number";
}

export const Td: React.FC<PropsWithChildren<Props>> = ({
  children,
  as: tag = "td",
  dataType = "text",
}) => {
  const Tag = tag;
  return (
    <Tag
      className={`border transition-all duration-150 ease-in-out border-emerald-400 py-2 px-4 ${
        dataType === "number" ? "text-right" : ""
      }`}
    >
      {children}
    </Tag>
  );
};
