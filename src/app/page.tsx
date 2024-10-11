import EventRow from "@/components/EventRow";
import MainBannerSearch from "@/components/MainBannerSearch";

export default function Page() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <MainBannerSearch />
      <div className="w-full px-12">
        <EventRow title="Featured Events" />
        <EventRow title="Local Events" />
        <EventRow title="Freestyle Events" />
        <EventRow title="Dual meets" />
      </div>
    </div>
  );
}
