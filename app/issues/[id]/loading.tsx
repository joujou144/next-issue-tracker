import { Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IssueDetailsPageSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />

      <Flex gap="3" align="center" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default IssueDetailsPageSkeleton;
