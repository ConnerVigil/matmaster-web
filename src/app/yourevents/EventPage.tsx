import EventCard from "@/components/EventCard";

const EventPage = () => {
  const events = Array(15).fill({
    title: "The Rockwell Rumble",
    dateRange: "Jan/1/24 - Jan/4/24",
    attendees: 64,
    style: "Folkstyle",
    location: "Herriman, UT",
    price: "60/team",
    status: "Registration Open",
    imageSource: "/rockwellRumble.webp",
  });

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
