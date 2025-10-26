import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "wyf9's Blog",
	subtitle: "什么都有的个人 blog?",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh-CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "https://imgapi.siiway.top/image/h", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "SiiWay ImgAPI", // Credit text to be displayed
			url: "https://imgapi.siiway.top", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
		// convert website used: https://favicon.io/favicon-converter/
		{
			src: "/favicon/favicon-16x16.png",
			sizes: "16x16",
		},
		{
			src: "/favicon/favicon-32x32.png",
			sizes: "32x32",
		},
		{
			src: "/favicon.ico",
			sizes: "48x48",
		},
		{
			src: "/favicon/apple-touch-icon.png",
			sizes: "180x180",
		},
		{
			src: "/favicon/android-chrome-192x192.png",
			sizes: "192x192",
		},
		{
			src: "/favicon/android-chrome-512x512.png",
			sizes: "512x512",
		},
	],
	friendLink: {
		enable: true,
		link: "https://github.com/wyf9/fuwari?tab=contributing-ov-file#友链",
	},
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		LinkPreset.Contact,
		LinkPreset.Friends,
		{
			name: "GitHub",
			url: "https://github.com/wyf9/fuwari", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "/favicon.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "wyf9",
	bio: "什么都有的个人 blog?",
	links: [
		// Visit https://icones.js.org/ for icon codes
		// You will need to install the corresponding icon set if it's not already included
		// `pnpm add @iconify-json/<icon-set-name>`
		// fa6-brands -> https://icones.js.org/collection/fa6-brands
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://wyf9.top/t/gh",
		},
		{
			name: "Telegram",
			icon: "fa6-brands:telegram",
			url: "https://wyf9.top/t/tg",
		},
		{
			name: "X",
			icon: "fa6-brands:x-twitter",
			url: "https://wyf9.top/t/x",
		},
		{
			name: "Discord",
			icon: "fa6-brands:discord",
			url: "/contact#discord",
		},
		{
			name: "Twitch",
			icon: "fa6-brands:twitch",
			url: "https://wyf9.top/t/t",
		},
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili",
			url: "https://wyf9.top/t/b",
		},
		{
			name: "Email",
			icon: "fa6-solid:envelope",
			url: "https://wyf9.top/t/e",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
