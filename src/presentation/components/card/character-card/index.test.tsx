import { fireEvent, render } from "@testing-library/react-native";

import CharacterCard from ".";

const character = {
  name: "Test Character",
  image: "test-image-url",
};
const onPressMock = jest.fn();

describe("Character card", () => {
  it("renders character name correctly", () => {
    const { getByText } = render(
      <CharacterCard character={character} onPress={onPressMock} />,
    );

    const characterName = getByText("Test Character");
    expect(characterName).toBeTruthy();
  });

  it("renders image with correct source", () => {
    const { getByTestId } = render(
      <CharacterCard character={character} onPress={onPressMock} />,
    );

    const characterImage = getByTestId("character-image");
    expect(characterImage.props.source.uri).toBe("test-image-url");
  });

  it("calls onPress handler when pressed", () => {
    const { getByTestId } = render(
      <CharacterCard character={character} onPress={onPressMock} />,
    );

    const characterCard = getByTestId("character-card");
    fireEvent.press(characterCard);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
