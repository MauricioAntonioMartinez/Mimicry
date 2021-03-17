import { API } from "../constant/api";
import { Preview } from "../constant/previews";

export class File {
  id: string;
  expiration: Date;
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
    expiration,
  }: {
    id: string;
    filename: string;
    type: string;
    size: number;
    name: string;
    expiration: Date;
  }) {
    this.id = id;
    this.type = type;
    this.filename = filename;
    this.name = name;
    this.expiration = expiration;
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

export interface ReceivedFile {
  buffer?: Buffer;
  filename: string;
  originalName: string;
  size: number;
  type: string;
  hostId: string;
  id: string;
  expiration: Date;
}
