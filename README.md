# Scrumptious

#### Team:

- [Brandon Moore](https://www.linkedin.com/in/brandon-moore-a055b71b1/) - Software Developer
- [Christian Felix](https://www.linkedin.com/in/christianfelix97/) - Software Developer
- [John Liu](https://www.linkedin.com/in/john-chaohui-liu/) - Software Developer
- [Kurt Loban](https://www.linkedin.com/in/kurtloban/) - Software Developer

## Demo Account and Website

Experience the features of SCRUMptious with our demo account! Simply log in using the following credentials:

- **Username:** aaa
- **Password:** aaa

Visit our website to explore the functionalities and user interface:

[https://team-scrappy.gitlab.io/scrum-ptious](https://team-scrappy.gitlab.io/scrum-ptious)

## Design

Scrumptious is a web application that facilitates project management using a Scrum-based approach with the aid of Sticky Notes and Sticky Boards. The frontend of the application is developed using React and is organized into separate directories for Sticky Notes, Sticky Boards, and Accounts.

The backend of the application is built using FastAPI and MongoDB to maintain the directory structure. Additionally, the application uses microservices architecture by leveraging Docker.

Scrumptious has a router directory that defines the routes for the API endpoints, a queries directory that defines the queries for the MongoDB database, and a test directory that contains test files for the API.

As the database used by Scrumptious is MongoDB, it does not require the use of a pre-built migrations folder. However, asynchronous functions are still utilized on the frontend of the application.

## Features

- Create and manage Sticky Notes and Sticky Boards.
- Assign Sticky Notes to various categories (backlog, todo, doing, review, and done).
- Set priorities and deadlines for Sticky Notes and Sticky Boards.
- Invite other users to collaborate on a Sticky Board.
- Assign users to Sticky Notes
- Email notifications when users are added to a Sticky Note or Sticky Board.

## Design Concept Diagrams

![Wireframe](Wireframe%20concept.svg)
![Figma Wireframe](Figma%20UIUX%20wireframe.jpg)

## Project Initialization

Be sure to have Docker Destkop downloaded and running.

### Clone the Repository

&ensp;&ensp;&ensp;&ensp;1. Open your terminal, change to the directory folder where the project will be cloned.

&ensp;&ensp;&ensp;&ensp;2. In your terminal, type: `git clone https://gitlab.com/team-scrappy/scrum-ptious.git`

&ensp;&ensp;&ensp;&ensp;3. Navigate to the project directory.

### SENDGRID API Key

To provide environment variables for your setup that should not live in the docker-compose.yml file, use the .env file. To set this up:

&ensp;&ensp;&ensp;&ensp;1. Copy the example.env file to the .env file:

&ensp;&ensp;&ensp;&ensp; `cp example.env .env`

&ensp;&ensp;&ensp;&ensp;2. Replace XXXXXXXXXXXX in the Sendgrid_api_key variable with your actual SendGrid API key within the .env file:

&ensp;&ensp;&ensp;&ensp;`Sendgrid_api_key=Your_API_Key`

### Start Docker

After you have cloned your Repository and are in the correct directory initializate the following actions within your terminal:

&ensp;&ensp;&ensp;&ensp;1. `docker volume create scrumptious-mongo-data`

&ensp;&ensp;&ensp;&ensp;2. `docker-compose build`

&ensp;&ensp;&ensp;&ensp;3. `docker-compose up`

Upon completion of the previous commands you will see all four Docker containers up and running.

### Wireframe

### Concept UI/UX

## Installation

## Models
### Account
- email: str
- password: str
- first_name: str
- last_name: str
### Stickyboard
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
### Sticky
- subject: str
- content: Optional[str]
- priority: int
- category: str
- start_date: datetime
- deadline: datetime
- account: list[str]
- stickyboard: str
## Endpoints
### Account

| Action                   | URL                                                          |
|:-------------------------|:-------------------------------------------------------------|
| `POST an account`        | `http://localhost:3000/accounts`                    |
| `GET all accounts`            | `http://localhost:3000/accounts`                             |
| `DELETE an account` | `http://localhost:3000/accounts/{account_id}` |

<details>
<summary markdown="span">POST an account: </summary>

```
{
  "email": "test_account@test.com",
  "password": "test_password",
  "first_name": "Test_First_Name",
  "last_name": "Test_Last_Name"
}
```

</details>

<details>
<summary markdown="span">GET all accounts: </summary>

```
[
  {
    "email": "test_account@test.com",
    "first_name": "Test_First_Name",
    "last_name": "Test_Last_Name",
    "id": "644b0597b0b66163a004216a"
  }
]
```

</details>

### Stickyboard

| Action                                                      | URL                                                         |
|:------------------------------------------------------------|:------------------------------------------------------------|
| `POST a stickyboard`                                        | `http://localhost:3000/stickyboard`                         |
| `GET all stickyboards`                                           | `http://localhost:3000/stickyboard`                         |
| `GET all stickies under categories of a stickyboard`            | `http://localhost:3000/{stickyboard_id}/stickies`           |
| `GET stickies under a stickyboards`                             | `http://localhost:3000/stickyboard/{stickyboard_id}/sticky` |
| `PUT a stickyboard`                                           | `http://localhost:3000/stickyboard/{stickyboard_id}`                  |
| `DELETE a stickyboard`                                      | `http://localhost:3000/stickyboard/{stickyboard_id}`        |

<details>
<summary markdown="span">POST a stickyboard: </summary>

```
{
  "board_name": "Test_Stickyboard_Board_Name",
  "description": "Test_Stickyboard_Description",
  "priority": 1,
  "start_date": "2023-04-27T23:01:04.911Z",
  "deadline": "2023-04-27T23:01:04.911Z",
  "account": [
    "644b0597b0b66163a004216a"
  ],
  "backlog": [],
  "todo": [],
  "doing": [],
  "review": [],
  "done": []
}
```

</details>

<details>
<summary markdown="span">GET all stickyboards: </summary>

```
[
  {
    "board_name": "Test_Stickyboard_Board_Name",
    "description": "Test_Stickyboard_Description",
    "priority": 1,
    "start_date": "2023-04-27T23:01:04.911000",
    "deadline": "2023-04-27T23:01:04.911000",
    "account": [
      "644b0597b0b66163a004216a"
    ],
    "backlog": [],
    "todo": [],
    "doing": [],
    "review": [],
    "done": [],
    "id": "644b05d6b0b66163a004216b"
  }
]
```

</details>

<details>
<summary markdown="span">GET all stickies under categories of a stickyboard: </summary>

```
{
  "backlog": [],
  "todo": [],
  "review": [],
  "doing": [
    {
      "subject": "Test_Sticky_Subject",
      "content": "Test_Sticky_Content",
      "priority": 1,
      "category": "doing",
      "start_date": "2023-04-27T22:25:24.238000",
      "deadline": "2023-04-27T22:25:24.238000",
      "account": [
        "644b0597b0b66163a004216a"
      ],
      "append": false,
      "stickyboard": "644b05d6b0b66163a004216b",
      "id": "644b06dab0b66163a004216c"
    }
  ],
  "done": []
}
```

</details>

<details>
<summary markdown="span">GET stickies under a stickyboard: </summary>

```
[
  {
    "subject": "Test_Sticky_Subject",
    "content": "Test_Sticky_Content",
    "priority": 1,
    "category": "doing",
    "start_date": "2023-04-27T22:25:24.238000",
    "deadline": "2023-04-27T22:25:24.238000",
    "account": [
      "644b0597b0b66163a004216a"
    ],
    "append": false,
    "stickyboard": "644b05d6b0b66163a004216b",
    "id": "644b06dab0b66163a004216c"
  }
]
```

</details>

<details>
<summary markdown="span">PUT a stickyboard: </summary>

```
{
  "board_name": "Test_Stickyboard_Board_Name_Update",
  "description": "Test_Stickyboard_Description_Update",
  "priority": 1,
  "start_date": "2023-04-27T23:01:04.911Z",
  "deadline": "2023-04-27T23:01:04.911Z",
  "account": [
    "644b0597b0b66163a004216a"
  ],
  "backlog": [],
  "todo": [],
  "doing": [],
  "review": [],
  "done": []
}
```

</details>

### Sticky

| Action                              | URL                                                      |
|:------------------------------------|:---------------------------------------------------------|
| `POST a sticky under a stickyboard` | `http://localhost:3000/{stickyboard_id}/sticky`          |
| `GET all stickies`                       | `http://localhost:3000/sticky`                           |
| `PUT a sticky`                         | `http://localhost:3000/sticky/{sticky_id}` |
| `DELETE a sticky`                   | `http://localhost:3000/sticky/{sticky_id}`                  |

<details>
<summary markdown="span">POST a sticky under a stickyboard: </summary>

```
{
  "subject": "Test_Sticky_Subject",
  "content": "Test_Sticky_Content",
  "priority": 1,
  "category": "doing",
  "start_date": "2023-04-27T22:25:24.238Z",
  "deadline": "2023-04-27T22:25:24.238Z",
  "account": [
    "644b0597b0b66163a004216a"
  ],
  "append": false
}
```

</details>

<details>
<summary markdown="span">GET all stickies: </summary>

```
[
  {
    "subject": "Test_Sticky_Subject",
    "content": "Test_Sticky_Content",
    "priority": 1,
    "category": "doing",
    "start_date": "2023-04-27T22:25:24.238000",
    "deadline": "2023-04-27T22:25:24.238000",
    "account": [
      "644b0597b0b66163a004216a"
    ],
    "append": false,
    "stickyboard": "644b05d6b0b66163a004216b",
    "id": "644b06dab0b66163a004216c"
  }
]
```

</details>

<details>
<summary markdown="span">PUT a sticky: </summary>

```
{
  "subject": "Test_Sticky_Subject_Update",
  "content": "Test_Sticky_Content_Update",
  "priority": 1,
  "category": "doing",
  "start_date": "2023-04-27T22:25:24.238Z",
  "deadline": "2023-04-27T22:25:24.238Z",
  "account": [
    "644b0597b0b66163a004216a"
  ],
  "stickyboard": "644b05d6b0b66163a004216b"
}
```

</details>
