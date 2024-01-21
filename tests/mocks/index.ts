import closeWithGrace from 'close-with-grace';
import { setupServer } from 'msw/node';

export const server = setupServer();

server.listen({
	onUnhandledRequest: 'error',
});

if (process.env.NODE_ENV === 'test') {
	console.info('🔶 Mock server installed');

	closeWithGrace(() => {
		server.close();
	});
}
