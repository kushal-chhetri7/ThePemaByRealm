import bookingDetails from "../model/booking_record.js";
export const customer_record = (req,res,next)=>{
    try {
        const customer = bookingDetails.find()
        res.render('./customer_detail/Customer_Records')
    } catch (error) {
        console.log(error)
    }
}
export const customer = async (req,res,next)=>{
    try{
        const newTransactionRecord = bookingDetails({
            response:req.body.response,
          transactionID:req.body.transactionID,
          email:req.body.email,
        })
        await newTransactionRecord.save()
        console.log("sucess add jil")
    }catch(err){
        next (err)

    }
}
export const transactionrecord = async(req,res,next)=>{
    try {
        const transactionrecord = await bookingDetails.find();
        // Output: 2
             
        res.render('./customer_detail/Customer_Records',{
            'transaction':transactionrecord,
        })
    } catch (error) {
        console.log(error)
    }
  }
