import React from "react";

const EventCard = ({ event, isBooked, onBook }) => {
  return (
    <div className="border rounded-xl shadow p-4 bg-white flex flex-col">
      <img
        src={event.image}
        alt={event.name}
        className="rounded mb-3 h-48 object-cover"
      />
      <h2 className="text-xl font-bold">{event.name}</h2>
      <p className="text-gray-600">{event.description}</p>
      <p className="mt-2">📅 {event.date}</p>
      <p>💵 {event.price} EGP</p>

      <button
        disabled={isBooked}
        onClick={() => onBook(event.id)}
        className={`mt-auto px-4 py-2 rounded text-white ${
          isBooked
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isBooked ? "Booked" : "Book Now"}
      </button>
    </div>
  );
};

export default EventCard;
