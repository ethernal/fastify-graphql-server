import { Prisma } from '@prisma/client';

export const profiles: Prisma.ProfileCreateInput[] = [
	{
		id: "2001",
		profileNamePublic: "Developer",
		profileNamePrivate: "Developer Mid-Level",
		user: {
			connect: {
				id: "1",
			},
		},
	},
	{
		id: "2002",
		profileNamePublic: "Frontend Developer",
		profileNamePrivate: "Junior React Frontend Developer",
		user: {
			connect: {
				id: "1",
			},
		},
	},
	{
		id: "2003",
		profileNamePublic: "IT Specialist",
		profileNamePrivate: "IT Support Engineer",
		user: {
			connect: {
				id: "1",
			},
		},
	},
	{
		id: "2004",
		profileNamePublic: "Accountant",
		profileNamePrivate: "Head Accounant Assistant",
		user: {
			connect: {
				id: "2",
			},
		},
	},
];
