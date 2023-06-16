import BookingRecords from "../model/booking_record.js"
import room from "../model/room.js"
import room_type from "../model/room_type.js"


export const GetRoom = async (req, res) => {
  try {
    const roomtype = await room_type.find();
    res.render('./booking-record/searchOnDate', { roomtype, });
  } catch (error) {
    res.send("Internal error");
    console.log(error);
  }
};


function displayAvailableRooms(existingBookings, availableRooms, desiredStartDate, desiredEndDate) {
  // let availableRooms = ["room1", "room2", "room3", "room4", "room5"]; // Example list of available rooms
  
  // Check for overlapping bookings
  for (let i = 0; i < existingBookings.length; i++) {
    const booking = existingBookings[i];
    const bookingStartDate = booking[0];
    const bookingEndDate = booking[1];
    const bookedRooms = booking[2];

    // Check if the desired booking overlaps with an existing booking
    if (
      desiredStartDate <= bookingEndDate &&
      desiredEndDate >= bookingStartDate
    ) {
      // Remove the booked rooms from the list of available rooms
      availableRooms = availableRooms.filter(
        (room) => !bookedRooms.includes(room)
      );
    }
  }

  // Display the updated list of available rooms
  console.log("Available rooms:");

  let available = []
  for (let i = 0; i < availableRooms.length; i++) {
    // console.log(availableRooms[i]);
    available.push(availableRooms[i])
  }
    return available 

}



export const CheckBaseOnDate = async (req, res, next) => {
// Start

const { category, check_in, check_out } = req.body;
const existingBookingsData = await BookingRecords.find()

const existingBookings = existingBookingsData.map(booking => [
  booking.check_in.toISOString().split('T')[0], // Convert check_in to date string
  booking.check_out.toISOString().split('T')[0], // Convert check_out to date string
  booking.roomNumbers // Room numbers as is
]);

const rooms = await room.find({ category });
const roomslist = rooms.map(booking => booking.room_number);
const availableRooms = roomslist.flatMap(booking => booking);

console.log("existing bookings: ", existingBookings)
console.log("existing rooms: ", availableRooms)
console.log("desiredStartDate: ", check_in)
console.log("desiredEndDate: ", check_out)

const pemaRoom = displayAvailableRooms(
  existingBookings,
  availableRooms,
  check_in,
  check_out
);

console.log(pemaRoom)

res.render("./booking-record/summaryDetail",{
  pemaRoom,
  category,
  check_in,
  check_out,
});
}






export const record = async (req, res) => {
  try {
    res.render('./booking-record/Home')

  } catch (error) {
    res.send("Internal error")
    console.log(error);

  }
}
export const register = async (req, res, next) => {
  try {

    const newBooking_record = BookingRecords({
      check_in: req.body.check_in,
      check_out: req.body.check_out,
      name: req.body.name,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      specialRequirement: req.body.specialRequirement,
      adult: req.body.adult,
      totalAmount: req.body.totalAmount,
      child: req.body.child,
      transactionID: req.body.transactionID,
      rooms: req.body.rooms,
      roomNumbers: req.body.room_number,
      category: req.body.category,
      response: req.body.response,
      paymentStatus: req.body.paymentStatus

    })
    try {
      await newBooking_record.save();

    } catch (error) {
      console.error('Error updating documents:', error);
    }

    res.redirect('/home')
  } catch (err) {
    next(err)

  }
}

//retrieve and return all users and return a single user