<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- PROJECT LOGO -->

<div align="center" style="display:flex; align-items: center; justify-content: center" flex-direction="row">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/assets/54219127/c8c7ef37-0209-4a42-b395-2a7650a86724">
    <img src="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/assets/54219127/c8c7ef37-0209-4a42-b395-2a7650a86724" width="400" alt="Logo"/>
  </picture>
</div> 


<h1 align="center">Open Innovation For Open Science</h1>

<div align="center">
    Massive Open Online Courses (MOOCs) for Open Science in Arabic that include videos, MCQ questions and written resources!
</div>
<br />

<div align="center">
  <p align="center">
    <a href="https://moocs-documentation.netlify.app/"><strong>Explore the docs »</strong></a>
    <a href="https://documenter.getpostman.com/view/20633788/2s93JwMgmb"><strong>API Docs</strong></a>
    <br />
    <br />
    <a href="https://moocs-client.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/issues">Report Bug</a>
    ·
    <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/issues">Request Feature</a>
  </p>
</div>
<br/>

# Deployment
Frontend: https://moocs-client.netlify.app/  
API: https://documenter.getpostman.com/view/20633788/2s93JwMgmb

<br/>

# Technologies

### Frontend Technologies

| Technology         | Version | Use                  |
| ------------------ | ------- | -------------------- |
| `Prettier`         | v2.7.1  | Code Formatting      |
| `React`            | v18.2.0 | Frontend Framework   |
| `NodeJs`           | v14     | Environment          |
| `EsLint`           | v8.2.0  | Code Linting         |
| `Vite`             | v2.6.8  | Code Bundler         |

<br/>

### Backend Technologies

| Technology              | Version | Use                         |
| ----------------------- | ------- | --------------------------- |
| `NodeJS`                | v4.3    | Backend Environment         |
| `ExpressJS`             | v3.10   | Framework for building APIs |
| `MongoDB`               |    -    | Non-Relational Database     |

<br/>

