import BookingRecords from "../model/booking_record.js";
import Stripe from "stripe";
import mongoose from 'mongoose';

const stripe = new Stripe("sk_test_51MncNfEFDoj9ddkDkgmoQpMi4W8qDdQPfEp8z7PhsaeFdHd5Z71V4JnU4LZSxF80vCQDMieERdoT7UZTKAbh0goc00GWDFuli6");
const YOUR_DOMAIN = "http://www.booking.realmbhutan.com/";





export const stripeForm = async (req, res) => {
    try {
        const { bookingId } = req.body;
        console.log(bookingId);

        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            console.error("Invalid booking ID");
            return res.sendStatus(400);
        }

        // Retrieve the booking record from the database using the ObjectId
        const bookingRecord = await BookingRecords.findById(bookingId);
        console.log(bookingRecord);

        if (!bookingRecord) {
            console.error("Booking record not found");
            return res.sendStatus(404);
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: bookingRecord.name,
                            description: "Check-in: " + bookingRecord.check_in.toDateString() + "\n"
                                + "Check-out: " + bookingRecord.check_out.toDateString() + "\n"
                                + "Adult: " + bookingRecord.adult + "\n"
                                + "Child: " + bookingRecord.child + "\n"
                                + "Special Requirements: " + bookingRecord.specialRequirement + "\n",
                        },

                        unit_amount: bookingRecord.Dollar * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${YOUR_DOMAIN}success`,
            cancel_url: `${YOUR_DOMAIN}`,
            metadata: {
                booking_id: bookingId,
            },
        });

        const paymentIntent = await stripe.checkout.sessions.retrieve(session.id);
        const { email, id: transactionId, amount, paymentStatus } = paymentIntent;
        bookingRecord.transactionId = transactionId;
        bookingRecord.amount = amount;
        bookingRecord.paymentStatus = paymentStatus
        await bookingRecord.save();

        res.json({ id: session.id, email, transactionId, amount, paymentStatus });



    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        res.sendStatus(500);
    }
};

// export const renderAdminDashboard = async (req, res) => {
//     const booking_records = await BookingRecords.find();
//     const { email, transactionId, amount } = req.query;

//     // Render the admin dashboard page with the retrieved information and booking records
//     res.render('./booking-record/Home', {
//         booking: booking_records,
//         totalbookingcount: count,
//         roomtype: count,
//         email,
//         transactionId,
//         response: amount
//     });
// };





export const getSuccessForm = async (req, res) => {
    res.render("./customer_booking/success");
}
export const getCancelForm = async (req, res) => {
    res.render("./customer_booking/cancel");
}