import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);

    if (currentUser) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((u) => u.email === currentUser.email);
      setBookedEvents(user?.bookedEvents || []);
    }
  }, [location]);

  const handleBook = (eventId) => {
    if (!currentUser) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      if (user.email === currentUser.email) {
        const updatedBooked = [...(user.bookedEvents || []), eventId];
        setBookedEvents(updatedBooked);
        return { ...user, bookedEvents: updatedBooked };
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/Congratulations");
  };

  const isBooked = (id) => bookedEvents.includes(id);

  const handleCardClick = (eventId) => {
    navigate(`/EventDetails/${eventId}`);
  };

  return (
    <>
      <Helmet>
        <title>Events</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-[#005AA7] to-[#FFFDE4] p-6">
        <h1 className="text-4xl font-extrabold text-white text-center mb-10 drop-shadow-md animate-fade-in">
          Explore Events
        </h1>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto animate-fade-in-up">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => handleCardClick(event.id)}
              className="bg-white/20 backdrop-blur-md border border-white/30 hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden cursor-pointer shadow-lg"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-56 object-cover rounded-t-3xl"
              />
              <div className="p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
                <p className="text-sm opacity-80">
                  {event.date} – {event.venue}
                </p>
                <p className="mt-2 font-semibold text-green-200">
                  ${event.price}
                </p>
                {isBooked(event.id) ? (
                  <button
                    disabled
                    onClick={(e) => e.stopPropagation()}
                    className="mt-5 w-full py-2 rounded-xl bg-green-600/80 text-white font-semibold cursor-not-allowed"
                  >
                    ✅ Booked
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBook(event.id);
                    }}
                    className="mt-5 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
