
const mongoose = require('mongoose');

const dbConnection = async()=> {

    try{


      await   mongoose.connect(process.env.CONNECTION,{

        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false

      });
      console.log('Base de datos online');
    }
    catch(error){
        console.log(error);
        throw new Error('Eror a la hora de iniciar base de datos');
    }

}

module.exports = {
    dbConnection
}