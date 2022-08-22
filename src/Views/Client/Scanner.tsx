import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
export default function Scanner() {
  const [Data, setData] = useState("");
  return (
    <div>
      <h1 className="text-4xl">Scanner</h1>
      <QrReader
        constraints={{
          facingMode: "environment",
        }}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        className="h-36 w-36 rounded-md"
      />
      <p>{Data}</p>
    </div>
  );
}
