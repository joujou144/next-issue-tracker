import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

type Props = {
  open: number;
  closed: number;
  inProgress: number;
};
const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const statusContainers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
  ];

  return (
    <Flex gap="3">
      {statusContainers.map(({ label, value, status }) => (
        <Card key={label}>
          <Flex direction="column" gap="1">
            <Link
              className="font-sm font-medium"
              href={`/issues/list?status=${status}`}
            >
              {label}
            </Link>
            <Text size="4" className="font-bold">
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
