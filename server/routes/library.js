import express from 'express';
// controllers
import library from '../controllers/library.js';
import content from '../controllers/content.js';

const router = express.Router();

router
  .get('/list/:listName', content.onGetList)
  .get('/newsletters', content.onGetContentBnbNewsletters)
  .get('/specialtag/new', content.onGetContentWithSpecialTagNEW)
  .get('/specialtag/hot', content.onGetContentWithSpecialTagHOT)
  .get('/bnb/:type/:videoID?', content.onGetContentBnb)
  .get('/:type/video/:videoID', content.onGetContentWithType)
  .get('/:type/:contentId', content.onGetContentWithType)
  .get('/', content.onGetContent)
  .post('/', content.onCreateContent)
  .put('/', content.onUpdateContent)  

export default router;
