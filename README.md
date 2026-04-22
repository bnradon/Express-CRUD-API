# Express CRUD API

A lightweight inventory manager built with Node.js and Express, powered by Firebase for real-time data persistence.

This started as a university exercise. At first, the goal was just to go beyond Postman and connect a backend to a real UI. But it ended up becoming a fully deployed full-stack app with a public API, cloud database and live frontend.

---

## Live Demo

- Frontend: https://express-crud-api-bnradon.vercel.app/  
- API: https://express-crud-api-bnradon.onrender.com/items  

---

## What it does

- Create, read, update and delete products from a clean interface  
- Frontend communicates with a deployed REST API (not local anymore)  
- Real-time stats (total products, total value)  
- Error handling for network/server failures  
- Delete confirmation to avoid accidental data loss  
- Data is stored and synced using Firebase (Firestore)  
- Logging middleware captures incoming requests  

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express |
| Frontend | Vanilla JS, HTML, CSS |
| Database | Firebase (Firestore) |
| Backend Deployment | Render |
| Frontend Deployment | Vercel |
| Logging | Custom middleware logger |

---

## Project structure


├── src/
│   ├── controllers/  # Business logic for each endpoint
│   ├── routes/       # API routes
│   └── utils/        # Logger and Firebase config
├── front/            # Frontend (HTML, CSS, JS)
├── server.js         # Express app setup
├── index.js          # Entry point for deployment
└── package.json     

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /items | Get all items |
| GET | /items/:id | Get item by id |
| POST | /items | Create item |
| PUT | /items/:id | Update item |
| DELETE | /items/:id | Delete item |

---

## How it works

- The frontend sends HTTP requests using `fetch()` to the deployed API  
- The Express backend handles routing and validation  
- Controllers interact with Firebase using the Admin SDK  
- Data is stored in a Firestore collection (`items`)  
- Responses are returned as JSON and rendered dynamically in the UI  

---

## Preview

![Screenshot](./front/screenshot.png)

---

## Run locally

```bash
git clone https://github.com/bnradon/Express-CRUD-API
cd Express-CRUD-API
npm install

# Start backend

npm start

# Then open frontend

// front/index.html in your browser


## Enviroment variables 

For deployment, Firebase credentials are handled using environment variables instead of local JSON files:

FIREBASE_PROJECT_ID= "YOUR_KEY",
FIREBASE_CLIENT_EMAIL= "YOUR_EMAIL",
FIREBASE_PRIVATE_KEY= "YOUR_KEY"
```

---

## What I improved from the initial version

  Deployed backend to production (Render)
- Deployed frontend (Vercel)
- Connected frontend to a live API instead of localhost
- Moved Firebase credentials to environment variables
- Handled CORS issues between frontend and backend
- Structured project for real-world usage

---


## What I'd improve next

- Add authentication (users & roles)
- Input validation on backend (Joi / Zod)
- Pagination & filtering
- Better UI/UX (loading states, feedback)
- Add automation workflows with n8n

---

*Built by [@bnradon] (https://github.com/bnradon) as part of my backend and full-stack learning journey :)