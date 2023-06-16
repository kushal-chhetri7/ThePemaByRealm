import express from "express";
import { addroom, viewRoom_type } from "../controllers/room_type.js";
import {  Roomtype, deleteroom_type, editroomtype, posteditroomtype } from "../controllers/Room-type.js";
const router = express.Router();

import multer from "multer";
import crypto from 'crypto'
import { loginrequired } from "../middleware/jwt.js";








//====================Storage for item images =====================//

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, "public/images/room-type");
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


router.route('/typeroom').get(viewRoom_type)
router.route('/typeroom').post(upload.single('image'), addroom);


router.route('/roomtype').get(loginrequired, Roomtype)

router.route('/deleteroom_type/:id').post(deleteroom_type)
router.route('/roomtype-edit/:id').get(editroomtype)
router.route('/roomtype-update/:id').post(upload.single('image'),posteditroomtype)


export default router