# Contributing :two_hearts:
- If you like it, leave your star in this project :star2:
- If you would like to complain/suggest/contribute to this project, feel free to open a issue :heart_decoration:
- Please follow our [contributing guidelines](https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/blob/main/CONTRIBUTING.md).
- This is the guide to how the UI Design should look when implementing any frontend pages. [Click this link to see the figma design](https://www.figma.com/file/mkhBuJAS2arzy3wrbTZp2D/Simple-Landing-page-for-OSCSA%2C-with-Log-In-and-Sign-Up-Pages?node-id=0%3A1) 

<br/>

## Environment Setup

- Make sure you have nodejs installed by running the following command:

```bash
node -v
```

- If the output is not the version of your nodejs installation, install nodejs from [here](https://nodejs.org/en/download/)

<br/>

## Frontend Setup

- Open `Git Bash` terminal inside root project folder
- cd into the frontend folder by typing

```bash
cd client
```

- Install project dependencies, run the command:

```bash
yarn install
```

### To start the frontend application 

```bash
yarn dev
```

- Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
- You're all set. Happy coding😁

### Creating a production building

```bash
yarn build
```

### Checking formatting

- Run this script to check if all files meet prettier standard rules of formatting

```bash
yarn format:check
```

- Run this script to fix all auto-fixable formatting errors in the whole project

```bash
yarn format:fix
```

- Checking code syntax is in line with eslint rules

```bash
yarn lint:check
```

- Fix all auto-fixable syntax errors in the whole project

```bash
yarn lint:fix
```

## Things to note as you contribute
- Linting has been set up for staged commits in the repository.
- We're using `eslint` for js linting, and `prettier` for code formating.
- Please make it a point to install `eslint` and `prettier` plugins on vscode to aid in your coding process.
- Your code has to be properly formatted and have the correct syntax for you to be able to commit your changes.
- Make sure you attend to all warnings and errors before you commit your code.
- Any page you code has to be responsive.
- Write clear and concise commit messages.
- Always run `yarn` after pulling code from the upstream repository.
- Always, **Always** make pull requests to the **dev_team2** branch, not the `main` branch. All pull requests to the `main` branch will not be merged.
- Please, always test your code and make sure it works correctly before making a pull request
- Run `prettier --check "input name of file here"` to check if your code is well formatted before you commit
- Run `eslint input name of file here --color` to check if the files you edited con form to the standards required for this project


<br/>

## Backend Setup

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
  
<br/>

### START THE SERVER

- To start the whole application server

```bash
npm run dev
```

- Open your browser on localhost with the port you specified to see the result.
- You're all set and ready to code😁

  
<br/>

## License

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

<br/>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://adedamolaorofin.web.app"><img src="https://avatars.githubusercontent.com/u/74486522?v=4?s=100" width="100px;" alt="Orofin Adedamola A."/><br /><sub><b>Orofin Adedamola A.</b></sub></a><br /><a href="#infra-Meekunn" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#design-Meekunn" title="Design">🎨</a> <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/pulls?q=is%3Apr+reviewed-by%3AMeekunn" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://realrichi3.github.io"><img src="https://avatars.githubusercontent.com/u/76791916?v=4?s=100" width="100px;" alt="Richie"/><br /><sub><b>Richie</b></sub></a><br /><a href="#infra-RealRichi3" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-RealRichi3" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/pulls?q=is%3Apr+reviewed-by%3ARealRichi3" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://goodnewssandy.netlify.app/"><img src="https://avatars.githubusercontent.com/u/54219127?v=4?s=100" width="100px;" alt="Goodnews Sandy"/><br /><sub><b>Goodnews Sandy</b></sub></a><br /><a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/pulls?q=is%3Apr+reviewed-by%3Asandygudie" title="Reviewed Pull Requests">👀</a> <a href="#infra-sandygudie" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#mentoring-sandygudie" title="Mentoring">🧑‍🏫</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mufidat3250"><img src="https://avatars.githubusercontent.com/u/77861437?v=4?s=100" width="100px;" alt="Wahab Mufidat"/><br /><sub><b>Wahab Mufidat</b></sub></a><br /><a href="#design-mufidat3250" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/anslemkelechi"><img src="https://avatars.githubusercontent.com/u/47811347?v=4?s=100" width="100px;" alt="Kelechi Okoronkwo"/><br /><sub><b>Kelechi Okoronkwo</b></sub></a><br /><a href="#infra-anslemkelechi" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/oEbuka"><img src="https://avatars.githubusercontent.com/u/94439139?v=4?s=100" width="100px;" alt="Obiora Ebuka"/><br /><sub><b>Obiora Ebuka</b></sub></a><br /><a href="#infra-oEbuka" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://okereke.dev"><img src="https://avatars.githubusercontent.com/u/65835404?v=4?s=100" width="100px;" alt="Okereke Chinweotito"/><br /><sub><b>Okereke Chinweotito</b></sub></a><br /><a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/commits?author=okerekechinweotito" title="Tests">⚠️</a> <a href="#infra-okerekechinweotito" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AminMusah"><img src="https://avatars.githubusercontent.com/u/60413409?v=4?s=100" width="100px;" alt="Amin Musah Ahmed"/><br /><sub><b>Amin Musah Ahmed</b></sub></a><br /><a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/issues?q=author%3AAminMusah" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://julianasau.vercel.app"><img src="https://avatars.githubusercontent.com/u/49183775?v=4?s=100" width="100px;" alt="Juliana Sau "/><br /><sub><b>Juliana Sau </b></sub></a><br /><a href="#infra-JulianaSau" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-JulianaSau" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ORIYOMI289"><img src="https://avatars.githubusercontent.com/u/63899878?v=4?s=100" width="100px;" alt="JewelCodes"/><br /><sub><b>JewelCodes</b></sub></a><br /><a href="#infra-ORIYOMI289" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://batool-almarzouq.netlify.app/"><img src="https://avatars.githubusercontent.com/u/53487593?v=4?s=100" width="100px;" alt="Batool Almarzouq"/><br /><sub><b>Batool Almarzouq</b></sub></a><br /><a href="#mentoring-BatoolMM" title="Mentoring">🧑‍🏫</a> <a href="#question-BatoolMM" title="Answering Questions">💬</a> <a href="#translation-BatoolMM" title="Translation">🌍</a> <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/pulls?q=is%3Apr+reviewed-by%3ABatoolMM" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/alswajiab"><img src="https://avatars.githubusercontent.com/u/42093749?v=4?s=100" width="100px;" alt="Abdulrahman Alswaji"/><br /><sub><b>Abdulrahman Alswaji</b></sub></a><br /><a href="#ideas-alswajiab" title="Ideas, Planning, & Feedback">🤔</a> <a href="#mentoring-alswajiab" title="Mentoring">🧑‍🏫</a></td>
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


