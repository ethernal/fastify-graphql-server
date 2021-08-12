import { gql } from 'mercurius-codegen';
import { createMercuriusTestClient } from 'mercurius-integration-testing';

import { server } from '../server';

// get the type for the client from the function return type of createMercuriusTestClient function
type clientType = ReturnType<typeof createMercuriusTestClient>;

let client: clientType;

beforeAll(() => {
	client = createMercuriusTestClient(server);
});

describe("Test GraphQL Queries", () => {
	test("Hello Query with correct name:String parameter", async () => {
		const result = await client.query(
			gql`
				query {
					hello(name: "Sebastian")
				}
			`
		);

		expect(result).toMatchObject({ data: { hello: "hello Sebastian" } });
	});
});

afterAll(() => server.close());
