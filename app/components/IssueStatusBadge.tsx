import React from "react";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

type Props = {
  status: Status;
  badgeSize?: "1" | "2" | "3";
};

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  CLOSED: { label: "Closed", color: "green" },
  IN_PROGRESS: { label: "In progress", color: "violet" },
};

const IssueStatusBadge = ({ status, badgeSize = "1" }: Props) => {
  return (
    <Badge color={statusMap[status].color} size={badgeSize}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
