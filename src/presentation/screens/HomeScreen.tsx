import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useGetCharacters from "../../data/queries/get-characters";
import BaseScreen from "../components/base-screen";
import Button from "../components/button";
import CardShimmer from "../components/card/CardShimmer";
import CharacterCard from "../components/card/character-card";
import Box, { Column } from "../components/flex";
import SearchInput from "../components/search-input";
import { TextH4 } from "../components/typography";
import useDebounce from "../hooks/useDebounce";
import { useAppDispatch, useAppState } from "../store";
import { changeFilter, setFetchingMore } from "../store/homeSlice";
import Theme from "../theme";

const screenSize = Dimensions.get("screen").height;

const HomeScreen = () => {
  const { data, loading, error, fetchNextPage } = useGetCharacters();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce<string>(search, 300);
  const dispatch = useAppDispatch();
  const isFetchingMore = useAppState((q) => q.home.isFetchingMore);
  const { top, bottom } = useSafeAreaInsets();
  const [filterHeight, setFilterHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const ableToFetchNextPage = useRef(true);

  const handleScroll = async (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtEnd =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

    if (!isAtEnd || !data?.characters?.info?.next) {
      return;
    }

    ableToFetchNextPage.current = false;
    dispatch(setFetchingMore(true));
    await fetchNextPage(data.characters.info.next);
    dispatch(setFetchingMore(false));
  };

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setFilterHeight(event.nativeEvent.layout.height);
  }, []);

  useEffect(() => {
    dispatch(changeFilter(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    if (!loading) {
      ableToFetchNextPage.current = true;
    }
  }, [loading]);

  const emptyData = !data?.characters?.info?.count && !loading && !error;
  const shouldRenderData = !emptyData && !loading && !error;
  const scrollViewHeight = screenSize - filterHeight - top - bottom - 30;

  return (
    <BaseScreen noSpacing>
      <ImageBackground
        style={{ paddingTop: top + Theme.spacing.lg, minHeight: screenSize }}
        source={{
          uri: "https://www.coliseugeek.com.br/wp-content/uploads/2023/01/c930c-clickwallpapers-rickandmorty-desenho-4k-img8-minbase-scaled-1.jpg",
        }}
      >
        <View style={styles.backdrop} />
        <Column marginBottom={bottom} zIndex={2} gap={Theme.spacing.md}>
          <View onLayout={onLayout}>
            <Box paddingHorizontal={Theme.spacing.md}>
              <SearchInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar por nome"
              />
            </Box>
          </View>

          {!loading && !!error && (
            <Column
              paddingHorizontal={Theme.spacing.md}
              justifyContent="center"
            >
              <TextH4>Ocorreu um erro inesperado ao buscar</TextH4>
              <Button title="Tente novamente" color="white" />
            </Column>
          )}
          {emptyData && (
            <Column
              paddingHorizontal={Theme.spacing.md}
              justifyContent="center"
            >
              <TextH4>Nenhum resultado encontrado com essa busca</TextH4>
            </Column>
          )}
          {shouldRenderData && (
            <View
              style={{
                height: scrollViewHeight,
              }}
            >
              <ScrollView
                alwaysBounceVertical={false}
                bounces={false}
                overScrollMode="never"
                style={styles.scrollView}
                ref={scrollViewRef}
                onScroll={handleScroll}
              >
                <Column gap={Theme.spacing.sm}>
                  {data?.characters?.results!.map((character) => (
                    <CharacterCard
                      key={`character-${character?.id}`}
                      character={character!}
                      onPress={() => {}}
                    />
                  ))}
                  {isFetchingMore && <CardShimmer />}
                  <View style={{ height: bottom + 50 }} />
                </Column>
              </ScrollView>
            </View>
          )}
          {loading && (
            <Box paddingHorizontal={Theme.spacing.md}>
              <CardShimmer />
            </Box>
          )}
        </Column>
      </ImageBackground>
    </BaseScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: Theme.spacing.md,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.colors.white,
    opacity: 0.4,
    zIndex: 1,
  },
});
