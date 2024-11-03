import { User } from '../dtos/user.dto';

export const users: User[] = [
	{
		id: 0,
		username: 'admin',
		email: 'admin@example.com',
		password: '123456',
		role: 'admin',
	},
	{
		id: 1,
		username: 'user1',
		email: 'user1@example.com',
		password: '123456',
		role: 'editor',
	},
	{
		id: 2,
		username: 'user2',
		email: 'user2@example.com',
		password: '123456',
		role: 'viewer',
	},
	{
		id: 3,
		username: 'user3',
		email: 'user3@example.com',
		password: '123456',
		role: 'viewer',
	},
	{
		id: 4,
		username: 'user4',
		email: 'user4@example.com',
		password: '123456',
		role: 'viewer',
	},
	{
		id: 5,
		username: 'user5',
		email: 'user5@example.com',
		password: '123456',
		role: 'viewer',
	},
];
