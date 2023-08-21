import { useNavigation, useRoute } from "@react-navigation/native";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

import DetailScreen from "./DetailScreen";
import useGetOneCharacter from "../../data/queries/get-one-character";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "MockIonicons",
}));
jest.mock("@react-navigation/native", () => ({
  RouteProp: jest.fn(),
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));
jest.mock("../../data/queries/get-one-character", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("DetailScreen", () => {
  it("renders loading state correctly", () => {
    (useRoute as jest.Mocked<any>).mockReturnValue({ params: { id: "123" } });
    (useGetOneCharacter as jest.Mocked<any>).mockReturnValue({ loading: true });

    const mockGoBack = jest.fn();

    (useNavigation as jest.Mocked<any>).mockReturnValue({ goBack: mockGoBack });

    const { queryByTestId } = render(<DetailScreen />);
    expect(queryByTestId("loading")).toBeTruthy();
  });

  it("renders error state correctly", () => {
    (useRoute as jest.Mocked<any>).mockReturnValue({ params: { id: "123" } });
    (useGetOneCharacter as jest.Mocked<any>).mockReturnValue({
      loading: false,
      error: true,
    });

    const mockGoBack = jest.fn();

    (useNavigation as jest.Mocked<any>).mockReturnValue({ goBack: mockGoBack });

    const { getByText } = render(<DetailScreen />);
    expect(getByText("Ocorreu um erro inesperado ao buscar")).toBeTruthy();
    expect(getByText("Tente novamente")).toBeTruthy();
  });

  it("renders data correctly", async () => {
    (useRoute as jest.Mocked<any>).mockReturnValue({ params: { id: "123" } });

    (useGetOneCharacter as jest.Mocked<any>).mockReturnValue({
      loading: false,
      data: {
        character: {
          image: "characterImage",
          name: "Character Name",
          gender: "Male",
          origin: { dimension: "Origin Dimension" },
          location: { dimension: "Location Dimension" },
          species: "Human",
          status: "Alive",
        },
      },
    });

    const mockGoBack = jest.fn();

    (useNavigation as jest.Mocked<any>).mockReturnValue({ goBack: mockGoBack });

    const { getByText, getByTestId } = render(<DetailScreen />);

    expect(getByText("Character Name")).toBeTruthy();
    expect(getByText("Gender: Male")).toBeTruthy();
    expect(getByText("Origin: Origin Dimension")).toBeTruthy();
    expect(getByText("Location: Location Dimension")).toBeTruthy();
    expect(getByText("Species: Human")).toBeTruthy();
    expect(getByText("Status: Alive")).toBeTruthy();

    fireEvent.press(getByTestId("back-button"));

    expect(mockGoBack).toHaveBeenCalled();
  });
});
