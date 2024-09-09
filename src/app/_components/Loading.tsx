import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
   return (
      <div className="flex justify-center items-center">
         <ScaleLoader />
      </div>
   );
};

export default Loading;
