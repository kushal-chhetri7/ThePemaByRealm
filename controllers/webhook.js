import express from "express";
import Stripe from "stripe";
import BookingRecords from "../model/booking_record.js"; // Update the path to your booking record model

const stripe = new Stripe("sk_test_51MncNfEFDoj9ddkDkgmoQpMi4W8qDdQPfEp8z7PhsaeFdHd5Z71V4JnU4LZSxF80vCQDMieERdoT7UZTKAbh0goc00GWDFuli6");
const webhook = express();

// Configure the JSON body parser middleware
webhook.use(express.json());

// Set the secret signing key for Stripe webhook events
const endpointSecret = "whsec_sho6NFM9IywRDiTCqC2DA4gaayt6IwMR";

// Define the route for handling Stripe webhook events
export const webhooking = async (req, res) => {


    const sig = req.headers["stripe-signature"];
    let event;

    // try {
    //     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    // } catch (error) {
    //     console.error("Error verifying Stripe webhook event:", error);
    //     return res.status(400).send(`Webhook Error: ${error.message}`);
    // }
    event = req.body;

    console.log("--------STRIPE WEBHOOK HIT");

    // Handle the specific Stripe webhook event type
    if (event.type === "checkout.session.completed") {
        console.log("If condition hit");
        const paymentIntent = event.data.object;
        const bookingId = paymentIntent.metadata.booking_id;

        try {
            // Retrieve the booking record with the specified booking ID
            const bookingRecord = await BookingRecords.findById(bookingId);

            if (!bookingRecord) {
                console.error("Booking record not found");
                return res.sendStatus(404);
            }

            // Update the booking record with the payment amount from Stripe
            bookingRecord.Dollar = parseInt(paymentIntent.amount_total / 100); // Convert from smallest currency unit (e.g., cents) to actual amount
            console.log("This is transaci id" + paymentIntent.payment_intent);
            bookingRecord.transactionID = paymentIntent.payment_intent
            bookingRecord.paymentStatus = paymentIntent.status;
            await bookingRecord.save();

            // Handle any further processing or notifications related to the payment

            console.log("Payment amount updated for booking ID:", bookingId);
            res.sendStatus(200);
        } catch (error) {
            console.error("Error updating payment amount:", error);
            res.sendStatus(500);
        }
    }
    // handle fail events

    // Respond with a 200 OK status to acknowledge receipt of the webhook event


}

// Start the webhook server
// webhook.listen(3000, () => {
//     console.log("Stripe webhook server started");
// });

