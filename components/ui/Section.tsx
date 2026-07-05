import { cn } from "@/lib/cn";

export default function Section({
  id,
  className,
  innerClassName,
  children,
  dark = false,
}: {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative w-full", dark ? "bg-[#0A0A0A] text-white" : "bg-transparent", className)}
    >
      <div className={cn("mx-auto w-full max-w-[1240px] px-6 md:px-10", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
