import node from "@astrojs/node";
import react from "@astrojs/react";
import { auditLogPlugin } from "@emdash-cms/plugin-audit-log";
import { x402 } from "@emdash-cms/x402";
import { defineConfig } from "astro/config";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";

export default defineConfig({
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		x402({
			payTo: "0xb2197955eb3B5Ef9758fCEffc7C49245F21D4904",
			network: "eip155:84532",
			defaultPrice: "$0.01",
			botOnly: false,
		}),
		emdash({
			database: sqlite({ url: "file:./data.db" }),
			storage: local({
				directory: "./uploads",
				baseUrl: "/_emdash/api/media/file",
			}),
			plugins: [auditLogPlugin()],
		}),
	],
	devToolbar: { enabled: false },
});
