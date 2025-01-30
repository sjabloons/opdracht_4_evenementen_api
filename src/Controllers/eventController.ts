import { Request, Response } from "express";
import { Event } from "../Models/EventModel";

export const getAllEvents = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};

export const getEventById = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};
export const addEvent = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, date, location, description, isFree } = req.body;
        const event = await Event.create({
            name,
            date,
            location,
            description,
            isFree,
        });
        res.status(201).json(event);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};

export const changeEvent = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { name, date, location, description, isFree } = req.body;
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        await Event.findByIdAndUpdate(
            id,
            { name, date, location, description, isFree },
            {
                new: true,
            }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};

export const deleteEvent = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted" });
    } catch (error: unknown) {}
};
