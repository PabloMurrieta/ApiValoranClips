
import jwt from "jsonwebtoken"


const generarJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    const secretOrPrivateKey = process.env.SECRETORPRIVATEKEY || ''; // Asigna una cadena vacía si process.env.SECRETORPRIVATEKEY es undefined

    jwt.sign(payload, secretOrPrivateKey, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el token');
      } else {
        resolve(token);
      }
    }) ;
  });
};

export default generarJWT;