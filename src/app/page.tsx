import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <Link href="/homepage">
        <button className="text-black">Go to home page</button>
      </Link>
    </div>
  );
}
