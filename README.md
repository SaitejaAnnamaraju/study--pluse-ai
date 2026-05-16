# StudyPulse AI - Intelligent Adaptive Learning & Skill Analysis Platform

StudyPulse AI is an AI-powered adaptive learning intelligence platform. It is not a static LMS or generic quiz website. Its core purpose is to analyze **how** a student learns before generating study paths.

## Core Flow

1. Authentication and student profile setup
2. Course -> Department -> Subject selection
3. Resume, GitHub, LinkedIn, and portfolio collection
4. Mandatory 3-level AI analysis test
5. Learning-style detection and student categorization
6. AI-generated adaptive roadmap
7. Personalized resources based on learning style
8. Topic-wise testing and performance adaptation
9. Analytics dashboard and AI mentor chat
10. Admin panel for platform management

## Tech Stack

- Frontend: React, Tailwind CSS, Framer Motion, Recharts
- Backend: Node.js, Express.js
- Database: MongoDB ready through Mongoose
- Authentication: Firebase/OAuth ready, with demo email/password flow included
- AI: OpenAI API ready, with local mentor fallback included

## Run Locally

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:4000`

## OpenAI Key

The project works without an OpenAI key using demo mentor mode. For real AI mentor responses, add your key to `.env`:

```env
OPENAI_API_KEY=sk-your-real-key
OPENAI_API_MODEL=gpt-4o-mini
```

Then restart:

```powershell
npm run dev
```

## MongoDB

Default local URI:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/studypulse_ai
```

If MongoDB is not running, the API continues in demo-memory mode.

## API Endpoints

- `GET /api/catalog`
- `GET /api/catalog/subjects/:subjectId`
- `GET /api/catalog/subjects/:subjectId/questions`
- `POST /api/adaptive/stage`
- `POST /api/adaptive/profile`
- `POST /api/adaptive/roadmap`
- `POST /api/adaptive/topic-result`
- `POST /api/ai/chat`

## MongoDB Collections For Production

- `users`
- `profiles`
- `subjects`
- `analysis_tests`
- `stage_results`
- `learning_profiles`
- `roadmaps`
- `topic_results`
- `resources`
- `chat_messages`
- `history_records`
- `admin_resources`

## Important Design Rule

The roadmap is generated only after the mandatory analysis test. The selected subject is the primary driver of questions, resources, roadmap topics, and analytics.
