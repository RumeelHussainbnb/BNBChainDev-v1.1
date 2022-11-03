// models
import Tweet from '../models/Tweet.js';
import { Client } from "twitter-api-sdk";

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
            const tweets = await Tweet.find({"PK": req.params.listID}).sort({created_at: -1});
            res.status(200).json(tweets)
        } catch(error){
            res.status(400).json({success: false});
        } 
    },
    onPostFetchTweet: async (req, res) => {
        try{
            
            const client = new Client(process.env.BEARER_TOKEN);
            const response = await client.tweets.findTweetById(req.body.id, {
                "tweet.fields": [
                    "attachments",
                    "author_id",
                    "created_at",
                    "id",
                    "in_reply_to_user_id",
                    "public_metrics",
                    "referenced_tweets",
                    "text"
                ],
                "expansions": [
                    "attachments.media_keys",
                    "author_id",
                    "entities.mentions.username",
                    "in_reply_to_user_id",
                    "referenced_tweets.id",
                    "referenced_tweets.id.author_id"
                ],
                "media.fields": [
                    "alt_text",
                    "height",
                    "media_key",
                    "preview_image_url",
                    "type",
                    "url",
                    "width"
                ],
                "user.fields": [
                    "id",
                    "name",
                    "profile_image_url",
                    "protected",
                    "url",
                    "username",
                    "verified"
                ]
              });

            if (response){
                
                const tweet = response.data;
                if (req.body.category == "developer"){
                    tweet["PK"] = "1452853465210933252";
                }else if(req.body.category == "project"){
                    tweet["PK"] = "1476564921030782979";
                }else{
                    return res.status(400).json({success: false, error: "Wrong category supplied"});
                }
                const create_tweet = await Tweet.create({
                    PK: tweet.PK,
                    public_metrics: tweet.public_metrics,
                    id: tweet.id,
                    author_id: tweet.author_id,
                    text: tweet.text,
                    attachments: tweet.attachments,
                    Author: response?.includes?.users[0],
                    Media: response?.includes?.media? response.includes.media[0]: null,
                    Pinned: 0,
                    created_at: tweet.created_at
                });
                res.status(201).json({success: true});
            }

        } catch(error){
            res.status(400).json({success: false});
        } 
    }
}