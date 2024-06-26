import React from "react";
import { Oval } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <Oval visible={true} height={80} width={80} />
    </div>
  );
}
