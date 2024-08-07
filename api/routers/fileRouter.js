import express from 'express'
import {allFileRequest,downloadRequest,uploadRequest} from '../controllers/fileController.js'
import multer from 'multer';

const router = express.Router()
const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './files');
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
        return cb(
          new Error(
            'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  }); 
  
router.post(
    '/upload',
    upload.single('file'),
    uploadRequest,
    (error, req, res, next) => {
      if (error) {
        console.log('error is :'+ error)
        res.status(500).send(error.message);
      }
    }
  );
  // router.get('/trial',async(req,res)=>{
  //   res.json({message:'Api test again'})
  // })
  router.get('/getAllFiles',allFileRequest );
  
  router.get('/download/:id',downloadRequest);
  
  export default router

  // 