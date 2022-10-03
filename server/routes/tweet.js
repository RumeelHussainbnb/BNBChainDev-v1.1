import express from 'express';
// controllers
import tweet from '../controllers/tweet.js';

const router = express.Router();

router
.get('/pinned', tweet.onGetPinnedTweet)
.patch('/pin/:tweetID', tweet.onPatchTweet)
.get('/:listID', tweet.onGetTweetOverPK)
  

export default router;
