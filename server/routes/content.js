import express from 'express';
// controllers
import content from '../controllers/content.js';

const router = express.Router();

router
  .post('/bnb/newsletters', content.onPostContentBnbNewsletters)
  .get('/bnb/newsletters', content.onGetContentBnbNewsletters)
  .get('/specialtag/new', content.onGetContentWithSpecialTagNEW)
  .get('/specialtag/hot', content.onGetContentWithSpecialTagHOT)
  .get('/bnb/:type?/:videoID?', content.onGetContentBnb)
  .get('/lists/:listName', content.onGetList)
  .get('/types', content.onGetContentTypes)
  .post('/types', content.onPostContentWithType)
  .get('/check', content.onGetContentWithType)
  .get('/:type', content.onGetContentWithType)
  .get('/', content.onGetContent)
  .post('/', content.onCreateContent)
  .put('/', content.onUpdateContent)
  

export default router;
