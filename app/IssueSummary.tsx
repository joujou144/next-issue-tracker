import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./components";

type Props = {
  open: number;
  closed: number;
  inProgress: number;
};

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const statusContainers: {
    // label: string;
    value: number;
    status: Status;
  }[] = [
    { value: open, status: "OPEN" },
    { value: inProgress, status: "IN_PROGRESS" },
    { value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="3">
      {statusContainers.map(({ value, status }) => (
        <Link key={status} href={`/issues/list?status=${status}`}>
          <Card>
            <Flex direction="column" gap="1">
              <Text className="text-[15px] font-medium">
                <IssueStatusBadge status={status} badgeSize="3" /> Issues
              </Text>
              <Text size="4" className="font-bold">
                {value}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummary;
