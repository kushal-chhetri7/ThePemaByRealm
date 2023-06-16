import mongoose from "mongoose";
const room_typeSchema = new mongoose.Schema({
    room_name: {
        type: String,
        required: true
    },

    room_pictures: {
        type: String,
        required: true
    },
    description_a: {
        type: String,
        required: true
    },
    aminities: {
        type: String,
    },

    child_rate: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    account_number:{
        type:Number,
        
    }

});
const room_type = mongoose.model("room_type", room_typeSchema)
export default room_type