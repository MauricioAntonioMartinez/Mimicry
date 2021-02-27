export interface File {
  id: string;
  filename: string;
  type: string;
  size: number;
  expiration: Date;
}

export interface SendFile {
  filename: string;
  originalName: string;
  buffer: Buffer;
  type: string;
  size: number;
  expiration: Date;
  id: string;
}
