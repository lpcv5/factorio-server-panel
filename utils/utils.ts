import { exec } from "child_process";
import parse from "node-html-parser";

export const getDownUrl = async () => {
  const url = "https://www.factorio.com/download/archive/";
  const response = await fetch(url);
  const body = await response.text();
  const root = parse(body);
  let htmlDownlistElement = root.querySelectorAll(".slot-button-inline");
  return htmlDownlistElement;
};

export const downloadFileWget = (fileUrl: string, downloadPath: string) => {
  let wget = "wget -P " + downloadPath + " " + fileUrl;

  exec(wget, (err, stdout, stderr) => {
    if (err) throw err;
    else console.log("downloaded to " + downloadPath);
  });
};

export const initGame = (downloadPath: string) => {
  let tar = `tar -xvf ${downloadPath}/linux64 -C ${downloadPath}`;

  exec(tar, (err, stdout, stdin) => {
    if (err) throw err;
    else console.log("tar to " + downloadPath);
  });
};
