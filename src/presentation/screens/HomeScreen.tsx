import { Text, View } from "react-native";
import useGetCharacters from "../../data/queries/get-characters";

const HomeScreen = () => {
  const { data } = useGetCharacters({ name: "Morty", page: 4 });

  return (
    <View>
      <Text>{JSON.stringify(data?.characters?.info)}</Text>
    </View>
  );
};

export default HomeScreen;
