# Contributing Guidelines:

We welcome all contributions to the Open Science Community in Saudi Arabia. The contribution can be an [issue report](https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/issues)
or a [pull request](https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/pulls).

## BACKEND API for MOOCs platform

This project is meant to serve as the backend API for the MOOCs platform. The program aims to build an educational platform to serve courses and videos, where each course may have exercises attached.

The API is hosted for testing at https://moocs-test.onrender.com/

### API DOCUMENTATION
Documentation for consuming the API endpoints can be found here https://documenter.getpostman.com/view/20633788/2s8YemuZwv

#### Technologies

- [Node JS](https://nodejs.org/en/) - Backend Environment
- [Express JS](https://expressjs.com/) - Framework for APIs
- [Mongo DB](https://www.mongodb.com/) - Non Relational Database
- [Mocha](https://mochajs.org/) - Framework for Unit tests
- [Chai](https://www.chaijs.com/) - Assertion library for Node


### PROJECT FOLDER STRUCTURE
```
.....
backend_API/
  -- node_modules/
  -- src/
       -- controllers/
           -- auth.controllers.js
           -- course.controllers.js
       -- routes/
           -- auth.routes.js
           -- course.routes.js
           -- routes_handler.js
       -- models/
           -- user.models.js
           -- course.models.js
       -- middlewares/
           -- auth.js
           -- error_handler.js
           -- permission_handler.js
       -- db/
       -- test/
           -- db.test.js
           -- auth.test.js
       -- utils/
             -- async_wrapper.js
             -- config.js
             -- custom_errors.js
       -- .env
       -- .env.test
       -- .env.dev
       -- app.js
       -- server.js
package-lock.json
package.json

```

- /src/controllers - API functions to implement major features like, uploading courses, deleting courses
- /src/routes - Contains API routes
- /src/models - Contains MongoDB schema models
- /src/middlewares - Contains express framework middlewares
- /src/utils - Contains utilities files for frequently imported API functions
- /src/db - Contains DB connection files
- /src/test - Contains files for unit tests

### FILE NAME FORMAT
- controllers should have a suffix `.controllers.js`
- route files should have a suffux `.routes.js`
- models files should have a suffix `.model.js`

### ROUTE FORMATTING
Each route file should be imported to the `routes_handler.js` file. The route_handler.js will have a uniform route path pattern. All routes will then be exported to the `app.js` file 

Route path format - `/api/v1/<ROUTE GROUP>/<ROUTE ACTION>/`. v1 is the current API version
`/api/v1/<ROUTE GROUP>/` prefix is applied in the `routes_handler.js` file

ROUTE GROUPS includes - auth, course, exercise, question
- For `auth` routes group use `/api/v1/auth/<ROUTE ACTION>`
- For `course` routes group use `/api/v1/course/<ROUTE ACTION>`
- For `exercise` routes group use `/api/v1/exercise/<ROUTE ACTION>`

ROUTE ACTIONS may vary as the case may be, good examples of ROUTE ACTIONS are `update new create`
A good example of a complete route path is `/api/v1/auth/signup` where `auth` is the route group and `signup` is the route action


### ENVIRONMENT SETUP
- Open `Git bash` or any terminal inside the projects root directory
- Navigate to the `backend_API` folder
```bash
cd backend_API
```
- Install dependencies
```bash
npm install
```

### Starting the server
- To start the server locally, run
```
npm start
```
- All API request should be made to https://localhost:5555 or replace port with matching environment variable

### Running tests
- To run unit tests, run
```
npm test
```

### CONTRIBUTING WORKFLOW

1. Check that there isn't [already an issue](https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/issues) about your idea to avoid duplicating work.

   - If there isn't one already, please create one so that others know you're working on it.

2. Fork the [Open-Science-Community-Saudi-Arabia/MOOCs](https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/) to your GitHub account.

3. Clone the forked repository on your local machine.

```bash

git clone https://github.com/<your-github-username>/MOOCs.git

```

4. Sync the fork, to avoid merge conflicts.

```bash

    git remote add upstream https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs.git
    git fetch upstream
    git pull upstream main
    git push

```

5. From the dev_team2 branch, create a new branch with your github username as its name.

```bash
   git checkout dev_team2
   git checkout -b <new-branch-name>

```
Your branch name should be descriptive enough, an exmaple is `feat-signpup` or `fix-failed-login`

6. Make the necessary changes and additions / subtractions within your forked repository.

7. Add and commit changes made.

```bash

   git add .
   git commit -m "commit message"

```

Your commit messages should be descriptive enough

8. Push the changes to forked repository.

```bash

   git push origin <branch-name>

```

9. Submit a Pull Request against the `dev_team2` branch and wait for the code to be reviewed and merged.

If you're not used to this workflow with git, you can start with some [basic docs from GitHub](https://help.github.com/articles/fork-a-repo/).


## NOTE
- After making any contribution, make sure to run all tests and ensure they all pass before making a pull request
- All succesful contributions and pending tasks are reference [here](https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/issues/5)
- All issues and pull requests should be made using the templates at [templates](https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/tree/dev_team2/.github)