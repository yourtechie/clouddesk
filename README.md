# CloudDesk

A responsive cloud infrastructure dashboard built with Node.js and Express.

## Requirements
- Node.js 20 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Test and build checks
```bash
npm test
npm run build
```

## API endpoints
- `GET /api/health` - application health and uptime
- `GET /api/metrics` - sample infrastructure metrics
- `GET /api/version` - application version

## Production
```bash
npm start
```
The EC2 deployment uses PM2 to keep the application running and Nginx as a reverse proxy.
