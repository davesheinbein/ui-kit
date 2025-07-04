// Shared mock data for Storybook stories
export const sampleChartData = [
	{ match: 'Game 1', score: 85 },
	{ match: 'Game 2', score: 92 },
	{ match: 'Game 3', score: 78 },
	{ match: 'Game 4', score: 96 },
	{ match: 'Game 5', score: 89 },
];

export const pieChartData = [
	{ category: 'Connections', score: 40 },
	{ category: 'Red Herrings', score: 30 },
	{ category: 'Speed Bonus', score: 20 },
	{ category: 'Perfect Games', score: 10 },
];

export const timeSeriesData = [
	{ date: '2024-01', value: 120 },
	{ date: '2024-02', value: 132 },
	{ date: '2024-03', value: 101 },
	{ date: '2024-04', value: 134 },
	{ date: '2024-05', value: 90 },
	{ date: '2024-06', value: 230 },
];

export const multiSeriesData = [
	{ month: 'Jan', wins: 12, losses: 8, draws: 3 },
	{ month: 'Feb', wins: 15, losses: 5, draws: 2 },
	{ month: 'Mar', wins: 10, losses: 12, draws: 5 },
	{ month: 'Apr', wins: 18, losses: 3, draws: 1 },
	{ month: 'May', wins: 14, losses: 7, draws: 4 },
];

export const mockFriends = [
	{
		id: '2',
		name: 'Alice Smith',
		avatar: 'https://picsum.photos/40/40',
		status: 'online',
		lastSeen: 'Now',
	},
	{
		id: '3',
		name: 'Bob Johnson',
		avatar: 'https://picsum.photos/40/40',
		status: 'away',
		lastSeen: '5 minutes ago',
	},
	{
		id: '4',
		name: 'Carol Williams',
		avatar: 'https://picsum.photos/40/40',
		status: 'offline',
		lastSeen: '2 hours ago',
	},
];

export const mockChatMessages = [
	{
		id: '1',
		user: 'Alice',
		message: 'Good luck everyone!',
		timestamp: new Date(Date.now() - 300000),
		type: 'message',
	},
	{
		id: '2',
		user: 'Bob',
		message: 'Thanks! This puzzle looks tricky',
		timestamp: new Date(Date.now() - 240000),
		type: 'message',
	},
	{
		id: '3',
		user: 'System',
		message: 'Alice found a connection!',
		timestamp: new Date(Date.now() - 180000),
		type: 'system',
	},
];

export const mockGameStats = {
	totalGames: 156,
	wins: 106,
	losses: 50,
	winRate: 0.68,
	averageTime: 145,
	bestTime: 42,
	currentStreak: 8,
	longestStreak: 15,
	perfectGames: 23,
	achievements: [
		{
			id: 'speed_demon',
			name: 'Speed Demon',
			unlocked: true,
		},
		{
			id: 'perfectionist',
			name: 'Perfectionist',
			unlocked: true,
		},
		{
			id: 'streak_master',
			name: 'Streak Master',
			unlocked: false,
		},
	],
};

export const radarChartData = [
	{ category: 'Speed', score: 120 },
	{ category: 'Accuracy', score: 98 },
	{ category: 'Strategy', score: 86 },
	{ category: 'Knowledge', score: 99 },
	{ category: 'Focus', score: 85 },
	{ category: 'Consistency', score: 65 },
];

// === GRID MOCK DATA ===
export const gridWords3x3 = [
	'Apple',
	'Banana',
	'Cherry',
	'Date',
	'Elderberry',
	'Fig',
	'Grape',
	'Honeydew',
	'Kiwi',
];

export const gridWords4x4 = [
	'Lion',
	'Tiger',
	'Bear',
	'Wolf',
	'Fox',
	'Eagle',
	'Shark',
	'Whale',
	'Frog',
	'Snake',
	'Lizard',
	'Turtle',
	'Crab',
	'Octopus',
	'Seal',
	'Penguin',
];

export const gridWords5x5 = [
	'Paris',
	'London',
	'Berlin',
	'Rome',
	'Madrid',
	'Vienna',
	'Prague',
	'Budapest',
	'Warsaw',
	'Dublin',
	'Oslo',
	'Stockholm',
	'Copenhagen',
	'Helsinki',
	'Reykjavik',
	'Athens',
	'Lisbon',
	'Brussels',
	'Amsterdam',
	'Zurich',
	'Moscow',
	'Istanbul',
	'Kiev',
	'Belgrade',
	'Bucharest',
];

