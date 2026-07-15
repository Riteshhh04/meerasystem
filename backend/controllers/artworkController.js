const artworkModel = require("../models/artworkModel");

// ==============================
// GET ALL ARTWORKS
// ==============================
exports.getArtworks = async (req, res) => {

    try {

        const artworks = await artworkModel.getAllArtworks();

        res.json(artworks);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ==============================
// GET ARTWORK BY ID
// ==============================
exports.getArtwork = async (req, res) => {

    try {

        const artwork = await artworkModel.getArtworkById(req.params.id);

        res.json(artwork);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ==============================
// CREATE ARTWORK
// ==============================
exports.createArtwork = async (req, res) => {

    try {

        const result = await artworkModel.createArtwork(req.body);

        res.json({
            success: true,
            message: "Artwork Added Successfully",
            result
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// artworkController.js - Updated Update Function
exports.updateArtwork = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        console.log(`Updating Artwork ID ${id} with:`, data); // Check this in your server terminal

        const result = await artworkModel.updateArtwork(id, data);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Artwork not found" });
        }

        res.json({
            success: true,
            message: "Artwork Updated Successfully"
        });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// ==============================
// DELETE ARTWORK
// ==============================
exports.deleteArtwork = async (req, res) => {

    try {

        await artworkModel.deleteArtwork(req.params.id);

        res.json({
            success: true,
            message: "Artwork Deleted Successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};