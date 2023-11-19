import User from "../models/user.js";

//-User-----------------------------------------------------------------
export const checkIfUserExists = async (name: string): Promise<void> => {
  const existingUser = await User.findOne({ name });

  if (existingUser) {
    throw new Error('El usuario ya existe');
  }
};

export const checkIfUserNoExists = async (id: string): Promise<void> => {
  const existingUser = await User.findOne({ id });

  if (!existingUser) {
    throw new Error('El usuario no existe');
  }
};
  
//--Rank--------------------------------------------------------------------
export const checkIfRankExists = async (rango: string): Promise<void> => {
  const existingRank = await User.findOne({ rango });

  if (existingRank) {
    throw new Error('El rnk ya existe');
  }
}


export const checkIfRankNoExists = async (rango: string): Promise<void> => {
  const existingRank = await User.findOne({ rango });

  if (!existingRank) {
    throw new Error('El rank no existe');
  }
}



  
    


