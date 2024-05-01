import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const openIssues = await prisma.issue.count({
    where: { status: "OPEN" },
  });

  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={{ initial: "7", md: "5" }}>
      <Flex direction="column" gap="7">
        <IssueSummary
          open={openIssues}
          closed={closedIssues}
          inProgress={inProgressIssues}
        />
        <IssueChart
          open={openIssues}
          closed={closedIssues}
          inProgress={inProgressIssues}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
