const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/service_1');

mongoose.connection.on('error', (error)=>{
    console.error(error);
})

mongoose.connection.on('connection', ()=>{
    console.info('Database connected!')
})

module.exports = mongoose;