export const gridWords = [
	'Alpha',
	'Beta',
	'Gamma',
	'Delta',
	'Epsilon',
	'Zeta',
	'Eta',
	'Theta',
	'Iota',
	'Kappa',
	'Lambda',
	'Mu',
	'Nu',
	'Xi',
	'Omicron',
	'Pi',
	'Rho',
	'Sigma',
	'Tau',
	'Upsilon',
	'Phi',
	'Chi',
	'Psi',
	'Omega',
	'Andromeda',
	'Centaurus',
	'Draco',
	'Orion',
	'Phoenix',
	'Cygnus',
	'Cassiopeia',
	'Ursa Major',
	'Ursa Minor',
	'Leo',
	'Virgo',
	'Libra',
	'Aquila',
	'Scorpius',
	'Capricornus',
	'Aquarius',
	'Pisces',
	'Aries',
	'Taurus',
	'Gemini',
	'Cancer',
	'Leo Minor',
	'Monoceros',
];

// =====================
// Header Stories Mocks
// =====================

export const navItemsMain = [
	'Home',
	'About',
	'Features',
	'Contact',
];
export const navItemsLeft = ['Home', 'About'];
export const navItemsRight = ['Shop', 'Contact'];
export const navItemsMega = [
	'Products ▼',
	'Services ▼',
	'Resources ▼',
];
export const navItemsGallery = [
	'Gallery',
	'Portfolio',
	'Contact',
];
export const navItemsSidebar = [
	'Home',
	'About',
	'Contact',
	'Profile',
];
export const navItemsShop = ['Shop', 'Cart', 'Profile'];
export const navItemsHelp = ['Help', 'Sign In'];
export const navItemsBottom = [
	'Home',
	'Features',
	'Shop',
	'Contact',
];
export const navItemsBlog = ['Home', 'Blog', 'About'];
export const navItemsShopDeals = ['Shop', 'Deals'];
export const navItemsFeatures = ['Features', 'Pricing'];
export const navItemsIconOnly = ['🏠', '🛒', '❤️', '👤'];
export const navItemsCart = ['Shop', 'About', 'Cart'];
export const navItemsBottomNav = ['🏠', '🛒', '❤️', '☰'];
export const navItemsShopContact = [
	'Home',
	'About',
	'Shop',
	'Contact',
];

export const breadcrumbsCategory = [
	'Home',
	'Category',
	'Page',
];

export const notificationTextShipping =
	'Free Shipping Today Only!';

export const ctaSubscribe = 'Subscribe Now';
export const ctaSignUp = 'Sign Up';
export const ctaLogIn = 'Log In';
export const ctaBuyNow = 'Buy Now';

import type { ThemeDefinition } from '../../components/Themes/configurations';

