import BookingRecords from "../model/booking_record.js"
import room_type from "../model/room_type.js";
import room from "../model/room.js";
//import  fs from 'fs'

//@des get  method to fetch data from db
export const Homepage = async (req, res, next) => {
    try {
        const booking_records = await BookingRecords.find();
        const uniqueEmails = new Set(booking_records.map(item => item._id));
        const count = uniqueEmails.size;
        console.log("Number room booked:", count);

        const roomTypes = await room_type.find();
        const roomNames = new Set(roomTypes.map(item => item.room_name));
        const roomType = roomNames.size;
        console.log("Number of unique room names:", roomType);

        const roomtype = await room.find();
        const roomName = new Set(roomtype.map(item => item.room_number));
        const rooms = roomName.size;
        console.log("Number of unique room names:", rooms);



        res.render('./booking-record/Home', {
            'booking': booking_records, 'totalbookingcount': count, 'roomtype': roomType, 'room_number': rooms,
        })
    } catch (error) {
        console.log(error)
    }
}
export const deleterecord = async (req, res, next) => {
    try {
        const booking_records = await BookingRecords.find();
        await BookingRecords.findByIdAndDelete(
            req.params.id,
        );
        res.redirect('/Home')
    } catch (err) {
        next(err);
    }
}





export const editrecord = async (req, res, next) => {
    try {

        const update = await BookingRecords.findById(
            req.params.id,
        );
        res.render('./booking-record/edit', {
            updates: update

        })
        console.log(update);
    } catch (err) {
        next(err);
    }
}



export const posteditrecord = async (req, res, next) => {
    try {
        const { check_in, check_out, name, totalAmount, email, contactNumber, specialRequirement, adult, child, category, transactionID, response, rooms, roomNumbers } = req.body;
        const booking_records = await BookingRecords.find();

        const update = await BookingRecords.findByIdAndUpdate(
            req.params.id, { check_in, check_out, name, email, totalAmount, contactNumber, specialRequirement, adult, child, transactionID, category, rooms, roomNumbers, response }
        );
        res.redirect('/home')

        //console.log(update);

    } catch (err) {
        next(err);
    }
}
import { sendVerifiedMessage, sendNotVerifiedMessage } from "../middleware/emailController.js";

export const verified = async (req, res) => {
    const booking_records = await BookingRecords.find();
    const uniqueEmails = new Set(booking_records.map(item => item._id));
    const count = uniqueEmails.size;
    console.log("Number room booked:", count);

    const roomTypes = await room_type.find();
    const roomNames = new Set(roomTypes.map(item => item.room_name));
    const roomType = roomNames.size;
    console.log("Number of unique room names:", roomType);

    const roomtype = await room.find();
    const roomName = new Set(roomtype.map(item => item.room_number));
    const rooms = roomName.size;
    console.log("Number of unique room names:", rooms);

    const findUser = await BookingRecords.findById(req.params.id)
    if (findUser) {
        // Update the verification message for the booking record
        findUser.paymentStatus = "Verified";
        await findUser.save();
        const paymentStatuss = findUser.paymentStatus
        console.log("THis is the Statussss: " + paymentStatuss);

        await sendVerifiedMessage(findUser)
        res.redirect('/Home')

      
    } else {
        res.render('./booking-record/Home', {
            booking: booking_records,
            'totalbookingcount': count, 'roomtype': roomType, 'room_number': rooms,
            message: "Not Verified",
            'findUser': findUser
        });
    }
}




export const notverified = async (req, res) => {
    const number = await BookingRecords.find();
    const findUser = await BookingRecords.findById(req.params.id)
    

    const booking_records = await BookingRecords.find();
  
    

    const roomTypes = await room_type.find();
    const roomNames = new Set(roomTypes.map(item => item.room_name));
    const roomType = roomNames.size;
    

    const roomtype = await room.find();
    const roomName = new Set(roomtype.map(item => item.room_number));
    const rooms = roomName.size;
    
    // Get the number of unique email addresses
    console.log(findUser);
    if (findUser) {

        await sendNotVerifiedMessage(findUser)

        // Delete the booking record from the database
        await BookingRecords.findByIdAndDelete(req.params.id);

        // Update the booking array to exclude the deleted booking record
        const booking = await BookingRecords.find();
        const uniqueEmails = new Set(booking.map(item => item._id));
        const count = uniqueEmails.size;
        

        res.redirect('/Home')
    }
    else {
        res.render('./booking-record/Home', { booking: number, message: "Couldn't find the user", 'room_number': rooms, 'totalbookingcount': count, 'roomtype': count, 'findUser': findUser });
    }
};
export const postQR = async (req, res, next) => {
    try {
        const { account_number } = req.body;
        const roomtype = await room_type.find();

        if (req.file) {
            const room_pictures = req.file.filename;
            const update = await room_type.findByIdAndUpdate(
                req.params.id, { account_number, room_pictures }
            );
            const path = "public/images/QR/" + update.room_pictures;
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err);
                }
                console.log("File removed");
            })

            res.redirect('/home')

            console.log(update);

        }

        const update = await room_type.findByIdAndUpdate(
            req.params.id, { account_number}
        );
        res.redirect('/')

        console.log(update);

    } catch (err) {
        next(err);
    }
}
  





