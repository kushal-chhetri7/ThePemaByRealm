
import QR_type from "../model/QR.js";

import fs from 'fs'

export const QR = async (req, res, next) => {
    try {
        const QR_typee = await QR_type.find();
        
        res.render('./QR/DisplayQR', {
            'QR_typee': QR_typee
        })

    } catch (error) {
        console.log(error)
    }
}

export const Qrr = async (req, res, next) => {
    try {
        const QR_types= await QR_type.find();
        
        res.render('./QR/AddQR', {QR_types
        })

    } catch (error) {
        console.log(error)
    }
}

export const addQR = async (req,res,next)=>{
    try{

        const image = req.file.filename;
        const newRoom_type = QR_type({
            account_number:req.body.account_number,
            
            QR_pictures:image,
              
        })
        await newRoom_type.save()
        
        res.redirect('/QR')

    }catch(err){
        next (err)

    }
}


export const deleteQR = async (req, res, next) => {
    try {
        const QRtype = await QR_type.find();
        const foundItem = await QR_type.findByIdAndDelete(
            req.params.id,
        );
        const path = "public/images/QR/" + foundItem.QR_pictures;
        fs.unlink(path, (err) => {
            if (err) {
                console.error(err);
            }
            console.log("File removed");
        });
        res.redirect('/QR')
    } catch (err) {
        next(err);
    }
}

export const editQR = async (req, res, next) => {
    try {

        const update = await QR_type.findById(
            req.params.id,
        );
        res.render('./QR/editQR', {
            updates: update

        })
        console.log(update);
    } catch (err) {
        next(err);
    }
}



export const posteditQR = async (req, res, next) => {
    try {
        const { account_number, } = req.body;
        const QRtype = await QR_type.find();

        if (req.file) {
            const QR_pictures = req.file.filename;
            const update = await QR_type.findByIdAndUpdate(
                req.params.id, { account_number, QR_pictures }
            );
            const path = "public/images/QR/" + update.QR_pictures;
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err);
                }
                console.log("File removed");
            })

            res.redirect('/QR')

            console.log(update);

        }

        const update = await QR_type.findByIdAndUpdate(
            req.params.id, { account_number }
        );
        res.redirect('/QR')

        console.log(update);

    } catch (err) {
        next(err);
    }
}
