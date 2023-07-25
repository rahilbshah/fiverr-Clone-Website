import express from 'express'
import { verifyToken } from '../middleware/jwt.js';
import { createReview, deteleReview, getReview } from '../controllers/review.controller.js';

const router = express.Router();

router.post('/',verifyToken,createReview);
router.get('/single/:id',getReview);
router.delete('/:id',deteleReview);


export default router;