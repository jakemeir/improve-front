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
    trainingName: string;
    image: string;
    sets: number;
    secondaryCategory: string;
    groups: string[];
    status: 'active' | 'inactive';
  }
