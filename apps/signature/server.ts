import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.PORT ?? 3000);
const root = fileURLToPath(new URL('../dist', import.meta.url));

const contentTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
};

const setHeaders = (res: ServerResponse, pathname: string, size: number) => {
  res.setHeader('Content-Type', contentTypes[extname(pathname)] ?? 'application/octet-stream');
  res.setHeader('Content-Length', size);
  res.setHeader(
    'Cache-Control',
    pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
};

const sendFile = async (
  req: IncomingMessage,
  res: ServerResponse,
  pathname: string,
): Promise<boolean> => {
  const filePath = resolve(root, `.${pathname}`);

  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    return false;
  }

  const info = await stat(filePath).catch(() => null);

  if (!info?.isFile()) {
    return false;
  }

  setHeaders(res, pathname, info.size);

  if (req.method === 'HEAD') {
    res.end();
    return true;
  }

  createReadStream(filePath)
    .on('error', () => res.destroy())
    .pipe(res);

  return true;
};

const handleRequest = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET, HEAD');
    res.end('Method not allowed');
    return;
  }

  let pathname: string;

  try {
    pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
  } catch {
    res.statusCode = 400;
    res.end('Bad request');
    return;
  }

  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }

  if (await sendFile(req, res, pathname)) {
    return;
  }

  // SPA fallback: unknown routes without a file extension serve index.html.
  if (!extname(pathname) && (await sendFile(req, res, '/index.html'))) {
    return;
  }

  res.statusCode = 404;
  res.end('Not found');
};

createServer((req, res) => {
  handleRequest(req, res).catch((error: unknown) => {
    console.error(error);

    if (res.headersSent) {
      res.destroy();
      return;
    }

    res.statusCode = 500;
    res.end('Internal server error');
  });
}).listen(port, '0.0.0.0', () => {
  console.log(`Signature app listening on http://0.0.0.0:${port}`);
});
