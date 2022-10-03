import express from 'express';
// controllers
import auth from '../controllers/auth.js';

const router = express.Router();

router
  .post('/', auth.onFindOneAndUpdateUser)
  

export default router;
