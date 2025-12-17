import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
	// Temporarily return a test message to check if route works
	return new Response(
		JSON.stringify({ message: "测试消息：API路由工作了！" }),
		{
			status: 200,
			headers: { "Content-Type": "application/json" },
		},
	);
};
