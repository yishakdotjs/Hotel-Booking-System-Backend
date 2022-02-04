const roomModel = require ('../model/room')

//const router = require ('../routes/api/roomsRoute');


const RoomsController ={
    getRooms: async(req, res) => 
    {
        try {
            const rooms = await roomModel.find({})
            return res.json({ rooms });
        }catch (error) {
            return res.status(400).json({ message: error });
        }
    },
}
module.exports =  RoomsController;