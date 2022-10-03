import express from 'express';
// controllers
import playlist from '../controllers/playlist.js';

const router = express.Router();

router
  .get('/bnb', playlist.onGetPlaylist)
  .post('/bnb', playlist.onPostPlaylist)
  

export default router;
