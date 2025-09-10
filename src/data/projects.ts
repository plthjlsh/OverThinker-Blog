// 项目数据配置文件
// 用于管理项目展示页面的数据

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
}

export const projectsData: Project[] = [
	{
		id: "OverThinker-blog",
		title: "OverThinker Blog",
		description:
			"基于Astro框架开发的现代化博客主题，支持多语言、暗黑模式、响应式设计等功能。",
		image: "",
		category: "other",
		techStack: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
		status: "in-progress",
		liveDemo: "",
		sourceCode: "https://github.com/example/mizuki",
		startDate: "2025-04-29",
		endDate: "2025-09-10",
		featured: true,
		tags: ["Blog", "Open Source"],
	},
	{
		id: "Multi-user Chat Room",
		title: "多人聊天室",
		description: "学校课程项目，基于WebSocket实现的实时聊天应用。",
		image: "",
		category: "other",
		techStack: [],
		status: "planned",
		liveDemo: "https://portfolio.example.com",
		sourceCode: "https://github.com/example/portfolio",
		startDate: "2023-09-01",
		endDate: "2023-12-01",
		featured: true,
		tags: ["Portfolio", "React", "Animation"],
	},
	{
		id: "Godot游戏引擎",
		title: "Godot游戏引擎",
		description:
			"Godot是开源跨平台游戏引擎，轻量高效，支持2D/3D开发，用GDScript等语言，适合各类游戏制作。",
		image: "/projectImage/godot.jpg",
		category: "mobile",
		techStack: ["godot", "GDScript", "GameEngine"],
		status: "planned",
		startDate: "2024-10-13",
		tags: ["godot", "GDScript", "GameEngine", "开发"],
	},
	{
		id: "Java",
		title: "JavaSE",
		description:
			"Java是一种广泛使用的面向对象编程语言，具有跨平台特性，适用于开发企业级应用、移动应用和大数据处理等。",
		image: "",
		category: "web",
		techStack: ["编程语言", "Java"],
		status: "completed",
		liveDemo: "https://dataviz.example.com",
		startDate: "2025-01-01",
		endDate: "2025-6-22",
		tags: ["Java", "编程语言"],
	},
	{
		id: "数据结构与算法",
		title: "数据结构初阶",
		description:
			"数据结构与算法是计算机科学的核心，涉及数据的组织、存储和操作方法，提升程序效率和性能。",
		image: "",
		category: "web",
		techStack: ["算法", "数据结构"],
		status: "completed",
		startDate: "2025-04-07",
		endDate: "2025-07-01",
		tags: ["数据结构", "算法"],
	},
];

// 获取项目统计信息
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter((p) => p.status === "completed").length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// 按分类获取项目
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// 获取特色项目
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// 获取所有技术栈
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => techSet.add(tech));
	});
	return Array.from(techSet).sort();
};
