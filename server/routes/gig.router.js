import express from 'express'
import { verifyToken } from '../middleware/jwt.js';
import { createGig, deleteGig, getAllGig, getGig } from '../controllers/gig.controller.js';


const router = express.Router();

router.post('/',verifyToken,createGig);

router.delete('/:id',verifyToken,deleteGig);

router.get('/single/:id',getGig);

router.get('/',getAllGig);


export default router;