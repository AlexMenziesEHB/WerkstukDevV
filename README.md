# WerkstukDevV
---
## Table of Contents
- [Project information](#project-information)
  - [Author](#author)
  - [About this project](#about-this-project)
- [Getting started](#getting-started)
- [How it works](#how-it-works)
  - [Achievements Table](#achievements-table)
  - [Genre Table](#genre-table)
- [Used dependencies](#used-dependencies)
- [Licenses](#licenses)

---
# Project information

---
## Author
- [Alex Menzies](https://github.com/AlexMenziesEHB)

---
## About this project

This Achievements API allows you to create and modify achivements and have a deeper look into their depending genre.

---
# Getting started

1. Clone this repository from github.
2. Navigate to the root folder and change .env.template to .env
   - This is a simple text configuration file for controlling your applications environment constants.
3. Navigate to the root folder and start up the Docker container.
    ```shell
    docker-compose build
    docker-compose up

    or

    docker-compose up --build
    ```
    For more information regarding Docker, please refer to [their documentation](https://docs.docker.com/).
4. To run tests with Jest, navigate to the /api folder.
    ```shell
    npm test
    ```
    For more information regarding Jest, please refer to [their documentation](https://jestjs.io/docs/getting-started).
5. To see the the data form the database, I recommend using TablePlus.
   You can get it [here](https://tableplus.com/).

---
# How it works

This Achievements API uses two tables to manage its content. Both tables are accessible through their respective CRUD endpoints.

---
## Achievements Table
This table is used to save all achievements. It follows the following structure:

|uuid  |achievementName|description|genreName|
|------|---------------|-----------|---------|
|*uuid*|*string*       |*string*   |*string* |

You can modify this table by using the following endpoints:

- `POST /achievement`
    - Posts an achievement to the database.
    - Requires a body with the following properties:
        ```js
        {
            achievementName: String,
            description: String,
            genreName: String
        }
        ```
- `GET /achievements`
    - Returns all achievements from the database.
- `GET /achievement/:uuid`
    - Returns a specific achievement by uuid.
- `PATCH /achievement/:uuid`
    - Updates the content of a specific achievement by uuid.
    - - Requires a body with the properties you wish to edit. **You do not have to provide all properties**.
        ```js
        {
            achievementName: "Welcome!",
            genreName: "Start"
        }
        ```
- `DELETE /achievement/:uuid`
    - Deletes a specific achievement by uuid.
    - Requires a body which includes the uuid as a string:
        ```js
        {
            uuid: "ab382560-580f-11ec-b011-51878d80a9a9"
        }
        ```

---
## Genre Table
This table is used to save all genres from achievements database. It follows the following structure:

|uuid  |genreName|
|------|---------|
|*uuid*|*string* |

You can modify this table by using the following endpoints:

- `POST /genre`
    - Posts an genre to the database.
    - Requires a body with the following properties:
        ```js
        {
            genreName: String
        }
        ```
- `GET /genres`
    - Returns all genres from the database.
- `GET /genre/:uuid`
    - Returns a specific genre by uuid.
- `PATCH /genre/:uuid`
    - Updates the content of a specific genre by uuid.
    - - Requires a body with the properties you wish to edit.
        ```js
        {
            genreName: "Abs"
        }
        ```
- `DELETE /genre/:uuid`
    - Deletes a specific genre by uuid.
    - Requires a body which includes the uuid as a string:
        ```js
        {
            uuid: "ab382560-580f-11ec-b011-51878d80a9a9"
        }
        ```

---
# Used dependencies
* Git flow
* Docker

- body-parser: "^1.19.0"
- express: "^4.17.1"
- http: "^0.0.1-security"
- jest: "^27.3.1"
- knex: "^0.95.13"
- nodemon: "^2.0.14"
- pg: "^8.7.1"
- puppeteer: "^12.0.1"
- sort-object-keys: "^1.1.3"
- supertest: "^6.1.6"
- uuid: "^8.3.2

---

# Licenses
Licenses for this project can be found in the root folder of this project.
Make sure to look at them and reas them before starting.
- MIT License
- Contributing
- Code of Conduct

---