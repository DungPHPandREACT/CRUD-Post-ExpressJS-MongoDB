import {Request} from 'express'
import { User } from './user.dto'

export interface CustomRequest extends Request{
    user?: User
}