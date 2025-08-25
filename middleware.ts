import { type MiddlewareConfig } from 'next/server';

export { default } from 'next-auth/middleware';

export const config: MiddlewareConfig = {
  matcher: ['/profile', '/properties/saved', '/messages', '/properties/add'],
};
