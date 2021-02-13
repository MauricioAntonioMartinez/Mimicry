import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ENDPOINT = "ws://192.168.1.19:3000";

function App() {
  const [response, setResponse] = useState("");
  const [qrValue, setQRValue] = useState<string | undefined>();

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.emit("create-room");

    socket.on("created", (data: any) => {
      console.log("created", data);
      setQRValue(data);
    });

    socket.on("data", (data: any) => {
      console.log("data", data);
      setResponse(JSON.stringify(data));
    });

    socket.on("phoneJoined", () => {
      console.log("Someone joins to your room");
    });

    socket.on("changeColor", (color: string) => {
      window.document.body.style.backgroundColor = color;
    });
  }, []);

  return (
    <div className="qr-container">
      <h1>Scan this code to share data.</h1>
      <br />
      {qrValue && <QRCode value={qrValue} />}
      <br />
      {response}
    </div>
  );
}

export default App;
