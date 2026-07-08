import { cn } from "@/lib/cn";

export default function Marquee({
  children,
  className,
  durationClassName = "animate-marquee",
}: {
  children: React.ReactNode;
  className?: string;
  durationClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className={cn("flex w-max items-center gap-16", durationClassName)}>
        <div className="flex items-center gap-16">{children}</div>
        <div className="flex items-center gap-16" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
