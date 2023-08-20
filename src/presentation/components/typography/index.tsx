import { PropsWithChildren } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

import Theme, { Color, Typography as TypographyType } from "../../theme";

interface TypographyProps extends TextProps {
  family?: "get_schwifty" | "garamond";
  size?: TypographyType;
  color?: Color;
}

const Typography = ({
  family = "get_schwifty",
  children,
  size = "body",
  color = "black",
  style: baseStyles,
}: PropsWithChildren<TypographyProps>) => {
  const fontSizeStyle = Theme.typography[size];

  const style: StyleProp<TextStyle> = {
    fontFamily: `${family}`,
    flexShrink: 1,
    color: Theme.colors[color],
    letterSpacing: 5,
  };

  return <Text style={[style, fontSizeStyle, baseStyles]}>{children}</Text>;
};

export const TextH1 = ({
  children,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography size="h1" family="garamond" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH2 = ({
  children,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography size="h2" family="garamond" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH3 = ({
  children,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography size="h3" {...rest}>
      {children}
    </Typography>
  );
};

export const TextH4 = ({
  children,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography size="h4" {...rest}>
      {children}
    </Typography>
  );
};

export const TextBody2 = ({
  children,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography size="body2" {...rest}>
      {children}
    </Typography>
  );
};

export const TextBody = ({
  children,
  ...rest
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Typography size="body" {...rest}>
      {children}
    </Typography>
  );
};
