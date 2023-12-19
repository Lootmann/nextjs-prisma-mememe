import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex flex-col gap-4 text-xl">{children}</div>
  );
}
