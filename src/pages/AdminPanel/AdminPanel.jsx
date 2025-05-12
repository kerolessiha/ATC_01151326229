import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    date: "",
    venue: "",
    price: "",
    description: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    const updatedEvents = [...events];

    if (editId !== null) {
      const index = updatedEvents.findIndex((e) => e.id === editId);
      updatedEvents[index] = { ...updatedEvents[index], ...form };
      setEditId(null);
    } else {
      const newEvent = {
        id: Date.now(),
        ...form,
        price: parseFloat(form.price),
      };
      updatedEvents.push(newEvent);
    }

    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setForm({
      name: "",
      date: "",
      venue: "",
      price: "",
      description: "",
      image: "",
    });
  };

  const handleEdit = (id) => {
    const event = events.find((e) => e.id === id);
    setForm(event);
    setEditId(id);
  };

  const handleDelete = (id) => {
    const updatedEvents = events.filter((e) => e.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-[#FFFDE4] to-[#005AA7] p-6">
        <div className="max-w-5xl mx-auto backdrop-blur-lg bg-white/30 border border-white/40 shadow-xl rounded-2xl p-8">
          <h2 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
            {editId ? "Edit Event" : "Add New Event"}
          </h2>

          <form
            onSubmit={handleAddOrUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Event Name"
              required
              className="form-input border-3 border-white rounded-md px-3"
            />
            <input
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="Date"
              type="date"
              required
              className="form-input border-3 border-white rounded-md px-3"
            />
            <input
              name="venue"
              value={form.venue}
              onChange={handleChange}
              placeholder="Venue"
              required
              className="form-input border-3 border-white rounded-md px-3"
            />
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              required
              className="form-input border-3 border-white rounded-md px-3"
            />
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="form-input col-span-1 md:col-span-2 border-3 border-white rounded-md px-3"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="form-input col-span-1 md:col-span-2 h-32 resize-none border-3 border-white rounded-md px-3"
            />
            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-white text-purple-700 font-bold py-3 rounded-xl hover:bg-purple-100 transition shadow-md"
            >
              {editId ? "Update Event" : "Add Event"}
            </button>
          </form>
        </div>

        <div className="max-w-5xl mx-auto mt-10 bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl text-white font-bold mb-6 drop-shadow">
            All Events
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white/80 p-6 rounded-xl border border-gray-300 shadow-md backdrop-blur-sm transition hover:shadow-xl"
              >
                <h4 className="text-xl font-bold text-gray-800">
                  {event.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {event.date} — {event.venue}
                </p>
                <p className="text-green-700 font-semibold mt-1">
                  ${event.price}
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(event.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
