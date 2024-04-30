import prisma from "@/prisma/client";
import { Avatar, Button, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });

  return (
    <Card>
      <Heading ml="3" size="5" mb="3">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(({ id, title, status, assignedToUser }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex align="start" gap="2" direction="column">
                    <Link href={`/issues/${id}`}>{title}</Link>
                    <IssueStatusBadge status={status} />
                  </Flex>
                  {assignedToUser && (
                    <Avatar
                      size="2"
                      fallback="?"
                      radius="full"
                      src={assignedToUser.image!}
                      referrerPolicy="no-referrer"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
