import { Link, IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";

export type IssueQuery = {
  status: Status;
  orderBy: keyof Issue;
  page: string;
};

type Props = {
  searchParams: IssueQuery;
  issues: Issue[];
};

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {headers.map(({ label, value, className }) => (
            <Table.ColumnHeaderCell key={value} className={className}>
              <NextLink href={{ query: { ...searchParams, orderBy: value } }}>
                {label}
                {value === searchParams.orderBy && (
                  <ChevronUpIcon className="inline ml-1" />
                )}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(({ id, title, status, createdAt }) => (
          <Table.Row key={id}>
            <Table.Cell>
              <Link href={`/issues/${id}`}>{title}</Link>

              <div className="flex md:hidden justify-between mt-1.5">
                <IssueStatusBadge status={status} />
                {createdAt.toDateString()}
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const headers: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const headerNames = headers.map(({ value }) => value);

export default IssueTable;
