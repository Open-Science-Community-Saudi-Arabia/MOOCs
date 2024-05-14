
# Contributing Guide

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
- Run `eslint <<name of file here>>` to check if the files you edited conforms to the standards required for this project


<br/>
