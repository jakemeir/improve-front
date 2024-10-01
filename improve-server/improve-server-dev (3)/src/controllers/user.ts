import { Request, Response, NextFunction } from 'express';
import User  from '../models/user';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, phone, email, role, password} = req.body;

    if (!firstName || !lastName || !phone || !email || !role || !password) {
      const missingFields = ['firstName', 'lastName', 'phone', 'email', 'role', password].filter(
        (field) => !req.body[field]
      );

      const data: ApiResponse = {
        isSuccessful: false,
        displayMessage: `Missing required fields: ${missingFields.join(', ')}`,
        exception: 'Missing required fields',
        timestamp: new Date(),
        data: null,
      };

      res.status(400).json(data);
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const data: ApiResponse = {
        isSuccessful: false,
        displayMessage: 'A user with this email already exists',
        exception: 'Duplicate email',
        timestamp: new Date(),
        data: null,
      };

      res.status(409).json(data); 
      return;
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      role,
      password,
    });

    await newUser.save();

    const data: ApiResponse = {
      isSuccessful: true,
      displayMessage: 'User created successfully',
      exception: null,
      timestamp: new Date(),
      data: newUser,
    };

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
};

