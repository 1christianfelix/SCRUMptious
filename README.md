# Scrumptious

This link will lead to the deployed website:

Website: https://team-scrappy.gitlab.io/scrum-ptious

#### Team:

- Brandon Moore - Software Developer
- Christian Felix - Software Developer
- John Liu - Software Developer
- Kurt Loban - Software Developer


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

## Design Picture


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
### Sticky
- subject: str
- content: Optional[str]
- priority: int
- category: str
- start_date: datetime
- deadline: datetime
- account: list[str]
- stickyboard: str
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
## Endpoints
### Account

| Action                 | URL                                                          |
|:-----------------------|:-------------------------------------------------------------|
| `Get All Accounts`          | `http://localhost:3000/accounts`                             |
| `Post Account`      | `http://localhost:3000/accounts`                    |
| `Delete Account`       | `http://localhost:3000/accounts/{account_id}` |

<details>
<summary markdown="span">GET All Accounts: </summary>

```
[
  {
    "email": "test_account@test.com",
    "first_name": "Test_First_Name",
    "last_name": "Test_Last_Name",
    "id": "111111111111111111111111"
  }
]
```
</details>

<details>

<summary markdown="span">POST Account: </summary>

```
{
    "email": "test_account@test.com",
    "password": "test_password",
    "first_name": "Test_First_Name",
    "last_name": "Test_Last_Name"
}
```
</details>
