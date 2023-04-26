# Scrumptious


## Overview

Scrumptious is a web application that allows users to manage projects using a Scrum-based approach with the help of Sticky Notes and Sticky Boards. Users can create, update, and delete Sticky Notes and Sticky Boards.


## Features

- Create and manage Sticky Notes and Sticky Boards.
- Assign Sticky Notes to various categories (backlog, todo, doing, review, and done).
- Set priorities and deadlines for Sticky Notes and Sticky Boards.
- Invite other users to collaborate on a Sticky Board.
- Assign users to Sticky Notes
- Email notifications when users are added to a Sticky Note or Sticky Board.

## Design

### Wireframe

### Concept UI/UX

## Installation

## Models

### Account

- username: str
- email: str
- password: str

### Sticky Note

- subject: str
- content: str
- priority: int
- category: str
- start_date: datetime
- deadline: datetime
- account: list[str]
- stickyboard: str

### Sticky Board

- board_name: str
- description: str
- priority: int
- start_date: datetime
- deadline: datetime
- account: list[str]
- backlog: list[str]
- todo: list[str]
- doing: list[str]
- review: list[str]
- done: list[str]

## Endpoints

### Accounts

- POST /register: Register a new user.
- POST /login: Authenticate and log in an existing user.
- GET /account: Get the current user's account data.

### Sticky Notes

- POST /{stickyboard_id}/sticky: Create a new Sticky Note.
- GET /sticky: Get all Sticky Notes.
- GET /{stickyboard_id}/stickies: Get Sticky Notes data for a Sticky Board.
- PUT /sticky/{sticky_id}: Update a Sticky Note.
- DELETE /sticky/{sticky_id}: Delete a Sticky Note.

### Sticky Boards

- POST /stickyboard: Create a new Sticky Board.
- GET /stickyboard: Get all Sticky Boards.
- GET /stickyboard/{stickyboard_id}: Get a specific Sticky Board by ID.
- GET /stickyboard/{stickyboard_id}/sticky: Get Sticky Notes for a Sticky Board.
- PUT /stickyboard/{stickyboard_id}: Update a Sticky Board.
- DELETE /stickyboard/{stickyboard_id}: Delete a Sticky Board.
