<p style="text-align: center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</p>

# TaskUnity

## Introduction

TaskUnity is a state-of-the-art task management application designed to provide a streamlined platform for individuals and teams to effectively organize, manage, and collaborate on their tasks and projects. By offering innovative features and focusing on user experience, it aims to carve out a competitive edge in the crowded task management application market.

This application simplifies task management, fosters productivity, and promotes collaboration among users. Key features include user management, task management, task assignment, task notifications, collaboration tools, chat support, payment processing for premium features, a comprehensive API for third-party integrations, in-depth analytics and reporting, and stringent security measures.

## Tech Stack

The following technologies power the backend of TaskUnity:

### Node.js / Nest.js with Express Adapter

Node.js and Nest.js, using the Express adapter, form the backbone of the server-side logic. They provide a scalable and efficient runtime for building fast and scalable network applications.

### TypeScript

TypeScript, a statically-typed superset of JavaScript, enhances code quality and understandability. It brings robust type-checking and object-oriented programming patterns to the project, promoting maintainability and scalability.

### PostgreSQL

PostgreSQL is the primary database used in TaskUnity. It is a powerful, open-source object-relational database system that offers reliability, robustness, and performance.

### TypeORM

TypeORM is an ORM (Object-Relational Mapping) that is used to interact with the PostgreSQL database. It simplifies the process of writing database queries by allowing developers to use TypeScript (or JavaScript) to manipulate database contents.

### Docker

Docker is used to containerize the application. It encapsulates the application with all its dependencies into a single standalone unit, making it highly portable and ensuring consistent behavior across different environments.

### Docker Compose

Docker Compose is used in TaskUnity to define and run multi-container Docker applications. It simplifies the process of setting up and managing the application infrastructure, making it especially useful for frontend developers who need to quickly set up the backend server for development or testing purposes.

## Prerequisites
- If you'd like to run project via Docker ensure that you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your system. If not, you can download them from their respective official websites.
- Node.js 18.x
- Yarn package manager
- Nest CLI

## Installation

1. Copy `.env.example` to `.env` (you have to create it) and set up your environment variables if needed
2. Install dependencies
```bash
$ yarn install
```
3. Add Nest CLI
```bash
$ yarn add global @nestjs/cli
```

## Running the app in dev mode

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running the app in container

```bash
# start server
$ make start

# stop server
$ make stop
```

## Contributing

1. Clone repository
2. Create a new branch from `main` branch
   1. Branch name should be gotten from the issue, e.g. `1-user-registration-and-login-using-email-password`
