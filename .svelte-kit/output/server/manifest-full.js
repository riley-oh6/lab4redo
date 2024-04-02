export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","global.js","images/riley.jpeg","loc.csv","style.css"]),
	mimeTypes: {".png":"image/png",".js":"text/javascript",".jpeg":"image/jpeg",".csv":"text/csv",".css":"text/css"},
	_: {
		client: {"start":"_app/immutable/entry/start.CFINsvMJ.js","app":"_app/immutable/entry/app.Bkh3s8UD.js","imports":["_app/immutable/entry/start.CFINsvMJ.js","_app/immutable/chunks/entry.2bXjYVP4.js","_app/immutable/chunks/runtime.ydBjxQlf.js","_app/immutable/entry/app.Bkh3s8UD.js","_app/immutable/chunks/runtime.ydBjxQlf.js","_app/immutable/chunks/disclose-version.CO_dDP94.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/github",
				pattern: /^\/github\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/meta",
				pattern: /^\/meta\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/resume",
				pattern: /^\/resume\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
