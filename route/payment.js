import express from "express";
import { getCancelForm, getSuccessForm,    stripeForm } from "../controllers/payment.js";
import { webhooking } from "../controllers/webhook.js";
import { Homepage } from "../controllers/Homepage.js";
const router = express.Router();






// router.route('/home').get(Homepage)
// router.route('/home').post(renderAdminDashboard)





router.route('/stripe_webhook').post(webhooking)
router.route('/payment').post(stripeForm)
router.route('/success').get(getSuccessForm)
router.route('/cancel').get(getCancelForm)
export default router