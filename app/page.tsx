import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description:
    "Efficiently manage project tasks with our intuitive issue tracker. Create, edit, and delete issues, assign users, and track progress effortlessly. Our streamlined dashboard features dynamic bar charts for open, in-progress, and closed issues, providing instant insights. Stay updated with a summary of the latest issues and easily monitor counts with informative cards. Simplify project management with our straightforward issue tracker solution.",
};
