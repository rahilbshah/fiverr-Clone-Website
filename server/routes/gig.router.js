import express from 'express'
import { verifyToken } from '../middleware/jwt.js';
import { createGig } from '../controllers/gig.controller.js';


const router = express.Router();

router.post('/',verifyToken,createGig);

router.delete('/:id',verifyToken);

router.get('/single/:id',verifyToken);

router.get('/',verifyToken);


export default router;