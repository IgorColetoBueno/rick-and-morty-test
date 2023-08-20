import { useQuery } from "@apollo/react-hooks";
import { useCallback, useEffect } from "react";

import {
  GetCharactersDocument,
  GetCharactersQuery,
  GetCharactersQueryVariables,
  ShortCharacterFragment,
} from "../../../domain/schema";
import { useAppState } from "../../../presentation/store";
import { mergeConsideringFirstKey } from "../../../util/merge";

const useGetCharacters = () => {
  const name = useAppState((q) => q.home.name);

  const { fetchMore, refetch, ...response } = useQuery<
    GetCharactersQuery,
    GetCharactersQueryVariables
  >(GetCharactersDocument, {
    variables: {
      page: 1,
      name,
    },
  });

  const fetchNextPage = useCallback(
    async (page: number) => {
      return await fetchMore({
        variables: {
          name,
          page,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          const merged = {
            ...fetchMoreResult,
            characters: {
              ...fetchMoreResult.characters,
              results: mergeConsideringFirstKey<ShortCharacterFragment>(
                prev.characters?.results! as ShortCharacterFragment[],
                fetchMoreResult.characters
                  ?.results! as ShortCharacterFragment[],
                "id",
              ),
            },
          };

          return merged;
        },
      });
    },
    [fetchMore, name],
  );

  useEffect(() => {
    refetch({
      page: 1,
      name,
    });
  }, [name, refetch]);

  return { ...response, fetchNextPage };
};

export default useGetCharacters;
