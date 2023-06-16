import mongoose from "mongoose";
const QR_schema = new mongoose.Schema({
    account_number: {
        type: Number,
        required: true
    },

    QR_pictures: {
        type: String,
        required: true
    },
   
});
const QR_type = mongoose.model("QR_type", QR_schema)
export default QR_type