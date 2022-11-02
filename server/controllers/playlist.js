// models
import Playlist from '../models/Playlist.js';
import validateToken from '../utils/validate-key.js';

export default {
    onGetPlaylist: async (req, res) => {
        try{
            const playlists = await Playlist.find();

            res.status(200).json(playlists)
        } catch(error){
            res.status(400).json({success: false});
        }
    },
    onPostPlaylist: async (req, res) => {
        const token = req.headers['authorization']
        const isTokenValid = await validateToken(token)
        if(isTokenValid === true){

            try{
                const data = req.body
                const playlist = await Playlist.create({
                    Title: data.Title,
                    Author: data.Author,
                    Description: data.Description,
                    Tags: data.Tags,
                    Provider: data.Provider
                });

                res.status(201).json({success: true, data: playlist})
            }catch(error){
                res.status(400).json({success: false, error: error});
            }
        }else{
            res.status(403).json({success: false, data: "You do not have permission to add playlist"})
        }
    },
}