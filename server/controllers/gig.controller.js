import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js";


export const createGig = async (req, res, next) => {
    if (!req.isSeller) return next(createError(403, "Only Sellers can create Gig!"))
    const newGig = new Gig({ userId: req.userId, ...req.body });
    try {
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if (!gig) return next(createError(404, "Gig not found!"))
        if (gig.userId !== req.userId) return next(createError(403, "You can delete only your Gig!"));
        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("Gig is Deleted!");
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) return next(createError(404, "Gig not found!"))
        res.status(200).json(gig);
    } catch (error) {
        res.status(500).json(error)

    }
}
export const getAllGig = async (req, res, next) => {
    const q = req.query;
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { cat: q.cat }),
        ...((q.min || q.max) && {
            price: {
              ...(q.min && { $gte: q.min }),
              ...(q.max && { $lte: q.max }),
            },
          }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } })
    }
    try {
        const gigs = await Gig.find(filters).sort({[q.sort]:-1})

        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json(error)

    }
}