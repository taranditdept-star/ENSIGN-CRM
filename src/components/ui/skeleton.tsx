import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-900/5 backdrop-blur-sm dark:bg-white/10",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
