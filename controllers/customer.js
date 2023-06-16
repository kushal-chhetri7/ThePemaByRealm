import QR_type from "../model/QR.js";
import BookingRecords from "../model/booking_record.js";
import room from "../model/room.js";
import room_type from "../model/room_type.js";
import CC from "currency-converter-lt";


export const loadSearchForm = async (req, res) => {
  try {
    const roomtype = await room_type.find();
    res.render('./customer_booking/search', { roomtype, });
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



export const postSearchForm = async (req, res, next) => {
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

res.render("./customer_booking/display",{
  pemaRoom,
  category,
  check_in,
  check_out,
});
      
};

export const loadDisplayAvailabeRoom = async (req, res) => {
  try {
    res.render('./customer_booking/displaying_available_room')

  } catch (error) {
    res.send("Internal error")
    console.log(error);

  }
}
function countDays(startDate, endDate) {
  // Convert the date strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the time difference in milliseconds
  const timeDiff = Math.abs(end - start);

  // Convert milliseconds to days
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return days;
}
export const BookRoom = async (req, res) => {
  try {
    let checkbox = 0;
    const checkedCheckboxes = req.body.room_number;

    if (Array.isArray(checkedCheckboxes)) {
      checkbox += checkedCheckboxes.length;
    } else if (checkedCheckboxes) {
      checkbox++;
    }

    console.log(checkbox);

const newBooking_record = BookingRecords({
      check_in: req.body.check_in,
      check_out: req.body.check_out,
      name: req.body.name,
      email: req.body.email,
      contactNumber: req.body.contact,
      specialRequirement: req.body.specialRequirement,
      adult: req.body.adult,
      child: req.body.child,
      rooms: req.body.rooms,
      roomNumbers: req.body.room_number,
      category: req.body.category,
      isOnline: true
    })

    const findroom = req.body.room_number;
    console.log(findroom);

    const filter = { room_number: { $in: findroom } };
    const update = { $set: { isbooked: true } };

    try {

      let data = await newBooking_record.save();
      const findPrice = await room.find({ category: req.body.category });
      const [price] = findPrice;
      const findTax = await room_type.find({ room_name: req.body.category });
      console.log(findTax);
      const [tax] = findTax;
      const finalValue = ((price.price * req.body.adult + tax.child_rate * req.body.child) + tax.tax) * parseInt(checkbox);
      const numDays = countDays(req.body.check_in, req.body.check_out);
      console.log("HHHHH" + numDays);
      console.log(finalValue * numDays);
      let Dollar = (finalValue * numDays).toFixed(2);


      const updatedBookingRecord = await BookingRecords.findByIdAndUpdate(
        data._id,
        { Dollar },
        { new: true }
      );



      res.render('./customer_booking/reservation', { data, Dollar, tax })

    } catch (error) {
      console.error('Error updating documents:', error);
    }

  } catch (error) {
    res.send("Internal error")
    console.log(error);

  }
}


export const choose = async (req, res, next) => {

  try {
    const user = await BookingRecords.findOne().sort({ _id: -1 }).limit(1);

    if (!user) {
      console.error("User not found");
      return res.sendStatus(404);
    }
    const bookingId = user._id.toString(); // Retrieve the ObjectId of the user document as a string

    res.render('./customer_booking/payment', { bookingId }); // Render the checkout template and pass the bookingId
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
export const incountry = async (req, res, next) => {

  const bookingRecord = await BookingRecords.findOne().sort({ _id: -1 }).limit(1);
  const dollar = bookingRecord.Dollar;
  let fromCurrency = "USD"; // US Dollars
  let toCurrency = "BTN"; //  Bhutanese Nu
  let amountToConvert = dollar;
  console.log("This is grand: " + amountToConvert);

  let currencyConverter = new CC({
    from: fromCurrency,
    to: toCurrency,
    amount: amountToConvert
  });

  currencyConverter.convert().then(async (response) => {
    try {
      console.log("Response value:", response);
      const convertedResponse = Math.round(parseFloat(response));
      console.log("Converted response:", convertedResponse);

      const updatedBookingRecord = await BookingRecords.findByIdAndUpdate(
        bookingRecord._id,
        { response: convertedResponse },
        { new: true }
      );
      const QRcountry = await QR_type.findOne();
      console.log("THIS IS FROM QR"+QRcountry);
      
      console.log("Updated booking record:", updatedBookingRecord);
      res.render('./customer_booking/country', { bookingRecord: updatedBookingRecord, response: convertedResponse ,QRcountry});
    } catch (error) {
      next(error);
    }
  });

};

export const outcountry = async (req, res, next) => {
  const bookingRecord = await BookingRecords.findOne().sort({ _id: -1 }).limit(1);
  const roomtyp = await room_type.find();
  const childRates = roomtyp.map(category => category.child_rate);
  const adultRates = roomtyp.map(roomtypes => roomtypes.adult_rate);
  const tax = roomtyp.map(roomtypes => roomtypes.tax);
  let v1 = childRates[0];
  let v2 = tax[0];
  let v3 = adultRates[0];
  const final = await BookingRecords.find();
  const x4 = final.map(record => record.child);
  const x5 = final.map(record => record.adult);

  let totalAmount;

  for (let i = 0; i < final.length; i++) {
    totalAmount = x4[i] * v1 + x5[i] * v3;
  }
  const response = totalAmount * v2

  const updatedBookingRecord = await BookingRecords.findByIdAndUpdate(
    bookingRecord._id,
    { response },
    { new: true }
  );
  res.render('./customer_booking/outcountry', { bookingRecord: updatedBookingRecord, response });
}

export const transaction = async (req, res) => {
  const id = req.params.id;
  const transactionID = req.body.transactionID;
  const updatedBookingRecord = await BookingRecords.findByIdAndUpdate(
    id,
    { transactionID },
    { new: true }
  );
  console.log(updatedBookingRecord);
  res.render('./customer_booking/sucessincountry')

}

// export const QR_country = async (req, res, next) => {
//   try {
//       const QRcountry = await QR_type.find();
      
//       res.render('./customer_booking/country', {
//           QRcountry
//       })

//   } catch (error) {
//       console.log(error)
//   }
// }


// export const postEmptyRoom = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const foundroom = await room.findById(id);

//     if (foundroom) {
//       foundroom.isbooked = false;
//       await foundroom.save()
//       res.redirect('/room')
//     }
//   } catch (error) {
//     res.send('internal error ')
//     console.log(error);

//   }
// }