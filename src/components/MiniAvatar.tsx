import React from "react";
import Image from "next/image";

interface MiniAvatarProps {
  src: string;
}

export default function MiniAvatar({ src }: MiniAvatarProps) {
  return (
    <div className="w-4 h-4 rounded-full overflow-hidden mr-2">
      <Image src={src} alt="User Avatar" width="24" height="24" priority />
    </div>
  );
}
