import express from "express";
const router = express.Router();

import multer from "multer";
import crypto from 'crypto'
// import { loginrequired } from "../middleware/jwt.js";
import { QR, Qrr, addQR, deleteQR, editQR, posteditQR } from "../controllers/QR.js";








//====================Storage for item images =====================//

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, "public/images/QR");
    },
    filename: (req, file, cb) => {
      const randomString = crypto.randomBytes(6).toString("hex");
      const uniqueSuffix = Date.now() + "-" + randomString;
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop());
    },
  });
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
  });
  
  //====================Ends here =====================//





router.route('/QR').get(QR)

router.route('/QRR').get(Qrr)
router.route('/addQR').post(upload.single('image'), addQR);
router.route('/deleteQR/:id').post(deleteQR)
router.route('/editQR/:id').get(editQR)


router.route('/posteditQR/:id').post(upload.single('image'),posteditQR)


export default router