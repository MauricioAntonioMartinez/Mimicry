import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  HeaderButton,
  HeaderButtonProps,
} from "react-navigation-header-buttons";
import { colors } from "../../constant/color";

export const CustomHeaderButton = (props: HeaderButtonProps) => {
  return (
    <HeaderButton
      color={colors.light}
      iconSize={23}
      IconComponent={Ionicons}
      {...props}
    />
  );
};
