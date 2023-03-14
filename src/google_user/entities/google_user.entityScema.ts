import { EntitySchema } from 'typeorm';

export const googleUserSchema = new EntitySchema({
	name: 'googleUser',
	columns: {
		email: {
			type: 'string',
			primary: true,
		},
		nickName: {
			type: 'string',
		},
	},
});
