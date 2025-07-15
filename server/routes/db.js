const mongoose = require('mongoose');
 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI='mongodb+srv://nehemiahkiptoo7:KIPTOONEM@cluster0.kauwuqr.mongodb.net/manspace?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected successfully');      
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};
  
module.exports = connectDB;