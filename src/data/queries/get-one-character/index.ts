import { useQuery } from "@apollo/react-hooks";
import {
  GetOneCharacterQueryVariables,
  GetOneCharacterQuery,
  GetOneCharacterDocument,
} from "../../../domain/schema";

const useGetOneCharacter = (variables: GetOneCharacterQueryVariables) => {
  const response = useQuery<
    GetOneCharacterQuery,
    GetOneCharacterQueryVariables
  >(GetOneCharacterDocument, {
    variables,
  });

  return response;
};

export default useGetOneCharacter;
