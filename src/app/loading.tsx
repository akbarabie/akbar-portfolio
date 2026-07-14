// src/app/loading.tsx
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Image
        src="/mas_icon.png"
        alt="Loading"
        width={48}
        height={48}
        className="animate-pulse rounded-full"
        priority
      />
    </div>
  );
}