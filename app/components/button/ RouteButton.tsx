"use client";

import { useRouter } from "next/navigation";
import { RouteButtonProps } from "@/app/types/route";

export const RouteButton = ({
  title,
  href,
  className,
  disabled,
}: RouteButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => router.push(href)}
      className={className}
    >
      {title}
    </button>
  );
};
