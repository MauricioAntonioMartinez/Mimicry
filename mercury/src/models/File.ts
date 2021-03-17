export interface File {
  id: string;
  filename: string;
  name: string;
  type: string;
  size: number;
  expiration: Date;
}

export interface SendFile {
  filename: string;
  originalName: string;
  type: string;
  size: number;
  expiration: Date;
  id: string;
  hostId: string;
}
