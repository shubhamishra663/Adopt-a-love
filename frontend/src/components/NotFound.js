import React from "react";
import img404 from "../utils/img404.jpg";

export default function NotFound() {
  return (
    <div className="w-screen flex">
      <img className="h-screen w-screen object-cover" src={img404} />

      <div className="h-screen w-screen absolute flex justify-start py-20 items-center flex-col gap-5">
        <p className="font-bold text-3xl md:text-6xl ">404</p>
        <p className="font-bold text-3xl md:text-6xl ">Page not found!</p>
      </div>
    </div>
  );
}
