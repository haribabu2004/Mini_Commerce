import { HStack, Button, Text } from "@chakra-ui/react";

export const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  return (
    <HStack gap={4} justify="center" my={8}>
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
      >
        previous
      </Button>
      <Text fontWeight="medium">
        Page {currentPage} of {totalPages}
      </Text>

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Next
      </Button>
    </HStack>
  );
};
