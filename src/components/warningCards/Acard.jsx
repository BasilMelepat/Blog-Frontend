import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Acard = ({ data, className }) => {
  const isError =
    data.toLowerCase().includes("error") ||
    data.toLowerCase().includes("mail id has already taken");

  return (
    <div
      className={`acard ${className} absolute flex w-auto h-auto bg-black top-0 right-0 px-4 items-center rounded-2xl z-10 mt-2`}
    >
      {!isError && (
        <div>
          <Player
            src="https://lottie.host/9b4c6aea-6caf-4ddb-9e0b-12b00c4359ca/QA67cxKMHR.json"
            loop
            autoplay
            style={{ height: "80px", width: "80px" }}
          />
        </div>
      )}
      {isError && (
        <div>
          <Player
            src="https://lottie.host/2dfda753-686c-4099-b83b-ab2259f2bd31/28QQuaaLeW.json"
            autoplay
            loop
            style={{ height: "80px", width: "80px" }}
          />
        </div>
      )}

      <div className="text-white font-poppins">{data}</div>
    </div>
  );
};

export default Acard;
