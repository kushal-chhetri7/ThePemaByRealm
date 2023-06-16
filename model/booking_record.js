import mongoose, { Schema } from "mongoose";
const booking_recordSchema = new mongoose.Schema({
    check_in: {
        type: Date,
        required: true
    },

    check_out: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required:true

    },
    email: {
        type: Schema.Types.Mixed,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true

    },
    specialRequirement: {
        type: String,
        required: true
    },
    adult: {
        type: Number,
        required: true

    },
    child: {
        type: Number,
        required: true

    },
    transactionID: {
        type: String,
    },
    totalAmount: {
        type: Number,

    },
    rooms: {
        type: String,
    },
    room_name: {
        type: Number
    },

    roomNumbers: {
        type: [String],
    },

    category: {
        type: String,
    },
    response: {
        type: Number,
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    // room_status: {
    //     type: String
    // },
    Dollar: {
        type: Number
    },
    paymentStatus: {
        type: String

    }

}
);
const BookingRecords = mongoose.model("BookingDetail", booking_recordSchema)
export default BookingRecords