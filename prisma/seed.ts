import { Prisma, PrismaClient } from '@prisma/client';

import { profiles } from './profiles';
import { userPersonalData } from './userPersonalData';
import { users } from './users';

const prisma = new PrismaClient();

async function seed() {
	console.log("Starting DB Seeding");

	// Prisma create query to seed models in database
	// console.table(users);

	// const response = await prisma.user.create({
	// 	data: userOne,
	// });

	await prisma.user.createMany({
		data: users,
		skipDuplicates: true,
	});

	console.log(`Created users.`);

	for (const profile of profiles) {
		// const { userId, ...profileData } = profile; How to remove element with destructuring
		await prisma.profile.create({
			data: profile,
		});
	}

	for (const userData of userPersonalData) {
		await prisma.personalData.create({
			data: userData,
		});
	}

	console.log("Done DB Seeding");

	prisma.$disconnect().then(() => console.log("Disconnected Prisma!"));
}

seed();

export default seed;
