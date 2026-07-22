import type { MiddlewareResponseHandler } from 'astro';

export const onRequest: MiddlewareResponseHandler = async ({ response }) => {
	const isDev = import.meta.env.DEV;

	const cspDirectives = isDev ? [] : [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.app",
		"style-src 'self' 'unsafe-inline'",
		"img-src 'self' data: blob: https://images.unsplash.com https://*.vercel.app",
		"font-src 'self' data:",
		"connect-src 'self' blob: https://images.unsplash.com",
		"worker-src 'self' blob:",
		"object-src 'none'",
		"base-uri 'self'",
		"form-action 'self'",
		"frame-ancestors 'none'",
		"upgrade-insecure-requests",
	];

	const cspHeader = cspDirectives.join('; ');

	response.headers.set('Content-Security-Policy', cspHeader);
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set('Referrer-Policy', 'no-referrer');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

	return response;
};