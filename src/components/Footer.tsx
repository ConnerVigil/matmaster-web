import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div>
      <div className="bg-white text-gray1 h-auto">
        <div className="flex justify-between px-4 py-8">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 relative">
                <Image
                  src="/MatMaster-60x60.svg"
                  alt="MatMaster Logo"
                  width={60}
                  height={60}
                  priority
                />
              </div>
              <span className="text-lg font-semibold">MatMaster</span>
            </div>
            <span className="text-sm text-gray3 sm:w-full w-3/4">
              From setup to completion, MatMaster handles the details so you can
              focus on wrestling.
            </span>
          </div>
        </div>
      </div>

      <Divider />

      <div className="bg-white flex flex-col px-4 py-6">
        <span className="text-sm text-gray-500">
          © 2024 MatMaster. All rights reserved.
        </span>
      </div>
    </div>
  );
}

const Divider = () => {
  return <hr style={{ borderTop: "1px solid lightgrey" }}></hr>;
};
