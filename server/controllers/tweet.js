// models
import Tweet from '../models/Tweet.js';

export default {
    onGetPinnedTweet: async (req, res) => {
        try{
            const tweets = await Tweet.find({Pinned: 1});
            res.status(200).json(tweets)
        } catch(error){
            res.status(400).json({success: false});
        }
    },
    onPatchTweet: async (req, res) => {
        try{
            const updateAllTweets = await Tweet.updateMany({}, {"Pinned": 0})
            const tweets = await Tweet.findOneAndUpdate({id: req.params.tweetID}, {"Pinned": 1});
            res.status(200).json(tweets)
        } catch(error){
            res.status(400).json({success: false});
        }   
    },
    onGetTweetOverPK: async (req, res) => {
        try{
            const tweets = await Tweet.find({"PK": req.params.listID});
            res.status(200).json(tweets)
        } catch(error){
            res.status(400).json({success: false});
        } 
    }
}