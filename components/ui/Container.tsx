import { cn } from "@/lib/utils";

/** 1400px max width with 20 / 28 / 40px side padding (mobile / tablet / desktop). */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1400px] px-5 sm:px-7 lg:px-10", className)}
      {...props}
    />
  );
}
