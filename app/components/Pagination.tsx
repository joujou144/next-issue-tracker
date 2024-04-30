import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Flex, Text, Button } from "@radix-ui/themes";
import React from "react";

//itemCount
//pageSize
//currentPage

type Props = {
  totalItems: number;
  pageSize: number;
  currentPage: number;
};

const Pagination = ({ totalItems, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(totalItems / pageSize);
  return (
    <Flex align="center" gap="3">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button variant="soft" color="gray" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button variant="soft" color="gray" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button variant="soft" color="gray" disabled={currentPage === pageCount}>
        <ChevronRightIcon />
      </Button>
      <Button variant="soft" color="gray" disabled={currentPage === pageCount}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
