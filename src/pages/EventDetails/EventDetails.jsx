import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];
    const foundEvent = allEvents.find((e) => e.id === parseInt(eventId));
    setEvent(foundEvent || null);
  }, [eventId]);

  if (!event) {
    return (
      <div className="text-center mt-10 text-red-600 text-xl font-bold">
        Event not found
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Event Details</title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-64 object-cover rounded-xl"
        />
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800">{event.name}</h1>
          <p className="text-gray-600 mt-2">
            <strong>Date:</strong> {event.date}
          </p>
          <p className="text-gray-600">
            <strong>Venue:</strong> {event.venue}
          </p>
          <p className="text-gray-800 mt-4 leading-relaxed">
            {event.description}
          </p>
          <p className="text-blue-700 text-xl font-semibold mt-4">
            Price: ${event.price}
          </p>

          <button
            onClick={() => navigate("/Events")}
            className="mt-6 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </>
  );
}
