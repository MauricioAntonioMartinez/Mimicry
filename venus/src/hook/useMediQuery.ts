import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { _web_ } from "../constant/platform";

const getNumItems = (width: number) => {
  let num = 1;

  if (width > 1201) num = 5;
  if (width > 1025 && width < 1200) num = 3;
  if (width > 769 && width < 1024) num = 2;
  if (width < 768) num = 1;

  return num;
};

export const useMediaQuery = () => {
  const [items, setItems] = useState(
    getNumItems(Dimensions.get("screen").width)
  );
  useEffect(() => {
    if (!_web_) return;
    const updateLayOut = (items: any) =>
      setItems(getNumItems(items.window.width));
    Dimensions.addEventListener("change", updateLayOut.bind(this));
    return Dimensions.removeEventListener("change", updateLayOut);
  }, []);

  return items;
};
