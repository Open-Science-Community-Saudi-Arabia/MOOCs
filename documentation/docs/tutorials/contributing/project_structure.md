#### Project folder structure

The MOOCs API is structured as follows:

```bash
├── API
│   ├── src
│   │   ├── assets
│   │   │   ├── tempfiles
│   │   │   ├── textmaterials
│   │   ├── controllers
│   │   │   ├── course.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── ...
│   │   ├── models
│   │   │   ├── course.model.js
│   │   │   ├── auth.model.js
│   │   │   ├── ...
│   │   ├── routes
│   │   │   ├── course.route.js
│   │   │   ├── auth.route.js
│   │   │   ├── ...
│   │   ├── db
│   │   │   ├── index.js
│   │   ├── middlewares
│   │   │   ├── auth.js
│   │   │   ├── ...
│   │   ├── utils
│   │   │   ├── auth.js
│   │   │   ├── ...
│   │   ├── tests
│   │   │   ├── course.test.js
│   │   │   ├── auth.test.js
│   │   │   ├── ...
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── .env.example
│   │   ├── .env.dev
│   │   ├── .env.test
│   │   ├── .gitignore
│   │   ├── .eslintrc.json
│   │   ├── .prettierrc
```

The `API` directory contains the source code for the MOOCs API. The `API` directory is structured as follows:

- `controllers` - Contains the controller files for the MOOCs API, e.g. course, user controllers etc.
- `models` - Contains the model files for the MOOCs API, e.g. course, user models etc.
- `routes` - Contains the route files for the MOOCs API
- `middlewares` - Contains the middleware files for the MOOCs API, e.g. authentication, errorHandler, etc.
- `utils` - Contains the utility files for the MOOCs API e.g. email, auth, etc.
- `tests` - Contains the test files for the MOOCs API
- `.env.example` - Contains the environment variables for the MOOCs API
- `.env.dev` - Contains the development environment variables for the MOOCs API
- `.env.test` - Contains the test environment variables for the MOOCs API
- `.gitignore` - Contains the files and directories to be ignored by git
- `app.js` - Contains the entry point for the MOOCs API
- `server.js` - Contains the server configuration for the MOOCs API
- `package-lock.json` - Contains the dependencies for the MOOCs API
- `
