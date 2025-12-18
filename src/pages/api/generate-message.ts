import type { APIRoute } from "astro";
import { API_KEYS } from "../../config/api-keys";

// 模拟IP地理位置数据库（实际项目中应使用真实API）
const IP_LOCATION_DATA: Record<
	string,
	{ province: string; city: string; distance: number }
> = {
	"202.96.128.86": { province: "广东省", city: "广州市", distance: 120 },
	"113.108.192.123": { province: "广东省", city: "深圳市", distance: 90 },
	"119.123.124.125": { province: "广东省", city: "珠海市", distance: 101 },
	"111.192.123.124": { province: "北京市", city: "北京市", distance: 2100 },
	"112.123.124.125": { province: "上海市", city: "上海市", distance: 1200 },
	"114.115.116.117": { province: "浙江省", city: "杭州市", distance: 1100 },
};

// 模拟地理位置笑话库（作为备用）
const LOCATION_JOKES: Record<string, string[]> = {
	广东省: ["老板来两斤福建人。", "食神钦点的美食家。", "早茶文化的传承者。"],
	北京市: ["帝都来的VIP客人。", "烤鸭的终极品鉴家。", "胡同里的时尚达人。"],
	上海市: ["魔都潮流引领者。", "外滩夜景欣赏专家。", "精致生活的代言人。"],
	default: [
		"远方的朋友，欢迎来访！",
		"跨越千山万水来相聚。",
		"网络让我们心连心。",
	],
};

export const GET: APIRoute = async ({ request }) => {
	try {
		// 获取客户端IP地址
		const clientIP = getClientIP(request);

		// 模拟获取地理位置信息
		const locationInfo = getLocationInfo(clientIP) || {
			province: "未知地区",
			city: "未知城市",
			distance: 0,
		};

		// 生成欢迎消息
		const welcomeMessage = generateWelcomeMessage(
			locationInfo.province,
			locationInfo.city,
		);

		// 尝试使用DeepSeek API生成智能欢迎消息和笑话
		let aiWelcomeMessage = "";
		let aiJoke = "";

		try {
			const aiResponse = await generateAIWelcomeMessageAndJoke(
				locationInfo.province,
				locationInfo.city,
				locationInfo.distance,
			);

			aiWelcomeMessage = aiResponse.welcomeMessage;
			aiJoke = aiResponse.joke;
		} catch (aiError) {
			console.warn("AI生成失败，使用默认消息:", aiError);
		}

		// 如果AI生成失败，则使用默认生成方式
		const finalWelcomeMessage = aiWelcomeMessage || welcomeMessage;
		const finalJoke = aiJoke || generateLocationJoke(locationInfo.province);

		return new Response(
			JSON.stringify({
				ip: clientIP,
				location: locationInfo,
				welcomeMessage: finalWelcomeMessage,
				joke: finalJoke,
				timestamp: new Date().toLocaleString("zh-CN"),
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
			},
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: "获取信息失败",
				message: "或许你已经飞出🌏了吧",
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
			},
		);
	}
};

// 获取客户端IP地址的辅助函数
function getClientIP(request: Request): string {
	// 尝试从各种请求头获取IP
	const xForwardedFor = request.headers.get("x-forwarded-for");
	if (xForwardedFor) {
		return xForwardedFor.split(",")[0].trim();
	}

	const cfConnectingIP = request.headers.get("cf-connecting-ip");
	if (cfConnectingIP) {
		return cfConnectingIP;
	}

	const xRealIP = request.headers.get("x-real-ip");
	if (xRealIP) {
		return xRealIP;
	}

	// 如果都获取不到，返回一个模拟IP用于测试
	return "119.123.124.125"; // 模拟珠海的IP
}

// 获取地理位置信息的辅助函数
function getLocationInfo(ip: string) {
	return IP_LOCATION_DATA[ip];
}

