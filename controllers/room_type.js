import room_type from "../model/room_type.js"
export const viewRoom_type = async(req,res,next)=>{
    try {
        res.render('./room-type/NewRoomType')
    } catch (e) {
      console.log(e)  
    }
}
export const addroom = async (req,res,next)=>{
    try{

        const image = req.file.filename;
        const newRoom_type = room_type({
            room_name:req.body.room_name,
            
            room_pictures:image,
            description_a:req.body.description_a,
            //description_b:req.body.description_b,
            aminities:req.body.aminities,
            child_rate:req.body.child_rate,
            adult_rate:req.body.adult_rate,
            tax:req.body.tax,
            //amount:req.body.tax    
        })
        await newRoom_type.save()
        
        res.redirect('/roomtype')

    }catch(err){
        next (err)

    }
}