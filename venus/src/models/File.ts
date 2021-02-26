import { API } from "../constant/api";
import { Preview } from "../constant/previews";

export class File {
  id: string;
  filename: string;
  type: string;
  name: string;
  size: number;
  constructor({
    type,
    size,
    filename,
    name,
    id,
  }: {
    id: string;
    filename: string;
    type: string;
    size: number;
    name: string;
  }) {
    this.id = id;
    this.type = type;
    this.filename = filename;
    this.name = name;
    this.size = size;
  }

  getUri() {
    switch (this.type) {
      case "image/png":
      case "image/jpg":
      case "image/jpeg":
        return `${API}/${this.filename}`;
      case "application/pdf":
        return Preview.pdf;
      case "application/vnd.adobe.xfdf":
        return Preview.xml;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return Preview.docs;
      default:
        return Preview.unknown;
    }
  }
}
