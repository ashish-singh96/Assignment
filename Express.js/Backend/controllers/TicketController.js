import ticket from "../models/Ticket.js";
import event from "../models/Event.js";
import user from "../models/User.js";
class TicketController {
  static bookTickets = async (req, res) => {
    try {
      const { eventId, ticketsBooked, userId } = req.body;

      const eventExits = await event.findById(eventId);
      if (!eventExits)
        return res.status(404).json({ message: "Event not found" });

      if (eventExits.availableTickets < ticketsBooked) {
        return res
          .status(400)
          .json({ message: "Not enough tickets available" });
      }

      eventExits.availableTickets -= ticketsBooked;
      await eventExits.save();
      const ticketData = new ticket({
        user: userId,
        event: eventId,
        ticketsBooked: ticketsBooked,
      });

      await ticketData.save();
      res
        .status(201)
        .json({ message: "Ticket booked successfully", ticketData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  };
}

export default TicketController;
