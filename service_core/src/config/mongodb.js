const mongoose = require("mongoose");

if(process.env.NODE_AMBIENTE == 'docker'){
  mongoose.connect('mongodb://mongo/service_core');
}else{
  mongoose.connect('mongodb://localhost/service_core');
}

mongoose.connection.on('error', (error)=>{
    console.error(error);
})

mongoose.connection.on('connected', ()=>{
    console.info('Database connected!')
})

module.exports = mongoose;