export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: 'Admin' | 'User';
  }

  export interface Train {
    _id: string;
    name: string;
    description?: string;
    sets: number;
    times: number;
    category: string;
    status: boolean;
    imgPath: string;
  }
  
  export interface Recipe {
    _id: string;
    name: string;
    description?: string;
    imgPath: string;
    ingredients: string[];
    instruction: string;
  }
