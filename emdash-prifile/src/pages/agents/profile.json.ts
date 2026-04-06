import type { APIRoute } from "astro";

import { profile } from "../../data/profile";

export const GET: APIRoute = async ({ locals, request }) => {
	const { x402 } = locals;

	const result = await x402.enforce(request, {
		description: "Structured profile data for AI agents",
		mimeType: "application/json",
	});

	if (result instanceof Response) return result;

	const response = new Response(JSON.stringify(profile, null, 2), {
		headers: { "Content-Type": "application/json" },
	});

	x402.applyHeaders(result, response);
	return response;
};
