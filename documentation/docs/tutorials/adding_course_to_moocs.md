---
/**
 * @module documentation/docs/tutorials/adding_course_to_moocs.md
 * 
 * 
 * 
 * */
---

As a contributor you might want to add a course to the MOOCs API. This tutorial will guide you through the process. When you are done, you will have a course added to the MOOCs API.

The MOOCs API is a RESTful API that provides information about MOOCs. The API is built using [Node JS](https://nodejs.org/en/) and [Express](https://expressjs.com/). The API is hosted for development on [Render](https://www.render.com). The API is documented using [JSDoc](https://jsdoc.app/) with [Better-docs](https://github.com/SoftwareBrothers/better-docs) theme. The API is tested using [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/). The API is versioned using [Semantic Versioning](https://semver.org/).

## Getting started
The contribution guide for adding courses to the MOOCs API is divided into two parts. The first part is a technical guide for maintainers of the MOOCs API. The second part is a guide for contributors to the MOOCs API. The technical guide is more detailed and technical. The guide for contributors is less detailed and technical this is done to make it easier for contributors to add courses to the MOOCs API.

### Technical guide for maintainers of the MOOCs API
The technical guide for maintainers of the MOOCs API is divided into three parts. The first part is a guide for setting up the MOOCs API for development. The second part is a guide for adding a course to the MOOCs API. The third part is a guide for testing the MOOCs API.

#### Guide for setting up the MOOCs API for development
The MOOCs API is built using the following frameworks and technologies:
- Node JS - JavaScript runtime
- Express JS - Web framework
- MongoDB - NoSQL database
- Mongoose - MongoDB object modeling
- Mocha - Testing framework
- Chai - Assertion library
- JSDoc - Documentation generator
- Postman - API testin

To set up the MOOCs API for development, you need to install the following:
- NPM - Node Package Manager (comes with Node JS) - [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)
- MongoDB - [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
- Postman - [https://www.getpostman.com/apps](https://www.getpostman.com/apps)


To set up the MOOCs API for development, follow the steps below:
1. Clone the MOOCs API repository from GitHub
    ```bash 
    git clone https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs
    ``
2. Install the dependencies using NPM
   - Open your terminal and navigate to the MOOCs API directory
   - Navigate to the `API` directory - `cd API`
   - Run the following command - `npm install` to install all the required dependencies
3. Create your environment variables
   - Create a file named `.env.dev` in the `API` directory
   - Copy the contents of the `.env.example` file in the `API` directory to the `.env` file
   - Edit the `.env.dev` file and add your environment variables
4. Start the server
   - Still within the `API` folder run `npm run dev` to start the server locally.
  

#### Project file structure
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
  


# Guide for contributors to the MOOCs API (less technical)
