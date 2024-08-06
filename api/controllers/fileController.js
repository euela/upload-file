import File from '../models/fileModel.js'
import path from 'path'
import { __dirname } from '../../index.js';

export const allFileRequest =  async (req, res) => {
    try {
      const files = await File.find({});
      const sortedByCreationDate = files.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      res.json(sortedByCreationDate);
    } catch (error) {
      res.status(400).send('Error while getting list of files. Try again later.');
    }
  }

export const uploadRequest =  async (req, res) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
    }
  }

export const downloadRequest = async (req, res) => {
    try {
      console.log('api reached')
      const id = req.params.id
      const file = await File.findById(id);
      res.set({
        'Content-Type': file.file_mimetype
      });
      res.sendFile(path.join(__dirname ,file.file_path));
    } catch (error) {
      res.status(400).send('Error while downloading file. Try again later.');
    }
  }

  