import { useNavigation } from "@react-navigation/native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import React from "react";

import HomeScreen from "./HomeScreen";
import useGetCharacters from "../../data/queries/get-characters";

jest.mock("@react-navigation/native", () => ({
  NavigationProp: jest.fn(),
  useNavigation: jest.fn(),
}));
jest.mock("../../data/queries/get-characters", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../hooks/useDebounce", () => jest.fn((value) => value));
jest.mock("../store", () => ({
  useAppDispatch: jest.fn(() => () => {}),
  useAppState: jest.fn(),
}));
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0 })),
}));

describe("HomeScreen", () => {
  it("renders loading state correctly", () => {
    (useGetCharacters as jest.Mocked<any>).mockReturnValue({ loading: true });

    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId("loading")).toBeTruthy();
  });

  it("renders error state correctly", () => {
    (useGetCharacters as jest.Mocked<any>).mockReturnValue({
      loading: false,
      error: true,
    });

    const { getByText } = render(<HomeScreen />);
    expect(getByText("Ocorreu um erro inesperado ao buscar")).toBeTruthy();
    expect(getByText("Tente novamente")).toBeTruthy();
  });

  it("renders empty data state correctly", () => {
    (useGetCharacters as jest.Mocked<any>).mockReturnValue({
      loading: false,
      data: { characters: { info: { count: 0 } } },
    });

    const { getByText } = render(<HomeScreen />);
    expect(
      getByText("Nenhum resultado encontrado com essa busca"),
    ).toBeTruthy();
  });

  it("renders data correctly and navigates to detail screen on card press", () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mocked<any>).mockReturnValue({
      navigate: mockNavigate,
    });
    (useGetCharacters as jest.Mocked<any>).mockReturnValue({
      loading: false,
      data: {
        characters: {
          info: { count: 1 },
          results: [{ id: 1, name: "Rick" }],
        },
      },
    });

    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText("Rick"));

    expect(mockNavigate).toHaveBeenCalledWith("Detail", { id: 1 });
  });

  it("loads more data on scroll to end", async () => {
    (useGetCharacters as jest.Mocked<any>).mockReturnValue({
      loading: false,
      data: {
        characters: {
          info: { count: 20, next: "nextPageUrl" },
          results: [{ id: 1, name: "Rick" }],
        },
      },
      fetchNextPage: jest.fn(),
    });

    const { getByTestId } = render(<HomeScreen />);
    fireEvent.scroll(getByTestId("scroll-view"), {
      nativeEvent: {
        contentOffset: { y: 1000 },
        layoutMeasurement: { height: 1000 },
        contentSize: { height: 2000 },
      },
    });

    await waitFor(() =>
      expect(useGetCharacters().fetchNextPage).toHaveBeenCalled(),
    );
  });
});
