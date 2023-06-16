//final product
import BookingRecords from "../model/booking_record.js";
import room from "../model/room.js";

export const addnewroom = async (req, res, next) => {
    const roomtypeId = req.params.roomtypeid;
    try {
        const Addroom = await room.find({});
        res.render('./room/Rooms', {
            'addnewroom': Addroom
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteroom = async (req, res, next) => {
    try {
        const newroom = await room.find();
        await room.findByIdAndDelete(
            req.params.id,
        );
        res.redirect('/room')
    } catch (err) {
        next(err);
    }
}
export const editroom = async (req, res, next) => {
    try {

        const update = await room.findById(
            req.params.id,
        );
        res.render('./room/edit', {
            updates: update

        })
        console.log(update);
    } catch (err) {
        next(err);
    }
}
// export const posteditroom = async (req, res, next) => {
//     try {
//         const { description,room_status, room_number, price,category } = req.body;
        
//         const addroom = await room.find();
        

//         const update = await room.findByIdAndUpdate(
//             req.params.id, { room_status, room_number, price, description,category }
//         );
        

//         res.render('./room/Rooms', {
//             'addnewroom': addroom
//         })

//         console.log(update);

//     } catch (err) {
//         next(err);
//     }
// }
export const posteditroom = async (req, res, next) => {
    try {
        const {  room_number, price,category } = req.body;
        const description = req.body.description.join(' '); // Join the array of descriptions into a single string

        const roomedit = await room.find();

        const update = await room.findByIdAndUpdate(
            req.params.id, { room_number, price, description, category }
        );

       
        res.redirect('/room')

        console.log(update);

    } catch (err) {
        next(err);
    }
}

