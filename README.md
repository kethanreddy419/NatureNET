# How to develop
## initialization
Run the followings:
```
git clone git@github.com:jaejin0/nature-net.git
```

## during development
### create 
```
git fetch
git checkout -b <feature name> dev
```
### start developing the feature
```
git add .
git commit -m "<commit message>"
git push -u origin <feature name>
```
### once the feature is finished
```
git checkout dev
git merge <feature name>
git push -u origin dev
```