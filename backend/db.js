const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebookBackend"; // change here

const connectToMongo=async ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Database connected!");
    })
}

module.exports=connectToMongo;