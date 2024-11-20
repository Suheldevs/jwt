const mongoose = require('mongoose');

const dbConnection = async(url)=>{ 
await mongoose.connect(url).then(()=>console.log('DB connected successfully!')).catch((err)=>console.log('DB not connected'+ err));
}

module.exports = {dbConnection}