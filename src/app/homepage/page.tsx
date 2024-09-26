import EventRow from "@/components/EventRow";
import MainBannerSearch from "@/components/MainBannerSearch";

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <MainBannerSearch />
      <div className="w-full px-12">
        <EventRow title="Featured Tournaments" />
        <EventRow title="Local Tournaments" />
        <EventRow title="Freestyle Tournaments" />
        <EventRow title="Dual meets" />
      </div>
    </div>
  );
}
