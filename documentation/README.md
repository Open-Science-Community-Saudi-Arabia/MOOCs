<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
```

```
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
#### Frontend setup
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

#### Backend setup
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


### Usage
The frontend app uses [Yarn](https://classic.yarnpkg.com/en/docs/install) as its package manager and [React](https://reactjs.org/) as its frontend framework. The backend API uses [npm](https://npmjs.com) as its package manager, it also uses [Express](https://expressjs.com/) as its web framework and [MongoDB](https://www.mongodb.com/) as its database.

**NOTE:** The frontend app is hosted on [Netlify](https://www.netlify.com/) and the backend API is hosted on [Heroku](https://www.heroku.com/) and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

**Starting the frontend app**
1. Within the `/Frontend` directory, run
   ```bash
   yarn install
   ```
2. To start the development server, run
   ```bash
    yarn dev
    ```
3. To build the app for production, run
   ```bash
    yarn build
    ```
4. To start the production server, run
    ```bash
    yarn start
    ```

.


**Starting the backend API**

1. Within the `/backend_API` directory, you'll have to install all the necessary dependencies, run
   ```bash
   npm install
   ```  

2. To start the development server, run
   ```bash
    npm run dev
    ```

**NOTE:** The `.env.dev` file is used when you start the development server, you can change the environment variables in this file to suit your needs.
The main environment variables required for starting up the API development server are:
- PORT: The port number the server will listen to
- MONGO_URI: The URI of the MongoDB database
Other environment variables are optional, you can refer to the [Environment Setup Guide]() for more information.



## License

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

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

<!-- <div class="next-button"> -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->


<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<button class="next"> <a href="./docs/tutorials/api_docs.md"> Next </a> <button>
</div>

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


