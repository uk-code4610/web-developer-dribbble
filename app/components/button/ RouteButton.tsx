import { useRouter } from "next/navigation";

type RouteButtonProps = {
  title: string;
  href: string;
  className?: string;
  disabled?: boolean;
};

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
