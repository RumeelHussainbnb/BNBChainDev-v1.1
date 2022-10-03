import express from 'express';
// controllers
import admin from '../controllers/admin.js';

const router = express.Router();

router
  .get('/', admin.onGetAllAdmins)
  

export default router;
