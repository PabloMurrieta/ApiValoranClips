import mongoose from "mongoose";


const clipSchema = new mongoose.Schema({

    title:{
        type:String,
        required: [true, 'El titulo es obligatorio']
    },
    description:{
        type:String
    },
    url: {
        type:String,
        required: [true, 'La url es obligatorio']
    },
    userID: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, 'El id del propetario es obligatorio'] 
    },
    status: {
        type: Boolean,
        default: true
    
      }
})

const Clip = mongoose.model("Clip", clipSchema);
export default Clip