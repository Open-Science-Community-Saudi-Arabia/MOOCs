<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![CC BY 4.0][cc-by-shield]][cc-by]


<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- PROJECT LOGO -->

<div align="center" style="display:flex; align-items: center; justify-content: center" flex-direction="row">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://avatars.githubusercontent.com/u/79674464?s=200&v=4">
    <img src="https://avatars.githubusercontent.com/u/79674464?s=200&v=4" width="80" height="80" alt="Logo"/>
  </picture>
  <p align="center" style="font-size:30px; margin-top: 10px; margin-left: 10px">OSCSA</p>
</div>

<h1 align="center">Open Innovation Lab</h1>

<div align="center">
    Massive Open Online Courses (MOOCs) for Open Science in Arabic
</div>
<br />

<div align="center">
  <p align="center">
    <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://oscsa-moocs.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs">Github</a>
    ·
    <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/issues">Report Bug</a>
    ·
    <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/issues">Request Feature</a>
  </p>
</div>

<div align="justify">

## Introduction
[Open Science Community Saudi Arabia (OSCSA)](https://osc-ksa.com) was establised in line with Saudi Arabia's Vision 2030, which focuses on installing values, enhancing knowledge and improving equal access to education. It aims to provide a placec where new comers and experienced peers interact, inspire each other to embed open science practives and values in their workflows and provide feedback on policies, infrastructures and support services. Our community is part of the [International Network of Open Science & Scholarship Communities (INOSC)](https://osc-international.com).

Open Innovation lab is a Massive Open Online Courses (MOOCs) platform, where free online courses and materials are available to enrol. We have developed our own materials and will also include materials from Open Life Sciences and Turing Way. 
The platform is similar to [Udemy](https://udemy.com), where a user can view videos and written materials as lessons.

## Getting Started
This documentation is built using the [JSDoc](https://github.com/jsdoc/jsdoc) tool, an API documentation generator for JavaScript and [DocStrap](https://github.com/docstrap/docstrap) theme was used for the style. For more information about using JSDoc, see the [documentation](https://jsdoc.app/) guide or the [Get Started guide](https://jsdoc.app/about-getting-started.html)

### Prerequisites
To get started with contributing to Open Innovation Lab, you will need;
- A Github [account](https://github.com/)
- A basic understanding of Markdown is recommended but not necessary. Here is a [guide](https://www.markdownguide.org/cheat-sheet/)

### Installation
The project repository is distributed into two main directories `CLIENT` and `API`. The setup process for the Client and API are quite similar.

Follow these steps:
1. Create a fork of the [Open Innovation Lab github repository](https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs) to your github account.
2. Clone the forked repository to your local machine.
   To do this run:
   ```bash
   git  clone https://github.com/<your-github-username>/MOOCs
   ```
3. Now you can make your contributions, commit them, push and raise a Pull request for the changes.
   <i><b>NOTE:</b> Before making any contributions, make sure to go through the [Contribution guidelines](), it covers project specific rules for creating issues, and raising pull requests or any other form of contribution. </i>

To setup the Client app locally follow these steps;
#### Frontend
1. Open your terminal inside the project's root directory
2. Make sure to have node installed by running the following command
    ```bash
    node -v 
    ```
    This should display your current node version if it exists.
    If you don't have [NodeJs](https://nodejs.org/) already installed follow the instructions [here](https://nodejs.org/en/download/)
3. Install [yarn](https://www.npmjs.com/package/yarn) if you don't have it. Follow the installation guide [here](https://classic.yarnpkg.com/en/docs/install)
4. From the projects root directory, navigate to the `Frontend` folder
   ```bash
   cd Frontend
   ```
5. Install necessary dependencies, run
   ```bash
   yarn install
   ```
6. To start the server, run
   ```bash
   yarn dev
   ```
    You're all set, open http://localhost:5173 to view the hosted proj

#### Backend
1. Open your terminal inside the project's root directory
2. Make sure to have node installed, you can check by running
   ```bash
   node -v
   ```
   This should display your current node version if it's already installed.
   If you don't have [NodeJs](https://nodejs.org/) already installed follow the instructions [here](https://nodejs.org/en/download/)
3. Install [npm](https://docs.npmjs.com/about-npm), if you don't have npm installed follow the installation guide [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
4. Navigate to the `backend_API` folder
   ```bash
   cd backend_API  
   ```
5. Install necessary dependencies, run
   ```bash
   npm install
   ```
6. There are different environments, each environment has an independent configuration file withing the `/backend_API/src/` directory
   `.env` will be used when you use the `production` environment
   `.env.dev` will be used when you use the `dev` environment
   `.env.test` will be used when you use the `test` environment
7. To start the development server, run
    ```bash
    npm run dev
    ```
You're all set, all http requests can be sent to http://localhost:5000, except you specify the PORT variable in the `.env.dev` file
You can refer to the detailed guide in the [Environment Setup Guide]()


#### Usage
- Logi2
- Uploading courses
- Enrolling for courses
- Canceling enrollments
- Searching for courses

#### Changelog
This is a brief preview of the project's changelog history, view the full version [here](../CHANGELOG.md)


- Introduction
- Getting started
  - Prerequisites
  - Installation Guide
  - Usage
- Changelog (short preview of the milestones achieved in the project)
- Design and architecture
- Project Folder structure
  - Directory structure
  - Folder functions
  - File naming conventions
- Local Environment setup
- Contribution Guide/Workflow
- General Contrbution guides
  - Raising issues
  - Making changes
  - Submittting Pull request
- Frontend specific contribution guidelines
- Backend specific contribution guidelines
- Code documentation
- Database model design
- Function docs
- API docs
- 
Frontend: https://oscsa-moocs.netlify.app/

## Technologies

### Frontend Technologies

| Technology         | Version | Use                  |
| ------------------ | ------- | -------------------- |
| `Prettier`         | v2.7.1  | Code Formatting      |
| `React`            | v18.2.0 | Frontend Framework   |
| `NodeJs`           | v14     | Environment          |
| `EsLint`           | v8.2.0  | Code Linting         |
| `Vite`             | v2.6.8  | Code Bundler         |

### Backend Technologies

| Technology              | Version | Use                         |
| ----------------------- | ------- | --------------------------- |
| `NodeJS`                | v4.3    | Backend Environment         |
| `ExpressJS`             | v3.10   | Framework for building APIs |
| `MongoDB`               |    -    | Non-Relational Database     |


## Contributing :two_hearts:
- If you like it, leave your star in this project :star2:
- If you would like to complain/suggest/contribute to this project, feel free to open a issue :heart_decoration:
- Please follow our [contributing guidelines](https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/blob/main/CONTRIBUTING.md).
- This is the guide to how the UI Design should look when implementing any frontend pages. [Click this link to see the figma design](https://www.figma.com/file/mkhBuJAS2arzy3wrbTZp2D/Simple-Landing-page-for-OSCSA%2C-with-Log-In-and-Sign-Up-Pages?node-id=0%3A1) 

## Getting Started

### Environment Setup

- Make sure you have nodejs installed by running the following command:

```bash
node -v
```

- If the output is not the version of your nodejs installation, install nodejs from [here](https://nodejs.org/en/download/)

*Things to note*
- Linting has been set up for staged commits in the repository.
- We're using `eslint` for js linting, and `prettier` for code formating.
- Please make it a point to install `eslint` and `prettier` plugins on vscode to aid in your coding process.
- Your code has to be properly formatted and have the correct syntax for you to be able to commit your changes.
- Make sure you attend to all warnings and errors before you commit your code

### Setting up the Frontend

- Open `Git Bash` terminal inside root project folder
- cd into the frontend folder by typing

```bash
cd Frontend
```

- After ensuring you've installed nodejs install [yarn](https://www.npmjs.com/package/yarn).
- To install dependencies, run the following command:

```bash
yarn install
```


### STARTING THE SERVER

- To start the whole application server

```bash
yarn dev
```

- Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
- You're all set. Happy coding😁

### Creating a production building

```bash
yarn build
```

### Checking formatting of whole project

- Run this script to check if all files meet prettier standard rules of formatting

```bash
yarn format:check
```

- Run this script to fix all auto-fixable formatting errors in the whole project

```bash
yarn format:fix
```

### Checking code syntax is in line with eslint rules

- Run this script to check if all files meet eslint standard rules of code sytax

```bash
yarn lint:check
```

- Run this script to fix all auto-fixable syntax errors in the whole project

```bash
yarn lint:fix
```

## Things to note as you contribute

- Any page you code has to be responsive.
- Write clear and concise commit messages.
- Always run `yarn` after pulling code from the upstream repository.
- Always, **Always** make pull requests to the **dev_team2** branch, not the `main` branch. All pull requests to the `main` branch will not be merged.
- Please, always test your code and make sure it works correctly before making a pull request
- Run `prettier --check "input name of file here"` to check if your code is well formatted before you commit
- Run `eslint input name of file here --color` to check if the files you edited con form to the standards required for this project

### Setting up Backend

Instructions on how to run the backend server:

- Open `Git Bash` terminal inside root project folder
- cd into the backend folder by typing

```bash
cd backend_API
```

- To install dependencies, run the following command:

```bash
npm install
```

- create a .env file in the project folder with the `MONGO_URI`, `PORT` variables

#### STARTING THE SERVER

- To start the whole application server

```bash
npm run dev
```

- Open your browser on localhost with the port you specified to see the result.
- You're all set and ready to code😁

## License

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]
</div>
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="http://adedamolaorofin.web.app"><img src="https://avatars.githubusercontent.com/u/74486522?v=4?s=100" width="100px;" alt="Orofin Adedamola A."/><br /><sub><b>Orofin Adedamola A.</b></sub></a><br /><a href="#infra-Meekunn" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#design-Meekunn" title="Design">🎨</a></td>
      <td align="center"><a href="https://realrichi3.github.io"><img src="https://avatars.githubusercontent.com/u/76791916?v=4?s=100" width="100px;" alt="Richie"/><br /><sub><b>Richie</b></sub></a><br /><a href="#infra-RealRichi3" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-RealRichi3" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/pulls?q=is%3Apr+reviewed-by%3ARealRichi3" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://goodnewssandy.netlify.app/"><img src="https://avatars.githubusercontent.com/u/54219127?v=4?s=100" width="100px;" alt="Goodnews Sandy"/><br /><sub><b>Goodnews Sandy</b></sub></a><br /><a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/pulls?q=is%3Apr+reviewed-by%3Asandygudie" title="Reviewed Pull Requests">👀</a> <a href="#infra-sandygudie" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#mentoring-sandygudie" title="Mentoring">🧑‍🏫</a></td>
      <td align="center"><a href="https://github.com/mufidat3250"><img src="https://avatars.githubusercontent.com/u/77861437?v=4?s=100" width="100px;" alt="Wahab Mufidat"/><br /><sub><b>Wahab Mufidat</b></sub></a><br /><a href="#design-mufidat3250" title="Design">🎨</a></td>
      <td align="center"><a href="https://github.com/anslemkelechi"><img src="https://avatars.githubusercontent.com/u/47811347?v=4?s=100" width="100px;" alt="Kelechi Okoronkwo"/><br /><sub><b>Kelechi Okoronkwo</b></sub></a><br /><a href="#infra-anslemkelechi" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center"><a href="https://github.com/oEbuka"><img src="https://avatars.githubusercontent.com/u/94439139?v=4?s=100" width="100px;" alt="Obiora Ebuka"/><br /><sub><b>Obiora Ebuka</b></sub></a><br /><a href="#infra-oEbuka" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center"><a href="http://okereke.dev"><img src="https://avatars.githubusercontent.com/u/65835404?v=4?s=100" width="100px;" alt="Okereke Chinweotito"/><br /><sub><b>Okereke Chinweotito</b></sub></a><br /><a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/commits?author=okerekechinweotito" title="Tests">⚠️</a> <a href="#infra-okerekechinweotito" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/AminMusah"><img src="https://avatars.githubusercontent.com/u/60413409?v=4?s=100" width="100px;" alt="Amin Musah Ahmed"/><br /><sub><b>Amin Musah Ahmed</b></sub></a><br /><a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/issues?q=author%3AAminMusah" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://julianasau.vercel.app"><img src="https://avatars.githubusercontent.com/u/49183775?v=4?s=100" width="100px;" alt="Juliana Sau "/><br /><sub><b>Juliana Sau </b></sub></a><br /><a href="#infra-JulianaSau" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-JulianaSau" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/ORIYOMI289"><img src="https://avatars.githubusercontent.com/u/63899878?v=4?s=100" width="100px;" alt="JewelCodes"/><br /><sub><b>JewelCodes</b></sub></a><br /><a href="#infra-ORIYOMI289" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg?style=flat-square
[forks-shield]: https://img.shields.io/github/forks/Open-Science-Community-Saudi-Arabia/MOOCs.svg?style=flat-square
[forks-url]: https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/network/members
[stars-shield]: https://img.shields.io/github/stars/Open-Science-Community-Saudi-Arabia/MOOCs.svg?style=flat-square&color=brightgreen
[stars-url]: https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/stargazers
[issues-shield]: https://img.shields.io/github/issues/Open-Science-Community-Saudi-Arabia/MOOCs.svg?style=flat-square
[issues-url]: https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/issues


