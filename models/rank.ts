import mongoose from "mongoose";
import cloudynary from 'cloudinary'

cloudynary.v2.config(process.env.CLOUDINARY_URL||'');




const rankSchema = new mongoose.Schema({

  rango:{
    type: String,
    required:[true, 'El rango es obligatorio']
  },   
  status: {
    type: Boolean,
    default: true

  }
  
});


  
  const Rank = mongoose.model("Rank", rankSchema);
  export default Rank