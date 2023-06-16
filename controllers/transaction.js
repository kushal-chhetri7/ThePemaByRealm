
import transaction from "../model/out_transaction.js";
export const viewpayment = async(req,res,next)=>{
    try {
        const roomtype=await transaction.find()
        res.render('./payment/userpayment')
    } catch (e) {
      console.log(e)  
    }
}
export const transactionID = async (req,res,next)=>{
    try{
        const newTransactionRecord = transaction({
          check_in:req.body.check_in,
          check_out:req.body.check_out,
          name:req.body.name,
          email:req.body.email,
          contactNumber:req.body.contactNumber,
          specialRequirement:req.body.specialRequirement,
          adult:req.body.adult,
          child:req.body.child,
          category:req.body.category,
          amount:req.body.amount,
          tax:req.body.tax,
          journal_No:req.body.journal_No,


        })
        const data=await newTransactionRecord.save()
        console.log(data);

        let product = data.amount * data.tax;
        res.render('./payment/summary',{data, product})
    }catch(err){
        next (err)

    }
}


export const payment = async (req, res, next) => {
    try {
        
        const paymentRecord = await transaction.find();
        console.log(paymentRecord);

      res.render('./payment/summary', {
        payment: paymentRecord,
        product: product,
      });
    } catch (error) {
      console.log(error);
      // Handle other errors
      res.status(500).send('Internal Server Error');
    }
  };
  
   
