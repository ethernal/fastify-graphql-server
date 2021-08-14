import { PrismaClient } from '@prisma/client';

import { users } from './users';

const prisma = new PrismaClient();

async function seed() {
	try {
		// Prisma create query to seed models in database
		// console.table(users);

		await prisma.user.createMany({
			data: users,
		});
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		async () => {
			await prisma.$disconnect();
			process.exit(0);
		};
	}
}

seed();

export default seed;
