// models
import Content from '../models/Content.js';
import random_sk from '../utils/generate-random-sk.js'
import calculatePositionNo from "../utils/calculate-position-no.js";
import ContentType from "../models/ContentTypes.js";
import tags from "../utils/tags.js";
import SelectedTags from "../utils/selected-tags.js";
import validateKey from "../utils/validate-key.js";
import ContentTypes from '../utils/content-types.js';

export default {
    onGetContent: async (req, res) => {
        try{
            const contents = await Content.find({ContentStatus: "active"}).sort({Position: 1});

            res.status(200).json({success:true, data: contents})
        } catch(error){
            res.status(400).json({success: false});
        }
    },
    onCreateContent: async (req, res) => {
        try{
            const get_random_sk = await random_sk();
            const data  = req.body;
            const position = await calculatePositionNo(data.ContentType)
            const content = await Content.create({
                Title: data.Title,
                Author: data.Author,
                Description: data.Description,
                SK: get_random_sk,
                ContentType: data.ContentType,
                ContentStatus: "inactive",
                ContentMarkdown: '',
                Position: position,
                List: data.List,
                Url: data.Url,
                Tags: data.Tags,
                Vertical: data.Vertical,
                SpecialTag: data.SpecialTag
            });

            res.status(201).json({success: true, data: content})
        }catch(error){
            res.status(400).json({success: false, error: error});
        }
    },
    onUpdateContent: async (req, res) => {
        try{
            const data = req.body[0];
            await Content.updateMany({ ContentType: data.ContentType }, { $set: { SpecialTag: "0" } });
            data["SpecialTag"] = data["SpecialTag"] != "" ? "New": "0"
            const content = await Content.findOneAndUpdate({SK: data.SK}, data, {
                returnOriginal: false
            });

            res.status(200).json(content)
        }catch(error){
            res.status(400).json({success: false, error: error});
        }
    },
    onGetContentWithType: async (req, res) => {
        var contents;
        try{
            if("url" in req.query){
                contents = await Content.findOne({Url: req.query.url});
            }else{
                contents = await Content.find({ContentStatus: req.params.type});
            }
    
            res.status(200).json(contents);
        } catch(error){
            res.status(400).json({success: false});
        }
    },
    onGetContentTypes: async (req, res) => {
        try{
            const contents = await ContentType.find({}, {_id: 0, Name: 1});
            var type = [];

            contents.forEach(function(contents) {
                type.push(contents["Name"]);
            });
            res.status(200).json(type)
        } catch(error){
            res.status(400).json({success: false});
        }
    },
    onPostContentWithType: async (req, res) => {
        try{
            const data = req.body
            const contentType = await ContentType_.create({
                Name: data.Name
            });

            res.status(201).json({success: true, data: contentType})
        }catch(error){
            res.status(400).json({success: false});
        }
    },
    onGetContentWithSpecialTagHOT: async (req, res) => {
        try{
            const contents = await Content.find({"SpecialTag": "Hot"});

            res.status(200).json(contents)
        } catch(error){
            res.status(400).json({success: false});
        }
    },
    onGetContentWithSpecialTagNEW: async (req, res) => {
        try{
            const contents = await Content.find({"SpecialTag": "New"});

            res.status(200).json(contents)
        } catch(error){
            res.status(400).json({success: false});
        }
    },    
    onGetList: async (req, res) => {
        try{
            const contents = await Content.find({Lists: req.params.listName});

            res.status(200).json(contents)
        } catch(error){
            res.status(400).json({success: false});
        }
    },       
    onGetContentBnb: async (req, res) => {
        let contents, multipleExist;
        if(ContentTypes.includes(req.params.type)){
            if(ContentTypes.includes(req.params.type) && ((req.query.tags === "" && req.query.specialTags === "") || (Object.keys(req.query).length == 0))){
                try{
                    contents = await Content.find({ContentType: req.params.type, ContentStatus: "active"}).sort({Position: -1});
    
                    if("tags" in req.query && req.query.tags.length > 1){
                        multipleExist = req.query.tags.every(value => {
                            return SelectedTags["allTags"].includes(value);
                        });
        
                    }
                    if(multipleExist){
                        contents = await Content.find({ContentType: req.params.type, Tags: { $in : req.params.tags}, ContentStatus: "active"}).sort({Position: -1});
                    }
    
    
                    res.status(200).json(contents)
                } catch(error){
                    res.status(400).json({success: false});
                }
            }       
            else if(SelectedTags["allTags"].some(r=> req.query.tags.includes(r)) && req.query.specialTags === ""){
                try{
                    contents = await Content.find({Tags: { $in : req.query.tags}, ContentStatus: "active", ContentType: req.params.type}).sort({Position: -1});
    
                    res.status(200).json(contents)
                } catch(error){
                    res.status(400).json({success: false});
                }
            }
            else if(req.query.specialTags !== "" && req.query.tags !== ""){
                try{
                    contents = await Content.find({SpecialTag: req.query.specialTags, Tags: { $in : req.query.tags}, ContentStatus: "active", ContentType: req.params.type}).sort({Position: -1});
    
                    res.status(200).json(contents)
                } catch(error){
                    res.status(400).json({success: false});
                }
            }
            else if(req.query.specialTags !== "" && req.query.tags === ""){
                try{
                    contents = await Content.find({SpecialTag: req.query.specialTags, ContentStatus: "active", ContentType: req.params.type}).sort({Position: -1});
    
                    res.status(200).json(contents)
                } catch(error){
                    res.status(400).json({success: false});
                }
            }    // Done till here    
    
        }
        else if(req.params.videoID === undefined){
            try{
                contents = await Content.find({"PlaylistID": req.params.type});

                res.status(200).json(contents)
            } catch(error){
                res.status(400).json({success: false});
            }            
        }
        else{
            try{
                contents = await Content.findOne({ContentType: req.params.type, SK: req.params.videoID, ContentStatus: "active"}).sort({Position: -1});

                res.status(200).json(contents)
            } catch(error){
                res.status(400).json({success: false});
            }            
        }
    },
    onGetContentBnbNewsletters: async (req, res) => {
        try{
            const contents = await Content.find({ContentType: "newsletters", ContentStatus: "active"}, {}).sort({Position: -1});
            //const contents = await Content.find({}, { _id: 0}).sort({ CreatedAt: -1, ContentType: "newsletter"});
            res.status(200).json(contents)

        } catch(error){
            res.status(400).json({success: false});
        }
    },
    onPostContentBnbNewsletters: async (req, res) => {
        const key = req.headers['authorization']
        const isAdmin = await validateKey(key)
        const position = await calculatePositionNo("newsletters")
        if(isAdmin === true){
            try{
                const data = req.body
                const content = await Content.create({
                    Title: data.Title,
                    Url: process.env.HOME_URL + '/newsletters/' + data.Title.replaceAll(' ', '-'),
                    SK: data.Title.replaceAll(' ', '-'),
                    Author: data.Author,
                    Position: position,
                    ContentStatus: "active",
                    ContentType: "newsletters",
                    ContentMarkdown: data.ContentMarkdown,
                    Description: data.Description
//                    Img: data.Img
                });
                res.status(201).json({success: true, data: content})
            }catch(error){
                res.status(400).json({success: false, error: error});
            }
        }
        else{
            res.status(403).json({success: false, data: "You do not have permission to add newsletter"})
        }
    },
}