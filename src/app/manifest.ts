import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Eversun Test',
		short_name: 'Eversun Test',
		description: 'Eversun Test',
		start_url: '/',
		display: 'standalone',
		background_color: '#fff',
		theme_color: '#fff',
		icons: [
			{
				src: '/manifest-icons/icon-144.png',
				sizes: '144x144',
				type: 'image/png',
			},
			{
				src: '/manifest-icons/icon-192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/manifest-icons/icon-512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	};
}
