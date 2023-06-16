import room from "../model/room.js"
import room_type from "../model/room_type.js"

export const viewroom = async (req, res, next) => {
    try {
        const roomtype = await room_type.find()
        res.render('./room/AddNewRoom', { roomtype })
    } catch (e) {
        console.log(e)
    }
}

export const NewRoom = async (req, res, next) => {
    try {
        const newRoom = room({
            room_number: req.body.room_number,
            price: req.body.price,
            description: req.body.description,
            maxPeople: req.body.maxPeople,
            category: req.body.category
        })
        await newRoom.save()
        res.redirect('/room')
    } catch (err) {
        next(err)

    }
}