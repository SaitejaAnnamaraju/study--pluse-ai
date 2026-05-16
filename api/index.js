import app, { connectDatabase } from '../server/app.js';

await connectDatabase();

export default app;
