import useShimmer from "../../hooks/useShimmer";
import Theme from "../../theme";
import { Column, Row } from "../flex";
import ShimmerCircle from "../shimmer/Circle";
import ShimmerRectangle from "../shimmer/Rectangle";

const DetailShimmer = () => {
  const opacity = useShimmer();

  return (
    <Column gap={Theme.spacing.lg} alignItems="center">
      <ShimmerCircle opacity={opacity} size={300} />
      <Row gap={Theme.spacing.sm} paddingHorizontal={Theme.spacing.md}>
        <Column flex={1} gap={Theme.spacing.sm}>
          <Row height={20}>
            <ShimmerRectangle opacity={opacity} />
          </Row>
          <Row height={20}>
            <ShimmerRectangle opacity={opacity} />
          </Row>
        </Column>
      </Row>
    </Column>
  );
};

export default DetailShimmer;
