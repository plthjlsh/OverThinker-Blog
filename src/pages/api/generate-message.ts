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
	"222.168.123.123": { province: "四川省", city: "成都市", distance: 1500 },
	"123.123.123.123": { province: "湖北省", city: "武汉市", distance: 1300 },
	"122.122.122.122": { province: "湖南省", city: "长沙市", distance: 1250 },
	"133.133.133.133": { province: "山东省", city: "青岛市", distance: 1800 },
	"61.135.169.121": { province: "北京市", city: "北京市", distance: 2100 },
	"180.101.49.11": { province: "江苏省", city: "南京市", distance: 1150 },
	"110.242.68.3": { province: "河北省", city: "石家庄市", distance: 1900 },
	"120.232.23.23": { province: "广东省", city: "广州市", distance: 120 },
	"119.75.216.20": { province: "北京市", city: "北京市", distance: 2100 },
	"183.207.95.95": { province: "广东省", city: "深圳市", distance: 90 },
	"124.70.100.100": { province: "广东省", city: "东莞市", distance: 110 },
	"113.96.120.120": { province: "广东省", city: "中山市", distance: 105 },
	"116.13.120.120": { province: "福建省", city: "厦门市", distance: 300 },
	"39.156.66.10": { province: "北京市", city: "北京市", distance: 2100 },
};

// 模拟地理位置笑话库（作为备用）
const LOCATION_JOKES: Record<string, string[]> = {
	广东省: [
		"老板来两斤福建人。",
		"食神钦点的美食家。",
		"早茶文化的传承者。",
		"粤语说得比英语溜。",
		"凉茶比咖啡更日常。",
	],
	北京市: [
		"帝都来的VIP客人。",
		"烤鸭的终极品鉴家。",
		"胡同里的时尚达人。",
		"说起话来都像领导。",
		"出门就堵车，回家看升旗。",
	],
	上海市: [
		"魔都潮流引领者。",
		"外滩夜景欣赏专家。",
		"精致生活的代言人。",
		"垃圾分类比吃饭重要。",
		"地铁比走路还快。",
	],
	江苏省: ["上有天堂，下有苏杭。", "园林设计的鼻祖。", "经济发达但低调做人。"],
	浙江省: ["马云的老乡。", "西湖美景天天见。", "电商之都的原住民。"],
	四川省: ["火锅比暖气更管用。", "国宝熊猫的邻居。", "麻将一打一下午。"],
	default: [
		"远方的朋友，欢迎来访！",
		"跨越千山万水来相聚。",
		"网络让我们心连心。",
		"世界那么大，你来了正好。",
		"不同的地方，同样的温暖。",
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
	// Vercel/标准方式：尝试从 x-forwarded-for 头获取IP
	// x-forwarded-for 可能包含多个IP地址，用逗号分隔，第一个是最接近客户端的
	const xForwardedFor = request.headers.get("x-forwarded-for");
	console.log(`原始 x-forwarded-for 头: "${xForwardedFor}"`);

	if (xForwardedFor) {
		// 处理可能包含端口号的情况 (格式: "ip:port")
		const ips = xForwardedFor.split(",").map((ip) => ip.trim());
		console.log("分割后的IP列表:", ips);

		// 遍历所有IP，找到第一个非本地IP
		for (const ipWithPort of ips) {
			// 移除端口号 (如果存在)
			const ip = ipWithPort.split(":")[0];
			console.log(`处理IP: "${ip}" (来自 "${ipWithPort}")`);

			if (ip && !isLocalIP(ip)) {
				console.log(`通过 x-forwarded-for 获取到客户端IP: ${ip}`);
				return ip;
			}
		}
	}

	// 尝试其他常见的代理头部字段
	const ipHeaders = [
		"cf-connecting-ip",
		"x-real-ip",
		"x-client-ip",
		"x-original-forwarded-for",
		"true-client-ip",
	];

	for (const header of ipHeaders) {
		const ip = request.headers.get(header);
		console.log(`检查头部 ${header}: "${ip}"`);

		if (ip && !isLocalIP(ip)) {
			console.log(`通过 ${header} 获取到客户端IP: ${ip}`);
			return ip;
		}
	}

	// 尝试从请求对象中直接获取
	const directIP =
		(request as any).connection?.remoteAddress ||
		(request as any).socket?.remoteAddress ||
		(request as any).client?.remoteAddress ||
		(request as any).info?.remoteAddress;

	if (directIP && !isLocalIP(directIP)) {
		console.log(`通过直接连接获取到客户端IP: ${directIP}`);
		return directIP;
	}

	// 改进的fallback机制：即使在生产环境也尝试返回一些信息
	// 如果x-forwarded-for存在但所有IP都是本地IP，至少返回第一个IP
	if (xForwardedFor) {
		const firstIP = xForwardedFor.split(",")[0].trim().split(":")[0];
		if (firstIP) {
			console.log(`Fallback: 返回x-forwarded-for中的第一个IP: ${firstIP}`);
			return firstIP;
		}
	}

	// 如果都获取不到，在开发环境中返回一个模拟IP用于测试
	if (import.meta.env.DEV) {
		console.log("开发环境：无法获取真实客户端IP，使用测试IP");
		// 默认返回珠海的IP（因为您在珠海）
		return "119.123.124.125";
	}

	// 生产环境：记录日志并返回空字符串
	console.log("生产环境：无法获取真实客户端IP，所有尝试均失败");
	console.log("请求的所有头部信息:", [...request.headers.entries()]);

	// 最后的fallback：返回一个特殊标记，让前端知道IP获取失败
	return "IP_DETECTION_FAILED";
}

// 辅助函数：检查是否为本地IP地址
function isLocalIP(ip: string): boolean {
	return (
		ip === "127.0.0.1" ||
		ip === "::1" ||
		ip.startsWith("::ffff:127.0.0.1") ||
		ip.startsWith("10.") ||
		ip.startsWith("172.") ||
		ip.startsWith("192.168.")
	);
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
