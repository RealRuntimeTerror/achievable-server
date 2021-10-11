require('dotenv').config()
const mongoose = require('mongoose')

//connect database
module.exports.connect = async () => {
    mongoose.connect(process.env.DATABASE_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
      
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('db opened'))    
}
  

//disconnect, close connection
module.exports.disconnectDB = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}
//clear db, remove data
module.exports.clearDB = async () =>{
    const collections = mongoose.connection.collections;
    for (const key in collections){
        const collection = collections[key];
        await collection.deleteMany();
    }
}