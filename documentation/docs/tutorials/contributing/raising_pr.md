## Introduction
A pull request is a way for contributors to submit changes to a project maintained by others. The changes are proposed and then reviewed and potentially merged by the project maintainers. In this guide, we will walk you through the steps of making a pull request to the Open-Science-Community-Saudi-Arabia/MOOCs repository on GitHub.

## Steps
1. Find a feature or bug that you want to work on.
2. Fork the Open-Science-Community-Saudi-Arabia/MOOCs repository to your GitHub account.
3. Clone the forked repository on your local machine.

    ```bash
    git clone https://github.com/<your-github-username>/Open-Science-Community-Saudi-Arabia/MOOCs/
    ```

4. Sync the fork, to avoid merge conflicts.

    ```bash
    git remote add upstream https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/
    git fetch upstream
    git pull upstream main
    git push
    ```

5. Create a new branch with your GitHub username as its name.

    ```bash
    git checkout -b <your-github-username>
    ```
    It is not mandatory to name the new branch with your GitHub username, but it is a good practice to do so, as long as the name of the branch is clear and concise, you can name it whatever you want.
6. Make your changes on this new branch.
7. Commit your changes with a clear commit message.

    ```bash
    git add .
    git commit -m "Clear and concise commit message"
    ```

8. Push your changes to your forked repository.

    ```bash
    git push origin <your-github-username>
    ```

9. Go to the Open-Science-Community-Saudi-Arabia/MOOCs repository on GitHub, and you should see a message suggesting to create a new pull request. Click on it.
10. Add a clear and concise title and description for your pull request, explaining the changes you made.
11. Submit your pull request, and wait for the maintainers to review your changes.

Congratulations! You've just made a pull request to the Open-Science-Community-Saudi-Arabia/MOOCs repository.
