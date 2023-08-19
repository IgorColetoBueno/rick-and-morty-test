import { useQuery } from "@apollo/react-hooks";
import {
  GetCharactersDocument,
  GetCharactersQuery,
  GetCharactersQueryVariables,
} from "../../../domain/schema";
import { useCallback } from "react";

const useGetCharacters = (variables: GetCharactersQueryVariables) => {
  const { fetchMore, ...response } = useQuery<
    GetCharactersQuery,
    GetCharactersQueryVariables
  >(GetCharactersDocument, {
    variables,
  });

  const fetchNextPage = useCallback((page: number) => {
    fetchMore({
      variables: {
        ...variables,
        page,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...prev,
          characters: {
            info: {
              ...fetchMoreResult.characters?.info,
              count:
                fetchMoreResult.characters?.info?.count! +
                prev.characters?.info?.count!,
            },
            results: [
              ...prev.characters?.results!,
              ...fetchMoreResult.characters?.results!,
            ],
          },
        };
      },
    });
  }, []);

  return { ...response, fetchNextPage };
};

export default useGetCharacters;
