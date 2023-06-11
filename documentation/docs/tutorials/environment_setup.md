## Technologies

### Frontend Technologies

| Technology | Version | Use                |
| ---------- | ------- | ------------------ |
| `Prettier` | v2.7.1  | Code Formatting    |
| `React`    | v18.2.0 | Frontend Framework |
| `NodeJs`   | v14     | Environment        |
| `EsLint`   | v8.2.0  | Code Linting       |
| `Vite`     | v2.6.8  | Code Bundler       |

### Backend Technologies

| Technology  | Version | Use                         |
| ----------- | ------- | --------------------------- |
| `NodeJS`    | v4.3    | Backend Environment         |
| `ExpressJS` | v3.10   | Framework for building APIs |
| `MongoDB`   | v5.0^   | Non-Relational Database     |

### Setting up API

#### Prerequisites

- Nodejs installed on your machine
- MongoDB installed on your machine

To install nodejs, follow the steps below in this [guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
To install MongoDB, follow the steps below in this [guide](https://docs.mongodb.com/manual/installation/)

After installing nodejs and MongoDB, follow the steps below to install the project on your local machine:

Instructions on how to run the backend server:

- Open `Git Bash` terminal inside root project folder
- cd into the backend folder by typing

  ```bash
  cd API
  ```

- To install dependencies, run the following command:

  ```bash
  npm install
  ```

- Navigate into the `/src/ ` foder and create `.env.dev` file
  To do this run the following command:

  ```bash
    cd src
    touch .env.dev
  ```

- Copy the content of `.env.example` file and paste it into `.env.dev` file
- Fill in the required fields in the `.env.dev` file
- To start the server initally these environment variables must be set. 
        
        MONGO_URI_DEV = <MongoDB connection URL>
        PORT = 5000

        JWT_ACCESS_SECRET = X5hyeNLbpVpsJ5v52og8_cwb41AeVtcPMsaguWXvql7X5h
        JWT_ACCESS_EXP = 1h
        JWT_REFRESH_SECRET = yeNLbpVpsJ5v52og8_cwb41AeVtcPMsaguWXvql
        JWT_REFRESH_EXP = 7d

        OAUTH_CLIENT_ID = <Google Client ID>
        OAUTH_CLIENT_SECRET = <Google Client Secret>
        OAUTH_REFRESH_TOKEN = <Google Refresh Token>
        OAUTH_ACCESS_TOKEN = <Google Access Token>

        GITHUB_CLIENT_ID = <Github Client ID>
        GITHUB_CLIENT_SECRET = <Github Client Secret>

        CLIENT_APP_URL = https://localhost://5173

    Note: There are other environment variables that are optional and can be set if needed. 
- To start the server, run the following command:

  ```bash
  npm run dev
  ```

- Now you can access the API on `http://localhost:5000`

### Setting up Frontend

#### Prerequisites
