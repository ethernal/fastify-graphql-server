export default {
	preset: "ts-jest",
	testEnvironment: "node",
	restoreMocks: true,
	clearMocks: true,
	roots: ["<rootDir>/src"],
	setupFiles: ["dotenv/config"],
	collectCoverageFrom: ["src/**/*.{ts,js}"],
	testMatch: [
		"**/__tests__/**/*.+(ts|tsx|js)",
		"**/?(*.)+(spec|test).+(ts|tsx|js)",
	],
	testPathIgnorePatterns: ["/node_modules/", "/coverage/", "/dist/"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	coverageThreshold: {
		global: {
			branches: 30,
			functions: 30,
			lines: 30,
			statements: 30,
		},
	},
	coverageReporters: ["json", "lcov", "text", "clover"],
};
