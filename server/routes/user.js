import express from 'express';
// controllers
import user from '../controllers/user.js';

const router = express.Router();

router
  .get('/:publicKey?', user.onGetUser)
  

export default router;
