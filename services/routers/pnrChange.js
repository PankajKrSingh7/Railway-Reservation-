const express = require('express')
const router = express.Router()
const reservation = require('../model/reservation')
const changePNR = require('../model/changePNR')

router.post('/reqPNRChange', async (req, res) => {
    const {oldPNR, newPNR, comment} = req.body;
    console.log(req.body);
    try {
        reservation.findOne({pnr: newPNR}, async (err, newUser) => {
            if(oldPNR===newPNR) return res.status(200).json({status: 2, message: "This is the same PNR dumbo! XD"});
            if(newUser){
                try { 
                    changePNR.findOne(
                        {$or: [
                            { from: oldPNR, to: newPNR },
                            { from: newPNR, to: oldPNR }
                        ]
                        }
                        , async (err,oldUser)=>{
                        if(oldUser){
                            res.status(200).json({
                                status: 1,
                                message: 'Already requested'
                            })
                        }else{
                            const oldUser = await reservation.findOne({pnr: oldPNR});
                            console.log('22',oldUser);
                            const pnrUpdate = new changePNR({
                                from: oldPNR,
                                to: newPNR,
                                user: newUser.user,
                                oldUser,
                                newUser,
                                comment: comment
                            })
                            await pnrUpdate.save();
                            res.status(200).json({
                                status: 1,
                                message: 'Request sucessully sent'
                            })
                        }
                    });
                } catch (error) {
                    res.status(200).json({status: 0, message:"Something went wrong"});
                }
            }
            else{
                res.status(200).json({status: 2, message:"Entered PNR not found"});
            }
        })
    } catch (err) {
        res.status(200).json({status: 0, message:"Something went wrong"});
    }
});

router.post('/getPNRChangeReq', async (req,res)=>{
    const {userId} = req.body;
    try {
        const PNRrequests = await changePNR.find({user: userId});  
        res.status(200).json(PNRrequests);
    } catch (error) {
        res.status(200).json({status: 0, message:"Something went wrong"});
    }
})

router.post('/actionPNRChangeReq', async (req,res)=>{
    const {id, accept} = req.body;
    if(accept){
        try {
            const changePnr = await changePNR.findOne({_id: id});
            console.log(changePnr);
            const a = await reservation.findOneAndUpdate({pnr: changePnr.from}, {phone: changePnr.newUser.phone, user: changePnr.newUser.user, email: changePnr.newUser.email, name: changePnr.newUser.name});
            const b = await reservation.findOneAndUpdate({pnr: changePnr.to},   {phone: changePnr.oldUser.phone, user: changePnr.oldUser.user, email: changePnr.oldUser.email, name: changePnr.oldUser.name});
            console.log(a,b);

        } catch (error) {
            console.log(error);
            res.status(200).json({status: 0, message:"Something went wrong"});
        }
    }
    try {
        const changePnr = await changePNR.findOneAndDelete({_id: id});
        res.status(200).json({status: 1, message:accept?"Requesr Accepted":"Request Deleted"});
    }
    catch (error) {
        res.status(200).json({status: 0, message:"Something went wrong"});
    }
})

module.exports = router