// pages/api/upload.js
import nextConnect from 'next-connect';
import multer from 'multer';
import mongoose from 'mongoose';
import { createReadStream } from 'fs';
import { GridFSBucket } from 'mongoose-gridfs';
import Image from '../../models/image';
import { useSession } from 'next-auth/react';
const upload = multer({ dest: 'uploads/' });
const {data: session}=useSession();
connection.log(session);

const handler = nextConnect();

handler.use(upload.single('image'));

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  throw new Error('Please provide a MongoDB connection string in the environment variable MONGODB_URI');
}

const connection = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ImageModel = Image(connection);
const bucket = new GridFSBucket(connection.db, {
  bucketName: 'images',
});

handler.post(async (req, res) => {
  try {
    const { originalname, filename } = req.file;

    const image = new ImageModel({
      name: originalname,
      filename,
    });

    const readStream = createReadStream(req.file.path);
    const uploadStream = bucket.openUploadStream(originalname);

    readStream.pipe(uploadStream);

    uploadStream.on('finish', async () => {
      await image.save();
      res.status(201).json({ success: true, data: image });
    });

    uploadStream.on('error', (error) => {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error uploading image to GridFS' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default handler;
