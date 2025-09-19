import express from "express";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import mongoose from "mongoose";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Configure GridFS storage
const storage = new GridFsStorage({
  url: process.env.MONGO_URI || "mongodb+srv://neelanchal:Askrithe40@clusterg.l3yzewq.mongodb.net/neelanchal?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: "photos",
      filename: `${Date.now()}-${file.originalname}`,
      metadata: {
        userId: req.body.userId,
        userRole: req.body.userRole,
        projectId: req.body.projectId,
        uploadedAt: new Date(),
      }
    };
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 10 // Maximum 10 files per upload
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Photo upload endpoint
router.post("/photos", authenticate, upload.array('photos', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedPhotos = req.files.map(file => ({
      id: file.id.toString(),
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      type: file.mimetype,
      uploadedAt: new Date(),
      url: `/api/upload/photos/${file.id}`
    }));

    res.json({
      message: "Photos uploaded successfully",
      photos: uploadedPhotos,
      count: uploadedPhotos.length
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Get photo by ID
router.get("/photos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid photo ID" });
    }

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "photos"
    });

    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(id));
    
    downloadStream.on('error', (error) => {
      console.error("Download error:", error);
      res.status(404).json({ error: "Photo not found" });
    });

    downloadStream.pipe(res);

  } catch (error) {
    console.error("Get photo error:", error);
    res.status(500).json({ error: "Failed to retrieve photo" });
  }
});

// Get user's photos
router.get("/photos", authenticate, async (req, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "photos"
    });

    const cursor = bucket.find({
      "metadata.userId": req.user.id
    }).sort({ uploadDate: -1 });

    const photos = await cursor.toArray();
    
    const photoList = photos.map(photo => ({
      id: photo._id.toString(),
      filename: photo.filename,
      originalName: photo.metadata?.originalName || photo.filename,
      size: photo.length,
      type: photo.metadata?.contentType || 'image/jpeg',
      uploadedAt: photo.uploadDate,
      url: `/api/upload/photos/${photo._id}`
    }));

    res.json({ photos: photoList });

  } catch (error) {
    console.error("Get photos error:", error);
    res.status(500).json({ error: "Failed to retrieve photos" });
  }
});

// Delete photo
router.delete("/photos/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid photo ID" });
    }

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "photos"
    });

    // Check if photo belongs to user
    const photo = await bucket.find({ _id: new mongoose.Types.ObjectId(id) }).toArray();
    
    if (photo.length === 0) {
      return res.status(404).json({ error: "Photo not found" });
    }

    if (photo[0].metadata?.userId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this photo" });
    }

    await bucket.delete(new mongoose.Types.ObjectId(id));
    
    res.json({ message: "Photo deleted successfully" });

  } catch (error) {
    console.error("Delete photo error:", error);
    res.status(500).json({ error: "Failed to delete photo" });
  }
});

export default router;
