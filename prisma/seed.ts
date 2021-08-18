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

	prisma.user
		.createMany({
			data: users,
			skipDuplicates: true,
		})
		.then((result) => {
			console.log(`Affected user rows: ${result.count}`);

			for (const profile of profiles) {
				// const { userId, ...profileData } = profile; How to remove element with destructuring
				prisma.profile.create({
					data: profile,
				});
			}

			for (const userData of userPersonalData) {
				prisma.personalData.create({
					data: userData,
				});
			}
		});

	console.log("Done DB Seeding");

	prisma.$disconnect().then(() => console.log("Disconnected Prisma!"));
}

seed();

export default seed;
