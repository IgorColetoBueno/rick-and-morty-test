import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useGetOneCharacter from "../../data/queries/get-one-character";
import Button from "../components/button";
import RoundedButton from "../components/button/RoundedButton";
import DetailShimmer from "../components/card/DetailShimmer";
import { Column, Row } from "../components/flex";
import { TextBody, TextH1, TextH4 } from "../components/typography";
import { BaseStackParams } from "../navigation";
import { RouteName } from "../navigation/route-names";
import Theme from "../theme";

const DetailScreen = () => {
  const { params } = useRoute<RouteProp<BaseStackParams, RouteName.Detail>>();
  const { id } = params;
  const { data, loading, error } = useGetOneCharacter({ id });
  const navigation = useNavigation();

  const emptyData = !data?.character && !loading && !error;
  const shouldRenderData = !emptyData && !loading && !error;

  return (
    <SafeAreaView style={styles.container}>
      {!loading && !!error && (
        <Column paddingHorizontal={Theme.spacing.md} justifyContent="center">
          <TextH4>Ocorreu um erro inesperado ao buscar</TextH4>
          <Button title="Tente novamente" color="white" />
        </Column>
      )}
      {emptyData && (
        <Column paddingHorizontal={Theme.spacing.md} justifyContent="center">
          <TextH4>Nenhum resultado encontrado com essa busca</TextH4>
        </Column>
      )}

      <Column paddingHorizontal={Theme.spacing.md}>
        <Row>
          <RoundedButton testID="back-button" onPress={navigation.goBack}>
            <Ionicons
              size={Theme.spacing.md}
              name="chevron-back"
              color={Theme.colors.white}
            />
          </RoundedButton>
        </Row>
        {shouldRenderData && (
          <Column gap={Theme.spacing.md}>
            <Column alignItems="center" gap={Theme.spacing.sm}>
              <Image
                style={styles.image}
                height={300}
                width={300}
                source={{ uri: data?.character?.image! }}
              />
              <TextH1 family="get_schwifty">{data?.character?.name}</TextH1>
            </Column>
            <Column gap={Theme.spacing.xs}>
              <Row>
                <TextBody family="poppins">
                  Gender: {data?.character?.gender}
                </TextBody>
              </Row>
              <Row>
                <TextBody family="poppins">
                  Origin: {data?.character?.origin?.dimension}
                </TextBody>
              </Row>
              <Row>
                <TextBody family="poppins">
                  Location: {data?.character?.location?.dimension}
                </TextBody>
              </Row>
              <Row>
                <TextBody family="poppins">
                  Species: {data?.character?.species}
                </TextBody>
              </Row>
              <Row>
                <TextBody family="poppins">
                  Status: {data?.character?.status}
                </TextBody>
              </Row>
            </Column>
          </Column>
        )}
        {loading && (
          <View testID="loading">
            <DetailShimmer />
          </View>
        )}
      </Column>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 999,
  },
  container: {},
});

export default DetailScreen;
