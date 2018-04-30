const mongoose = require("mongoose");

if(process.env.NODE_AMBIENTE == 'docker'){
  mongoose.connect('mongodb://mongo/service_1');
}else{
  mongoose.connect('mongodb://localhost/service_1');
}

mongoose.connection.on('error', (error)=>{
    console.error(error);
})

mongoose.connection.on('connected', ()=>{
    console.info('Database connected!')
})

module.exports = mongoose;
