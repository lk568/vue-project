准备开始vue尚品汇项目，lk拉取并修改了代码

拉取/提交代码：（先拉再推）

第一次拉取：
git clone 仓库地址

拉取并同步代码：
git fetch #拉取所有
git reset --hard master #同步代码到本地
git pull #拉取并合并

修改后提交代码：
git commit -a -m "tip-info" #相当于add + commit
git push #推送代码

将代码提交到不同仓库：
1.添加远程仓库
git remote -v 查看当前关联仓库
2.git push origin [分支名称]将更改推送到Gitee仓库的分支，
  git push github [分支名称]将更改推送到GitHub仓库的master分支
  将[分支名称]替换为您要推送的分支的名称。
3.请确保在切换仓库之前将所有更改推送到当前目标仓库，并进行适当的代码同步和冲突解决，以避免不一致的代码状态
