## How to develop
### initialization
Run the followings:
```
git clone git@github.com:jaejin0/nature-net.git
```

### during development
```
git checkout -b <feature name>
git fetch
```
### start developing the feature
```
git add .
git commit -m "<commit message>"
git push -u origin <feature name>

git checkout main
git merge <feature name>
```