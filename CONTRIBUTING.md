# Contributing Guidelines:

We welcome all contributions to the Open Science Community in Saudi Arabia. The contribution can be a [issue report](https://github.com/Open-Science-Community-Saudi-Arabia/Open-Science-Community-in-Saudi/issues) 
or a [pull request](https://github.com/Open-Science-Community-Saudi-Arabia/Open-Science-Community-in-Saudi/pulls).

## Contribution workflow:

1. Check that there isn't [already an issue](https://github.com/Open-Science-Community-Saudi-Arabia/Open-Science-Community-in-Saudi/issues) about your idea to avoid duplicating work.
    * If there isn't one already, please create one so that others know you're working on this

2. Fork the [Open-Science-Community-Saudi-Arabia/Open-Science-Community-in-Saudi](https://github.com/Open-Science-Community-Saudi-Arabia/Open-Science-Community-in-Saudi/) to your GitHub account.

3. Clone the forked repository on your local machine.

 ```bash
 
 git clone https://github.com/<your-github-username>/Open-Science-Community-in-Saudi.git
 
 ```
4. Sync the fork, to avoid merge conflicts. 

```bash

    git remote add upstream https://github.com/Open-Science-Community-Saudi-Arabia/Open-Science-Community-in-Saudi.git
    git fetch upstream
    git pull upstream master
    git push
    
```

5. Create a new branch with your github username as its name.

 ```bash
 
    git checkout -b <your-github-username>
    
 ```

6. Make the necessary changes / additions within your forked repository.

7. Add and commit changes made.

 ```bash
 
    git add .
    git commit -m "commit message"
    
 ```
8. Push the changes to forked repository.

 ```bash
 
    git push origin <branch-name>
    
 ```

9. Submit a Pull Request against the `master` branch and wait for the code to be reviewed and merged.

If you're not used to this workflow with git, you can start with some [basic docs from GitHub](https://help.github.com/articles/fork-a-repo/).
