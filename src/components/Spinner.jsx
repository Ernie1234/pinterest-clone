import React from "react";
import { Vortex } from "react-loader-spinner";

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Vortex
        visible={true}
        color="#00BFFF"
        height={100}
        width={100}
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["red", "#ff3456", "#e56a49", "#a01a9a", "orange", "orangered"]}
        className="m-5"
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
