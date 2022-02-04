const express = require("express");
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')


/*const booking_Routes = require('./routes/api/bookingRoutes');
const payment_Routes = require('./routes/api/paymentRoutes');
const permission_Routes = require('./routes/api/permissionRoutes');
const role_Routes = require('./routes/api/roleRoutes');*/

const room_Route= require('./routes/api/roomRoutes');
const user_Routes = require('./routes/api/userRoutes');

const connectDB = require('./config/db');

connectDB();

//set up express app
const app = express() ;
app.use(express.json())
app.use(cookieParser())
app.use(cors());


//access for roomsRoute
/*app.use('/api/booking', booking_Routes);
app.use('/api/payment', payment_Routes);
app.use('/api/permission', permission_Routes);
app.use('/api/role', role_Routes);*/
app.use('/api/rooms', room_Route);
app.use('/api/users', user_Routes);

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`Listening on port ${port}`));

//trial