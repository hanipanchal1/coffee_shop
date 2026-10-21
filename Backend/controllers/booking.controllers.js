const booking = require('../models/booking')

const createbooking = async function (req, res) {
    try {
        const { name, email, phone, date, time, seats, notes } = req.body
        if (!name || !email || !phone || !date || !time || !seats || !notes) {
                return res.status(400).json({ msg: "All fields are required" })
            }

        const userId = req.data?._id || req.data?.id

            const Create = await booking.create({
                name,
                email,
                phone,
                date,
                time,
                seats,
                notes,
                userId
            })

        const populate = await Create.populate('userId', 'name role')
        res.status(201).json({ msg: 'Booking created successfully', createBooking: populate })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
 
const readbooking = async function(req,res){
    try{
            const Read = await booking.find().sort({createdAt:-1})
                res.status(200).json({msg:'Booking List',readBooking:Read})
    }
        catch(err){
        res.status(500).json({message:err.message})
    }
}

const deletebooking = async function (req, res) {
    try {
        const { id } = req.params
            const Delete = await booking.findByIdAndDelete(id)
        if (!Delete) {
            return res.status(404).json({ msg: 'Booking not found' })
    }
        res.status(200).json({ msg: 'Booking deleted successfully', deleteBooking: Delete })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
module.exports = {createbooking,readbooking,deletebooking}