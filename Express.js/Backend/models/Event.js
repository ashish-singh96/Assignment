import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  availableTickets: { type: Number, required: true },
  price: { type: Number, required: true },
});

const event = mongoose.model("event", eventSchema);
export default event;
