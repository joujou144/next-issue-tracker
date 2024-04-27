import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueToolbar from "../_components/IssueToolbar";
import { Link, IssueStatusBadge } from "@/app/components";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <IssueToolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;