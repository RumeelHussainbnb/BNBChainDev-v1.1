// models
import Library from '../models/Library.js';

export default {
    onGetLibrary: async (req, res) => {
        try{
            const libraries = await Library.find({});
            res.status(200).json(libraries)
        } catch(error){
            res.status(400).json({success: false});
        }
    },
    onGetLibraryContentID: async (req, res) => {
        try{
            const libraries = await Library.find({});
            res.status(200).json(libraries)
        } catch(error){
            res.status(400).json({success: false});
        }
    },    
    onPostLibrary: async (req, res) => {
        try{
            const data = req.body
            const library = await Library.create({
                Title: data.Title,
                Author: data.Author,
                Description: data.Description,
                ContentMarkdown: data.ContentMarkdown,
                PlaylistTitle: data.PlaylistTitle,
                PlaylistID: data.PlaylistID,
                SK: data.SK,
                ContentType: data.ContentType,
                Url: data.Url,
                Img: data.Img,
                Tag: data.Tag,
                Position: data.Position,
                Promoted: data.Promoted,
                Live: data.Live,
                Vertical: data.Vertical,
                Provider: data.Provider,
                Lists: data.Lists,
                SpecialTag: data.SpecialTag,
                Expdate: data.Expdate

            });

            res.status(201).json({success: true, data: library})
        }catch(error){
            res.status(400).json({success: false , error:error});
        }
    },
}