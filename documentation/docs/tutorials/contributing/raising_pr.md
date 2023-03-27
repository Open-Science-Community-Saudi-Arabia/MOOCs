2. Fork the [Open-Science-Community-Saudi-Arabia/MOOCs](https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/) to your GitHub account.

3. Clone the forked repository on your local machine.

```bash

git clone https://github.com/<your-github-username>/Open-Science-Community-Saudi-Arabia/MOOCs/

```

4. Sync the fork, to avoid merge conflicts.

````bash
    git remote add upstream https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs/
    git fetch upstream
    git pull upstream main
    git push
````
5. Create a new branch with your github username as its name.

```bash

    git checkout -b <your-github-username>

```