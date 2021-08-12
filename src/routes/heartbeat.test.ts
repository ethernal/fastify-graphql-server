const { createMercuriusTestClient } = require("mercurius-integration-testing");
import { gql } from 'mercurius-codegen';

import { server } from '../server';

describe("GET /heartbeat - a simple api endpoint", () => {
	it("Heartbeat API Request", async () => {
		const client = createMercuriusTestClient(server);

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
