import fs from "fs";

export const removeFile = (filename: string, time: number) => {
  const timeout = setTimeout(remove, time);

  function remove() {
    return new Promise((res, rej) => {
      fs.rm(`${__dirname}/../public/${filename}`, (err) => {
        clearTimeout(timeout);
        if (err) rej(err);
        res(true);
      });
    });
  }
};
