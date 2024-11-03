import { Request, Response } from 'express';

export const authRegister = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Register success' });
}

export const authLogin = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Login success' });
}