interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: 'Admin' | 'User';
  }
  export default User;