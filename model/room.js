import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    room_number:
    {
        type: [String]
    }
    ,
    category: {
        type: String,
        required: true
    },
    isbooked: {
        type: Boolean,
        default: false
    }

}
);
const room = mongoose.model("room", roomSchema)
export default room