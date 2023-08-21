import useShimmer from "../../hooks/useShimmer";
import Theme from "../../theme";
import { Column, Row } from "../flex";
import ShimmerRectangle from "../shimmer/Rectangle";
import ShimmerSquare from "../shimmer/Square";

const numberOfTimes = new Array(6).fill(0);

const CardShimmer = ({ quantity = numberOfTimes }) => {
  const opacity = useShimmer();

  return (
    <Column gap={Theme.spacing.lg}>
      {quantity.map((_, index) => (
        <Row key={`shimmer-${index}`} gap={Theme.spacing.sm}>
          <ShimmerSquare opacity={opacity} size={100} />
          <Column flex={1} gap={Theme.spacing.sm}>
            <Row height={20}>
              <ShimmerRectangle opacity={opacity} />
            </Row>
            <Row height={20}>
              <ShimmerRectangle opacity={opacity} />
            </Row>
          </Column>
        </Row>
      ))}
    </Column>
  );
};

export default CardShimmer;