export const mockThemes: ThemeDefinition[] = [
	{
		name: 'light',
		label: 'Light',
		color: '#f8f5ec',
		bg: '#f8f5ec',
		font: '#222',
		swatchType: 'solid',
		vsMode: {
			player: '#2563eb',
			enemy: '#ef4444',
			playerBg: '#e0e7ff',
			enemyBg: '#fee2e2',
			boardBg: '#fff',
			font: '#222',
			border: '#e0e7ef',
		},
	},
	{
		name: 'dark',
		label: 'Dark',
		color: '#181a1b',
		bg: '#23272a',
		font: '#f8f5ec',
		swatchType: 'solid',
		vsMode: {
			player: '#3b82f6',
			enemy: '#ef4444',
			playerBg: '#1e293b',
			enemyBg: '#3b1e1e',
			boardBg: '#23272a',
			font: '#f8f5ec',
			border: '#334155',
		},
	},
	{
		name: 'oceanic',
		label: 'Oceanic',
		color: '#174ea6',
		bg: '#0a2540',
		font: '#a7f3f7',
		swatchType: 'solid',
		vsMode: {
			player: '#3b82f6',
			enemy: '#ef4444',
			playerBg: '#1e293b',
			enemyBg: '#3b1e1e',
			boardBg: '#0a2540',
			font: '#a7f3f7',
			border: '#1e40af',
		},
	},
	{
		name: 'sunset',
		label: 'Sunset',
		color: '#ffb347',
		bg: 'linear-gradient(135deg, #ffb347 0%, #ff5e62 100%)',
		font: '#fff',
		swatchType: 'gradient',
		vsMode: {
			player: '#2563eb',
			enemy: '#ef4444',
			playerBg: '#e0e7ff',
			enemyBg: '#fee2e2',
			boardBg: '#fff',
			font: '#222',
			border: '#e0e7ef',
		},
	},
	{
		name: 'forest',
		label: 'Forest',
		color: '#22c55e',
		bg: '#0f172a',
		font: '#dcfce7',
		swatchType: 'solid',
		vsMode: {
			player: '#22c55e',
			enemy: '#ef4444',
			playerBg: '#052e16',
			enemyBg: '#3b1e1e',
			boardBg: '#0f172a',
			font: '#dcfce7',
			border: '#166534',
		},
	},
	{
		name: 'purple',
		label: 'Purple',
		color: '#8b5cf6',
		bg: '#1e1b4b',
		font: '#e5d5ff',
		swatchType: 'solid',
		vsMode: {
			player: '#8b5cf6',
			enemy: '#ef4444',
			playerBg: '#312e81',
			enemyBg: '#3b1e1e',
			boardBg: '#1e1b4b',
			font: '#e5d5ff',
			border: '#6d28d9',
		},
	},
	{
		name: 'cherry',
		label: 'Cherry',
		color: '#f97316',
		bg: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ef4444 100%)',
		font: '#fff',
		swatchType: 'gradient',
		vsMode: {
			player: '#f97316',
			enemy: '#ef4444',
			playerBg: '#fed7aa',
			enemyBg: '#fee2e2',
			boardBg: '#fff',
			font: '#222',
			border: '#fb923c',
		},
	},
	{
		name: 'midnight',
		label: 'Midnight',
		color: '#0f172a',
		bg: '#0f172a',
		font: '#f1f5f9',
		swatchType: 'solid',
		vsMode: {
			player: '#3b82f6',
			enemy: '#ef4444',
			playerBg: '#1e293b',
			enemyBg: '#3b1e1e',
			boardBg: '#0f172a',
			font: '#f1f5f9',
			border: '#334155',
		},
	},
];

// === Analytics Defaults (for use in Analytics component and stories) ===
export const DEFAULT_DATA = [];
export const DEFAULT_METRICS = [];
export const DEFAULT_FILTERS = [];
export const DEFAULT_COLORS = [
	'#3b82f6',
	'#10b981',
	'#f59e0b',
	'#ef4444',
	'#8b5cf6',
];
export const DEFAULT_PLUGINS = [];

// === ENHANCED MOCK DATA FOR RICHER CARD STORIES ===
export const mockProfile = {
	id: '1',
	name: 'Alice Smith',
	avatar: 'https://picsum.photos/40/40',
	bio: 'Puzzle enthusiast and code lover.',
	level: 12,
	points: 2340,
	achievements: 8,
	gamesPlayed: 156,
	winRate: 0.68,
};

// There is no puzzleData in mocks. Add a minimal mock for puzzle card usage.
export const cardPuzzleData = {
	id: 'puzzle-1',
	title: 'Sample Puzzle',
	date: '2024-06-01',
	creator: 'PuzzleMaster',
	image: 'https://picsum.photos/40/40',
};

// === Select Option Sets (for Select stories) ===
export const basicOptions = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' },
	{ value: 'option4', label: 'Option 4' },
];

export const detailedOptions = [
	{
		value: 'frontend',
		label: 'Frontend Developer',
		description: 'HTML, CSS, JavaScript, React',
	},
	{
		value: 'backend',
		label: 'Backend Developer',
		description: 'Node.js, Python, Java, Databases',
	},
	{
		value: 'fullstack',
		label: 'Full Stack Developer',
		description: 'Frontend and Backend technologies',
	},
	{
		value: 'mobile',
		label: 'Mobile Developer',
		description: 'iOS, Android, React Native, Flutter',
	},
	{
		value: 'devops',
		label: 'DevOps Engineer',
		description: 'CI/CD, Docker, Kubernetes, Cloud',
	},
];

export const countries = [
	{ value: 'us', label: 'United States' },
	{ value: 'ca', label: 'Canada' },
	{ value: 'uk', label: 'United Kingdom' },
	{ value: 'de', label: 'Germany' },
	{ value: 'fr', label: 'France' },
	{ value: 'jp', label: 'Japan' },
	{ value: 'au', label: 'Australia' },
	{ value: 'br', label: 'Brazil' },
	{ value: 'in', label: 'India' },
	{ value: 'cn', label: 'China' },
];

export const categories = [
	{ value: 'tech', label: 'Technology' },
	{ value: 'design', label: 'Design' },
	{ value: 'business', label: 'Business' },
	{ value: 'marketing', label: 'Marketing' },
	{ value: 'sales', label: 'Sales' },
	{ value: 'support', label: 'Support' },
];

