
When building on the API, it is important to have a clear and organized file structure. A well-organized file structure makes it easier to maintain the code and collaborate with others. In this tutorial, we will go through the file structure and naming conventions used in our open-source MOOCs platform API.

## Folder Structure

Our API file structure is organized as follows:

```yaml
├── API
│ ├── src
│ │ ├── assets
│ │ ├── controllers
│ │ ├── models
│ │ ├── routes
│ │ ├── db
│ │ ├── middlewares
│ │ ├── utils
│ │ ├── tests
│ │ ├── app.js
│ │ ├── server.js
│ │ ├── package.json
│ │ ├── package-lock.json
│ │ ├── .env.example
│ │ ├── .env.dev
│ │ ├── .env.test
│ │ ├── .gitignore
│ │ ├── .eslintrc.json
│ │ ├── .prettierrc
```


Here is a brief overview of each folder:

- `assets`: contains static files such as images and videos
- `controllers`: contains the controller functions for each API endpoint
- `models`: contains the data models used in the API
- `routes`: contains the route definitions and connects the endpoints to the controller functions
- `db`: contains the database configuration and connection file
- `middlewares`: contains the middleware functions used in the API
- `utils`: contains utility functions used throughout the API
- `tests`: contains the automated tests for the API
- `app.js`: main application file where we initialize the Express app and define global middleware
- `server.js`: file that starts the server and listens for incoming requests
- `package.json`: file that defines the project dependencies and scripts
- `package-lock.json`: file that contains the exact versions of all the dependencies
- `.env.example`: example file that contains the environment variables used in the project
- `.env.dev`: file that contains the environment variables for development
- `.env.test`: file that contains the environment variables for testing
- `.gitignore`: file that specifies files and folders that should be ignored by Git
- `.eslintrc.json`: file that specifies the linting rules for the project
- `.prettierrc`: file that specifies the formatting rules for the project using Prettier

## Naming Conventions

In addition to the folder structure, we also have naming conventions for files. Here are the naming conventions we use:

- Controllers: `resource.controller.js`
- Models: `resource.model.js`
- Routes: `resource.route.js`
- Middlewares: `middleware_name.js`
- Utils: `utility_name.js`
- Tests: `resource.test.js`

Using these naming conventions helps us quickly identify the purpose of each file and makes it easier to find the file we need when making changes.

That's it for our API file structure and naming conventions tutorial. Happy coding!


