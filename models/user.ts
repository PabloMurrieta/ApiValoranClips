import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],

  },
  rank: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Rank',
    required:  [true, 'El rango es obligatorio']

  },
  status: {
    type: Boolean,
    default: true

  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // Asegurarse de que this.password tenga un valor antes de hashear
  if (typeof this.password === 'string') {
    const saltRounds = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.toJson = function(){
  const {__v, _id, ...user} = this.toObject();
  user.uid = _id;
  return user
}

const User = mongoose.model("User", userSchema);
export default User