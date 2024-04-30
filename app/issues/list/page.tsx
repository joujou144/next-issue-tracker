import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueToolbar from "../_components/IssueToolbar";
import { Link, IssueStatusBadge } from "@/app/components";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

type Props = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
};

const IssuesPage = async ({ searchParams }: Props) => {
  const headers: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = headers
    .map((header) => header.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <div>
      <IssueToolbar />
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
      <Pagination
        className="mt-5"
        pageSize={pageSize}
        totalItems={issueCount}
        currentPage={page}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
