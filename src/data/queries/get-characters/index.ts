import { useQuery } from "@apollo/react-hooks";
import {
  GetCharactersDocument,
  GetCharactersQuery,
  GetCharactersQueryVariables,
} from "../../../domain/schema";
import { useCallback } from "react";
import { useAppState } from "../../../presentation/store";

const useGetCharacters = () => {
  const name = useAppState((q) => q.home.name);

  const { fetchMore, ...response } = useQuery<
    GetCharactersQuery,
    GetCharactersQueryVariables
  >(GetCharactersDocument, {
    variables: {
      page: 1,
      name: name,
    },
  });

  const fetchNextPage = useCallback((page: number) => {
    fetchMore({
      variables: {
        name,
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
