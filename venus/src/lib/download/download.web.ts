import axios from "axios";
import download from "downloadjs";
import { API } from "../../constant/api";

export const downloadWeb = async (filename: string, pickedName: string) => {
  const url = `${API}/${filename}`;
  const res = await axios.get(url, { responseType: "blob" });
  return download(res.data, pickedName);
};
