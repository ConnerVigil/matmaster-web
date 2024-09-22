import MainBannerSearch from "@/components/MainBannerSearch";
import MainCard from "@/components/MainCard";

export default function Page() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <MainBannerSearch />
      <div className="w-full px-16">
        {/* Aisle component */}
        <div className="flex items-center justify-between bg-red-600 w-full mt-16">
          <span className="text-textPrimary text-l font-bold">
            Featured Tournaments
          </span>
          <span className="text-primary text-l font-bold">See more</span>
        </div>
        <MainCard />
      </div>
    </div>
  );
}
