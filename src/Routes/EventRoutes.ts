import express from "express";
import {
    getAllEvents,
    getEventById,
    addEvent,
    changeEvent,
    deleteEvent,
} from "../Controllers/eventController";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", addEvent);
router.put("/:id", changeEvent);
router.delete("/:id", deleteEvent);

export default router;
