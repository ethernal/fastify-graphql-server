import { PrismaClient } from "@prisma/client";

import { users } from "./users";

const prisma = new PrismaClient();

async function seed() {
	try {
		console.log("Starting DB Seeding");

		// Prisma create query to seed models in database
		// console.table(users);

		const response = await prisma.user.createMany({
			data: users,
			skipDuplicates: true,
		});

		console.log(`Affected rows: ${response.count}`);
		console.log("Done DB Seeding");
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
		console.log("Disconnected Prisma!");
	}
}

seed();

export default seed;
