import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  bookingDate: { type: Date, default: Date.now },
  ticketsBooked: { type: Number, required: true },
});

const ticket = mongoose.model("ticket", ticketSchema);
export default ticket;
