import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js";


export const createGig = async (req,res,next)=>{
    if(!req.isSeller) return next(createError(403,"Only Sellers can create Gig!"))
    const newGig = new Gig({userId:req.userId,...req.body});
    try {
       const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    } catch (error) {
        res.status(500).send(error)
    }
}