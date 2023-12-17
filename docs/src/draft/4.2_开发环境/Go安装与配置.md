# 安装

## Mac 下安装

可以通过 brew 方式安装，也可以直接在官网下载可执行文件，然后双击安装包，不停下一步就可以了

## Linux 下安装

下载安装包：

wget https://golang.google.cn/dl/go1.16.6.linux-amd64.tar.gz
解压到 /usr/local 目录：

sudo tar -zxvf go1.16.6.linux-amd64.tar.gz -C /usr/local

## 配置

设置国内镜像

go env -w GOPROXY=https://goproxy.cn,direct

查看 go环境变量

go env

## 使用

 go get github.com/gomodule/redigo@latest

 go get github.com/gomodule/redigo@commit_id
