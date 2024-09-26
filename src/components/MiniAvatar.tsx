import React from "react";
import Image from "next/image";

export default function MiniAvatar() {
  return (
    <div className="w-4 h-4 rounded-full overflow-hidden mr-2">
      <Image src="/avatar1.webp" alt="User Avatar" width={24} height={24} />
    </div>
  );
}