export const tags = [
	{ value: 'javascript', label: 'JavaScript' },
	{ value: 'typescript', label: 'TypeScript' },
	{ value: 'react', label: 'React' },
	{ value: 'vue', label: 'Vue.js' },
	{ value: 'angular', label: 'Angular' },
	{ value: 'nodejs', label: 'Node.js' },
	{ value: 'python', label: 'Python' },
	{ value: 'css', label: 'CSS' },
	{ value: 'html', label: 'HTML' },
];

export const users = [
	{
		value: 'john',
		label: 'John Doe',
		description: 'john.doe@example.com',
	},
	{
		value: 'jane',
		label: 'Jane Smith',
		description: 'jane.smith@example.com',
	},
	{
		value: 'bob',
		label: 'Bob Johnson',
		description: 'bob.johnson@example.com',
	},
	{
		value: 'alice',
		label: 'Alice Brown',
		description: 'alice.brown@example.com',
	},
];

export const dateRanges = [
	{ value: 'today', label: 'Today' },
	{ value: 'yesterday', label: 'Yesterday' },
	{ value: 'last7days', label: 'Last 7 days' },
	{ value: 'last30days', label: 'Last 30 days' },
	{ value: 'last90days', label: 'Last 90 days' },
	{ value: 'custom', label: 'Custom range' },
];

// Provider context demo mock data for Storybook
export const mockUserSettings = {
	chatEnabled: true,
	profanityFilter: false,
	notificationsEnabled: true,
	language: 'en',
	soundEnabled: true,
	difficulty: 'medium',
};

export const mockThemePalette = {
	primary: '#0070f3',
	secondary: '#1c1c1e',
	background: '#fff',
	text: '#333',
};

export const mockSocketSession = {
	userId: '123',
	token: 'abc123',
};

export const sampleTableColumns = [
	{ key: 'id', label: 'ID' },
	{ key: 'name', label: 'Name' },
	{ key: 'age', label: 'Age', sortable: true },
	{ key: 'status', label: 'Status', filterable: true },
];

export const sampleTableData = [
	{ id: 1, name: 'Alice', age: 28, status: 'Active' },
	{ id: 2, name: 'Bob', age: 34, status: 'Inactive' },
	{ id: 3, name: 'Charlie', age: 22, status: 'Pending' },
	{ id: 4, name: 'Diana', age: 41, status: 'Active' },
];

export const leaderboardTableColumns = [
	{ key: 'rank', label: 'Rank', align: 'center' },
	{ key: 'player', label: 'Player' },
	{ key: 'score', label: 'Score', sortable: true },
	{ key: 'games', label: 'Games' },
	{ key: 'winRate', label: 'Win Rate' },
];

export const leaderboardTableData = [
	{
		id: 1,
		rank: 1,
		player: 'GridMaster',
		score: 15420,
		games: 87,
		winRate: '94.3%',
	},
	{
		id: 2,
		rank: 2,
		player: 'PuzzleKing',
		score: 14850,
		games: 92,
		winRate: '91.2%',
	},
	{
		id: 3,
		rank: 3,
		player: 'WordWizard',
		score: 14200,
		games: 78,
		winRate: '89.7%',
	},
	{
		id: 4,
		rank: 4,
		player: 'QuickSolver',
		score: 13980,
		games: 95,
		winRate: '87.4%',
	},
	{
		id: 5,
		rank: 5,
		player: 'BrainAce',
		score: 13750,
		games: 83,
		winRate: '86.1%',
	},
];

export const leaderboardMock = [
	{
		id: '1',
		name: 'Alice',
		score: 3200,
		avatar: 'https://picsum.photos/40/40?1',
	},
	{
		id: '2',
		name: 'Bob',
		score: 2950,
		avatar: 'https://picsum.photos/40/40?2',
	},
	{
		id: '3',
		name: 'Carol',
		score: 2780,
		avatar: 'https://picsum.photos/40/40?3',
	},
	{
		id: '4',
		name: 'David',
		score: 2600,
		avatar: 'https://picsum.photos/40/40?4',
	},
	{
		id: '5',
		name: 'Eve',
		score: 2500,
		avatar: 'https://picsum.photos/40/40?5',
	},
];

// --- Card-specific mock data for Card.stories.tsx ---
export const userStatusMock = {
	name: 'John Doe',
	avatar: 'https://picsum.photos/40/40',
	status: 'online',
	statusMessage: 'Ready to play!',
};
