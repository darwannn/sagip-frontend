import { FC, ReactNode } from "react";
import { Badge } from "../ui/Badge";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva("capitalize text-white w-max", {
  variants: {
    variant: {
      default: "capitalize text-white w-max",
      unverified: "bg-orange-500",
      ongoing: "bg-green-500",
      resolved: "bg-blue-500",
      incomplete: "bg-orange-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string;
  children: ReactNode;
}

const EmergencyStatusBadge: FC<StatusBadgeProps> = ({
  children,
  className,
  variant,
}) => {
  return (
    <Badge className={cn(badgeVariants({ variant, className }))}>
      {children}
    </Badge>
  );
};

export default EmergencyStatusBadge;
