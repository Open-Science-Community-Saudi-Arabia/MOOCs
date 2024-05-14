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
    <source media="(prefers-color-scheme: dark)" srcset="https://moocs-client.netlify.app/assets/logo-DECH4wC4.svg">
    <img src="https://moocs-client.netlify.app/assets/logo-DECH4wC4.svg" width="250" height="80" alt="Logo"/>
  </picture>
</div>

<h2 align="center"  style="margin-top:0em;margin-bottom:0em">
   Revolutionizing research and education.
</h2 >

<div align="center">
  <p align="center">
    <br />
    <br />
    <a href="https://moocs-client.netlify.app/">View Demo</a>
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

Open Innovation is a Massive Open Online Courses (MOOCs) platform for equitable access to educational resources. We provide access to learning materials and resources for various areas in open science. We developed materials within the open science community andalso share materials from Open Life Sciences and Turing Way.

### Deployment

Frontend: [https://moocs-client.netlify.app/](https://moocs-client.netlify.app/)  
API: [https://documenter.getpostman.com/view/20633788/2s93JwMgmb](https://documenter.getpostman.com/view/20633788/2s93JwMgmb)

### Getting Started

This documentation is built using the [JSDoc](https://github.com/jsdoc/jsdoc) tool, an API documentation generator for JavaScript and [DocStrap](https://github.com/docstrap/docstrap) theme was used for the style. For more information about using JSDoc, see the [documentation](https://jsdoc.app/) guide or the [Get Started guide](https://jsdoc.app/about-getting-started.html)

### Prerequisites

To get started with contributing to Open Innovation Lab, you will need;

- A Github [account](https://github.com/)
- A basic understanding of Markdown is recommended but not necessary. Here is a [guide](https://www.markdownguide.org/cheat-sheet/)

### Installation

The open Innovation projects is a monorepository meaning that it has `CLIENT` and `API` directories in one respository. The setup process for the client and API are quite similar.

Follow these steps:

1. Create a fork of the [Github repository](https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs) to your github account.
2. Clone the forked repository to your local machine.
   To do this run:
   ```bash
   git clone https://github.com/<your-github-username>/MOOCs
   ```
3. Now you can make your contributions, commit, push and raise a pull request for the changes. <br/>
   <i><b>NOTE:</b> Ensure to go through the [Contribution guidelines](), it covers project specific rules for creating issues, and raising pull requests or any other form of contribution. </i>

### Client setup

The `client` app uses [Yarn](https://classic.yarnpkg.com/en/docs/install) as its package manager and [Vite React](https://vitejs.dev/guide/) as its frontend framework. And it is hosted on [Netlify](https://www.netlify.com/).

1. Open your terminal inside the project's root directory
2. Make sure to have node installed by running the following command
   ```bash
   node -v
   ```
   This should display your current node version if it exists.
   If you don't have [NodeJs](https://nodejs.org/) already installed follow the instructions [here](https://nodejs.org/en/download/)
3. Install [yarn](https://www.npmjs.com/package/yarn) if you don't have it. Follow the installation guide [here](https://classic.yarnpkg.com/en/docs/install)
4. From the projects root directory, navigate to the `client` folder
   ```bash
   cd client
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

<br/>

#### API setup

The `API` uses [npm](https://npmjs.com) as its package manager, it also uses [Express](https://expressjs.com/) as its web framework and [MongoDB](https://www.mongodb.com/) as its database.

**NOTE:** The `API` is hosted on [Render](https://render.com/) and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

1. Open your terminal inside the project's root directory
2. Make sure to have node installed, you can check by running
   ```bash
   node -v
   ```
   This should display your current node version if it's already installed.
   If you don't have [NodeJs](https://nodejs.org/) already installed follow the instructions [here](https://nodejs.org/en/download/)
3. Install [npm](https://docs.npmjs.com/about-npm), if you don't have npm installed follow the installation guide [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
4. Navigate to the `API` folder
   ```bash
   cd API
   ```
5. Install necessary dependencies, run
   ```bash
   npm install
   ```
6. There are different environments, each environment has an independent configuration file withing the `/API/src/` directory
   `.env` will be used when you use the `production` environment
   `.env.dev` will be used when you use the `dev` environment
   `.env.test` will be used when you use the `test` environment
   <br/>
   **NOTE:** The `.env.dev` file is used when you start the development server, you can change the environment variables in this file to suit your needs.
   The main environment variables required for starting up the API development server are:

- PORT: The port number the server will listen to
- MONGO_URI: The URI of the MongoDB database
  Other environment variables are optional, you can refer to the [Environment Setup Guide]() for more information.

7. To start the development server, run
   `bash
    npm run dev
    `
   You're all set, all http requests can be sent to http://localhost:5000, except you specify the PORT variable in the `.env.dev` file
   You can refer to the detailed guide in the [Environment Setup Guide]()

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

<button class="next"> <a href="./tutorial-changelog.html"> Next </a> <button>

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
