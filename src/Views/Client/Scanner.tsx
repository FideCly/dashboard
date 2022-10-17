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
          if (result) {
            setData(result.getText());
            try {
              const response = await axios.post(
              import.meta.env.VITE_API_URL + "promotion-counter",
              { data }
              );
              toast.success("Card created successfully");
            } catch(error) {
              toast.error("Error creating card" + error);
            }          
          }
          if (error) {
            console.info(error);
          }
        }}
        className="rounded-md h-36 w-36"
      />
      <p>{Data}</p>
    </div>
  );
}
