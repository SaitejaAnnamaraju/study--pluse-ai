import app, { connectDatabase } from './app.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`StudyPulse AI API listening on http://localhost:${PORT}`);
});

connectDatabase();
