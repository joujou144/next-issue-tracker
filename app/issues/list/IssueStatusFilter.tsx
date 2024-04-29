"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value: Status }[] = [
  //   { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter By Status" />
      <Select.Content>
        {statuses.map(({ label, value }) => (
          <Select.Item key={value} value={value}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;