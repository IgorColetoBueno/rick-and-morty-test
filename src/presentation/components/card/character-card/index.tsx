import { Image, Pressable } from "react-native";

import { ShortCharacterFragment } from "../../../../domain/schema";
import Theme from "../../../theme";
import { Column, Row } from "../../flex";
import { TextH3 } from "../../typography";

interface CharacterCardProps {
  character: ShortCharacterFragment;
  onPress: () => void;
}

const CharacterCard = ({
  character: { name, image },
  onPress,
}: CharacterCardProps) => {
  return (
    <Pressable onPress={onPress} testID="character-card">
      <Row
        backgroundColor={Theme.colors.white}
        borderRadius={Theme.spacing.sm}
        gap={Theme.spacing.sm}
      >
        <Image
          testID="character-image"
          height={150}
          width={150}
          source={{ uri: image!, cache: "force-cache" }}
          style={{
            borderTopLeftRadius: Theme.spacing.sm,
            borderBottomLeftRadius: Theme.spacing.sm,
          }}
        />
        <Column padding={Theme.spacing.sm} flex={1} gap={Theme.spacing.xs}>
          <Row>
            <TextH3 color="black" style={{ lineHeight: 30 }}>
              {name}
            </TextH3>
          </Row>
        </Column>
      </Row>
    </Pressable>
  );
};

export default CharacterCard;
