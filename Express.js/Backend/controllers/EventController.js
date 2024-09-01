import event from "../models/Event.js";

class EventController {
  static insert_Event = async (req, res) => {
    try {
      const { name, description, date, location, availableTickets, price } =
        req.body;

      if (
        !name ||
        !description ||
        !date ||
        !location ||
        !availableTickets ||
        !price
      ) {
        return res.status(402).json({ message: "All Fields required" });
      }

      const EventData = new event({
        name: name,
        description: description,
        date: date,
        location: location,
        availableTickets: availableTickets,
        price: price,
      });
      await EventData.save();
      res.status(200).json({ message: "Event InsertSuccessfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  };

  static filterAndSorting = async (req, res) => {
    try {
      const { sort, filter, ...filters } = req.query;
      let query = event.find(filters);
      if (sort) query = query.sort(sort);
      const events = await query;
      res
        .status(200)
        .json({ message: "List events with filtering and sorting", events });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  };

  static getEventDetails = async (req, res) => {
    try {
      const eventExits = await event.findById(req.params.id);
      if (!eventExits) return res.status(404).json({ message: "Event not found" });
      res.status(200).json({message:"Get Events Details", eventExits});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  };
}

export default EventController;
