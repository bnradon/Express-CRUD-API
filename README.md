# Express CRUD API

A lightweight inventory manager built with Node.js and Express. The goal was to go beyond Postman - building a real frontend that talks to a REST API I wrote :).

This started as a university exercise. I wanted to see what it actually felt like to connect a backend to a real UI, handle errors, and ship something that looks decent.

---

## What it does

- Create, read, update and delete products from a clean interface
- Frontend communicates directly with a local REST API
- Real-time stats (total products, total value)
- Error handling for when the server is down
- Delete confirmation to avoid any accident

## Tech stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express |
| Frontend | Vanilla JS, HTML, CSS |
| Storage | JSON file |
| Logging | Custom event-based logger |

## Project structure

```
├── src/
│   ├── controllers/    # Route logic
│   ├── routes/         # API endpoints
│   └── utils/          # Logger
├── front/              # Frontend (HTML, CSS, JS)
├── data/               # JSON storage
└── server.js
```

## Key Concepts

- REST API design
- Client-server communication
- State management in frontend
- Async operations with fetch

## Preview

![Screenshot](./front/screenshot.png)

## Run locally

```bash
git clone https://github.com/bnradon/Express-CRUD-API
cd Express-CRUD-API
npm install
# Run backend
node server.js

# Then open frontend
```

`front/index.html` in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /items | Get all items |
| GET | /items/:id | Get item by id |
| POST | /items | Create item |
| PUT | /items/:id | Update item |
| DELETE | /items/:id | Delete item |

## What I'd improve

- Replace JSON storage with a real database (MongoDB)
- Add input validation on the backend
- Deploy it so it doesn't need to run locally

---

*Built by [@bnradon] (https://github.com/bnradon) as part of my backend learning journey*