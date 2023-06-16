import room_type from "../model/room_type.js";
import fs from 'fs'

export const Roomtype = async (req, res, next) => {
    try {
        const roomtype = await room_type.find();
        console.log(roomtype.map(room => typeof room.room_name));
        res.render('./room-type/RoomTypes', {
            'roomtype': roomtype
        })

    } catch (error) {
        console.log(error)
    }
}
export const deleteroom_type = async (req, res, next) => {
    try {
        const roomtype = await room_type.find();
        const foundItem = await room_type.findByIdAndDelete(
            req.params.id,
        );
        const path = "public/images/room-type/" + foundItem.room_pictures;
        fs.unlink(path, (err) => {
            if (err) {
                console.error(err);
            }
            console.log("File removed");
        });
        res.redirect('/roomtype')
    } catch (err) {
        next(err);
    }
}

export const editroomtype = async (req, res, next) => {
    try {

        const updates = await room_type.findById(
            req.params.id,
        );
        res.render('./room-type/edit', {
            updates: updates

        })
        console.log(update);
    } catch (err) {
        next(err);
    }
}



export const posteditroomtype = async (req, res, next) => {
    try {
        const { room_name, description_a, aminities, child_rate, tax } = req.body;
        const roomtype = await room_type.find();

        if (req.file) {
            const room_pictures = req.file.filename;
            const update = await room_type.findByIdAndUpdate(
                req.params.id, { room_name, room_pictures, description_a, aminities, child_rate, tax }
            );
            const path = "public/images/room-type/" + update.room_pictures;
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err);
                }
                console.log("File removed");
            })

            res.redirect('/roomtype')

            console.log(update);

        }

        const update = await room_type.findByIdAndUpdate(
            req.params.id, { room_name, description_a, aminities, child_rate, tax }
        );
        res.redirect('/roomtype')

        console.log(update);

    } catch (err) {
        next(err);
    }
}
// export const countByType = async (req, res, next) => {
//     try {
//         const RoomBook = await room_type.countDocuments({ type: "hotel" });
//         const RoomType = await room_type.countDocuments({ type: "deluxe" });
//         const TotalRoom = await room_type.countDocuments({ type: "total" });


//         res.status(200).json([
//             { type: "hotel", count: RoomBook },
//             { type: "apartments", count: RoomType },
//             { type: "resorts", count: TotalRoom },

//         ]);
//     } catch (err) {
//         next(err);
//     }
// };