// 生成欢迎消息的辅助函数
function generateWelcomeMessage(province: string, city: string): string {
	const hour = new Date().getHours();
	let timeGreeting = "";

	if (hour >= 5 && hour < 12) {
		timeGreeting = "早上好";
	} else if (hour >= 12 && hour < 14) {
		timeGreeting = "中午好";
	} else if (hour >= 14 && hour < 18) {
		timeGreeting = "下午好";
	} else if (hour >= 18 && hour < 22) {
		timeGreeting = "晚上好";
	} else {
		timeGreeting = "夜深了";
	}

	return `欢迎来自 ${province} ${city} 的小伙伴，${timeGreeting}`;
}

// 生成地理位置笑话的辅助函数
function generateLocationJoke(province: string): string {
	const jokes = LOCATION_JOKES[province] || LOCATION_JOKES["default"];
	const randomIndex = Math.floor(Math.random() * jokes.length);
	return jokes[randomIndex];
}

// 使用DeepSeek API生成智能欢迎消息和笑话
async function generateAIWelcomeMessageAndJoke(
	province: string,
	city: string,
	distance: number,
): Promise<{ welcomeMessage: string; joke: string }> {
	// 检查是否配置了DeepSeek API密钥
	if (!API_KEYS.DEEPSEEK_API_KEY) {
		throw new Error("未配置DeepSeek API密钥");
	}

	const hour = new Date().getHours();
	let timeGreeting = "";

	if (hour >= 5 && hour < 12) {
		timeGreeting = "早上好";
	} else if (hour >= 12 && hour < 14) {
		timeGreeting = "中午好";
	} else if (hour >= 14 && hour < 18) {
		timeGreeting = "下午好";
	} else if (hour >= 18 && hour < 22) {
		timeGreeting = "晚上好";
	} else {
		timeGreeting = "夜深了";
	}

	// 构造提示词
	const prompt = `你是一个友好的网站助手，请根据以下信息生成一条欢迎消息和一条幽默的地域相关笑话：

用户信息：
- 地区：${province}${city}
- 距离网站管理员位置：约${distance}公里
- 访问时间：${timeGreeting}

要求：
1. 欢迎消息要亲切友好，包含用户的地区信息和时间问候
2. 地域笑话要幽默风趣，与用户所在地区相关，但不能有冒犯性
3. 回复格式为严格的JSON对象：{"welcomeMessage": "欢迎消息内容", "joke": "笑话内容"}
4. 使用中文回复
5. 不要包含任何额外的解释或文本，只返回JSON对象

例如：
{"welcomeMessage": "欢迎来自广东省深圳市的小伙伴，晚上好！", "joke": "听说深圳的科技感太强，连路灯都在思考人生。"}
`;

	try {
		const response = await fetch(
			"https://api.deepseek.com/v1/chat/completions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${API_KEYS.DEEPSEEK_API_KEY}`,
				},
				body: JSON.stringify({
					model: "deepseek-chat",
					messages: [
						{
							role: "system",
							content:
								"你是一个友好的网站助手，专门负责生成个性化的欢迎消息和地域笑话。",
						},
						{
							role: "user",
							content: prompt,
						},
					],
					temperature: 0.7,
					max_tokens: 200,
				}),
			},
		);

		if (!response.ok) {
			throw new Error(
				`DeepSeek API请求失败: ${response.status} ${response.statusText}`,
			);
		}

		const data = await response.json();

		if (!data.choices || !data.choices[0] || !data.choices[0].message) {
			throw new Error("DeepSeek API返回数据格式不正确");
		}

		const content = data.choices[0].message.content.trim();

		// 尝试解析返回的JSON
		try {
			const result = JSON.parse(content);
			return {
				welcomeMessage: result.welcomeMessage,
				joke: result.joke,
			};
		} catch (parseError) {
			// 如果解析失败，尝试提取JSON部分
			const jsonMatch = content.match(/\{[^}]+\}/);
			if (jsonMatch) {
				const result = JSON.parse(jsonMatch[0]);
				return {
					welcomeMessage: result.welcomeMessage,
					joke: result.joke,
				};
			}
			throw new Error("无法解析AI返回的内容");
		}
	} catch (error) {
		console.error("DeepSeek API调用失败:", error);
		throw error;
	}
}
