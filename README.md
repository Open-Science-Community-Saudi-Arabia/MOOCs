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
  <p align="center" style="font-size:30px; margin-top: 10px; margin-left: 10px">OSCCA</p>
</div>

<h1 align="center">Massive Open Online Courses (MOOCs) for Open Science in Arabic</h1>

<div align="center">
    Massive Open Online Courses (MOOCs) for Open Science in Arabic that include videos, MCQ questions and written resources!
</div>
<br />

<div align="center">
  <p align="center">
    <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs">View Demo</a>
    ·
    <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/issues">Report Bug</a>
    ·
    <a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/issues">Request Feature</a>
  </p>
</div>

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

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- You're all set. Happy coding😁

### Creating a production building

```bash
yarn build
```

## Things to note as you contribute

- Any page you code has to be responsive.
- Write clear and concise commit messages.
- Always run `yarn` after pulling code from the upstream repository.
- Always, **Always** make pull requests to the **dev** branch, not the main branch. All pull requests to the main branch will not be merged.
- Please, always test your code and make sure it works correctly before making a pull request
- Run `yarn format` to format your code before you commit
- Run `yarn lint` to lint all files in the frontend project directory

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="http://adedamolaorofin.web.app"><img src="https://avatars.githubusercontent.com/u/74486522?v=4?s=100" width="100px;" alt="Orofin Adedamola A."/><br /><sub><b>Orofin Adedamola A.</b></sub></a><br /><a href="#infra-Meekunn" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
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


