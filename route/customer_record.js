import express from "express";

import { notverified, verified } from "../controllers/Homepage.js";
import { transactionrecord } from "../controllers/customer_record.js";
import { loginrequired } from "../middleware/jwt.js";
const router = express.Router();

//@ routes for home page 


router.route('/customer_record').get(loginrequired, transactionrecord)
router.route('/verify/:id').post(verified)
router.route('/notverify/:id').post(notverified)

export default router