## Intialization

```
git clone git@github.com:jaejin0/nature-net.git
git switch main
git switch dev
```

## Development Process

> We want to stablize development process using feature branch, pull request, and merge

##### branches
* main: stable product branch after testing
* dev: default branch for development (we will develop in this branch)

> We create new feature branches and merge to the dev branch


### creating new feature branch
This is to start developing a new feature to the product.

commands to create new feature branch:
```
git fetch
git checkout -b <feature name> dev
```

***Now you develop the feature!***

### committing to the feature branch

commands to commit to the remote branch:
```
git add .
git commit -m "<commit message>"
git push -u origin <feature name>
```

> let's commit small and often

### once the feature is finished

1. go to our GitHub repository
2. go to Pull requests tab
3. click New pull request
4. set **base: dev** and **compare: feature branch**
5. click Create pull request

If there is *merge conflicts* we can resolve as a team. If not, review can be done quick.

### deleting done feature branch
After merging, we can delete the feature branch

to delete remote branch:
```
git push origin --delete <feature name>
```

to delete local branch:
```
git checkout dev
git branch -d <feature name>
```

## Project Proposal
<https://docs.google.com/document/d/1YZhjfzQi5ABrWiJPdZvmdrJAMHeV-FYAyagqCvLjt8g/edit?usp=sharing>