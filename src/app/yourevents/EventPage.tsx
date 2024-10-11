import EventCard from "@/components/EventCard";

const EventPage = () => {
  const events = Array(15).fill({
    title: "The Rockwell Rumble",
    dateRange: "Jan/1/24 - Jan/4/24",
    attendees: 64,
    style: "Folkstyle",
    location: "Herriman, UT",
    price: "$60/team",
    status: "Registration Open",
  });

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            dateRange={event.dateRange}
            attendees={event.attendees}
            style={event.style}
            location={event.location}
            price={event.price}
            status={event.status}
          />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
