//this is final

import express from "express";
import multer from "multer";
import crypto from 'crypto';
import { CheckBaseOnDate, GetRoom, record, register, } from "../controllers/booking_record.js";
import { Homepage, deleterecord, editrecord, posteditrecord, verified } from "../controllers/Homepage.js";
import { BookRoom,choose, incountry, loadDisplayAvailabeRoom, loadSearchForm, outcountry, postSearchForm, transaction } from "../controllers/customer.js";
import { loginrequired } from "../middleware/jwt.js";
//import { transactionID } from "../controllers/transaction.js";
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
// const router = express.Router();
// router.post("/register",register)
const router = express.Router();


router.route('/register')
    .get(GetRoom)
    .post(register);



//@ routes for home page 

router.route('/home').get(loginrequired, Homepage)

router.route('/deleterecord/:id').post(loginrequired, deleterecord)
router.route('/record-edit/:id').get(loginrequired, editrecord)
router.route('/record-update/:id').post(loginrequired, posteditrecord)
router.route('/verify/:id').post(loginrequired, verified)

//router.route('/verified/:id').post(v)

//========================Room reservation ======================================//
router.route('/').get(loadSearchForm)


router.route('/search-by-category').post(postSearchForm,);
router.route('/checkBaseOnDate').get(loginrequired, CheckBaseOnDate)
router.route('/checkBaseOnDate').post(loginrequired, CheckBaseOnDate)

router.route('/saveToAdmin').get(loginrequired, record)
router.route('/saveToAdmin').post(loginrequired, register)


router.route('/display-available-rooms').get(loadDisplayAvailabeRoom)
router.route('/display-available-rooms').post(BookRoom)
//router.route('/empty-the-room/:id').post(postEmptyRoom)
router.route('/choose/:id').get(choose)
router.route('/incountry/:id').get(incountry)
router.route('/outcountry').get(outcountry)
router.route('/transaction/:id').post(transaction)

//router.route('/incountry').get(QR_country)
//router.route("/roomtype/:id/image").get(getImage)

export default router