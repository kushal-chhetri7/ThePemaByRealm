import express from "express";
import { NewRoom, viewroom } from "../controllers/room.js";
import { addnewroom, deleteroom, editroom, posteditroom, } from "../controllers/AddRoom.js";
import { loginrequired } from "../middleware/jwt.js";

const router = express.Router();

router.route('/addroom')
    .get(loginrequired, viewroom)
    .post(NewRoom);
router.route('/room').get(loginrequired, addnewroom)

router.route('/deleteroom/:id').post(deleteroom)
router.route('/room-edit/:id').get(editroom)
//router.route("/availability/:id").put(updateRoomAvailability);
router.route('/room-update/:id').post(posteditroom)
export default router