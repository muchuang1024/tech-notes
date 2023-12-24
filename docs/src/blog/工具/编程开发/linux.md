# Linux

## 文本处理

### awk

* `cat <file> | awk -F ',' 'BEGIN{print "字段1","字段2"} { print }'` 输出表头
* `cat <file> | awk -F ',' '{OFS=","; print $2,$1,0}` 每一行逗号拼接字符串
* `cat <file> | awk 'BEGIN{ORS=","}{ print }` 逗号连接多行
* `cat <file> | awk 'BEGIN{RS=","}{ print }`  逗号分隔字符串
* `cat <file> | awk -F ',' '{ print NR, NF }'` 查看行数、列数
* `cat <file> | awk -F ',' '{count[$1]++} END {for(k in count) print k,count[k]}'` 统计
* `cat <file> | awk -F ',' '{ sum += $7; if (min == "") min = max = $7; if ($7 > max) max = $7; if ($7 < min) min = $7 } END { print max, sum/NR, min }'` 计算最大值、最小值、平均值 

### grep

* `grep -v "match_pattern" <file>` 输出除了什么之外
* `grep -c "match_pattern" <file>` 输出包含字符行数
* `grep "match_pattern" . -r -n ` 递归搜索文件
* `grep -E "pattern1|pattern2" <file>` 匹配多个样式
* `grep -F -v -f a.file b.file` 查询b-a差集

### find

* `find . -type f -atime -7` 最近7天内被访问过的文件
* `find . -type f -atime 7`  7天前被访问过的文件
* `find . -type f -atime +7` 超过7天内被访问的文件
* `find . -type f -name "*.txt" -delete` 删除当前目录*.txt
* `find . -name "*.txt" -o -name "*.pdf"` 获取多种后缀名文件


### sort

* `cat <file> | sort -t ',' -k 2 -rn` 文件逗号分隔，按照第2列纯数字逆序排序输出

### sed

* `sed '/^$/d' <file>` 删除空白行
* `sed '2d' <file>` 删除文件第2行
* `sed '2,$d' file` 删除文件第2到末尾所有行
* `sed '$d' file` 删除文件最后一行
* `sed 's/book/books/g' <file>` 替换文件的所有字符串
* `sed 's/book/books/2g' <file>` 从第N处匹配开始替换时替换文件的所有字符串
* `sed 's/,/\n/g' <file>` 替换换行符
* `sed -i '1i\<content>' <file>` 第1行插入  
* `sed -i '/^INFO/'d <file>` 删除以INFO开头的文件

### ls

* `ls station_[0-9a-z]*_orders.txt` 查看文件 
* `ls -l | grep "^d"` 只查看文件夹

### uniq

* `cat <file1> <file2> | sort | uniq -u` 求文本差集
* `sort <file> | uniq -c` 计算行重复的次数
* `sort <file> | uniq -d` 仅显示重复行
* `sort <file> | uniq -u` 仅显示不重复行  

### tr

* `cat <file> | tr a-z A-Z` 小写转大写
* `cat <file> | tr "," "\t"` 逗号分隔符转tab 


### cut

* `echo $PATH | cut -d ':' -f 3,5` 提取第3和第5列

### wc

* `wc -l` 计算行数
* `wc -w` 计算单词数
* `wc -m` 计算字节数

### zip

* `zip -r <file>.zip <file>`  
* `unzip <file>.zip`


### tar

* `tar -czvf file.gz <file>` 压缩
* `tar --exclude=<dir>/1.txt -czvf file.gz <dir>` 排除文件排除1.txt压缩
* `tar -tzvf file.gz` 列出压缩文件列表
* `tar -xzvf file.gz` 解压

### rsync

需要复制本机ssh公钥到远程机器

```
cat ~/.ssh/id_rsa.pub >> authorized_keys
```

* `rsync --bwlimit=10000 -artP <file> -e 'ssh -p <port>' root@<ip>:<target_path>` 从本地传输文件到远程机器
* `rsync --bwlimit=10000 -artP -e 'ssh -p <port>' root@<ip>:<source_path> ./` 从远程机器拉取文件到本地

## 系统状态

### 负载

* `top`
* `uptime` 

### CPU

* `mpstat -P ALL` cpu各核使用率

### 内存

* `vmstat`
* `free`

### 网络

* `ss` 
* `ifstat` 网络io统计
* `netstat -nat | grep <port>` 指定端口的网络连接数
* `netstat -nat|awk '{print $6}'|sort|uniq -c|sort -rn` 网络连接各状态统计

### 磁盘

* `iostat` 磁盘io统计
* `iotop -o` 磁盘io占用top 
* `du -sh ./* | sort -rn | head -n 10` 磁盘空间占用top10的文件

### 进程

* `pidstat`
* `ps aux head -1; ps aux | sort -rn -k3 | head -n 10` cpu占用top10的进程
* `ps aux head -1; ps aux | sort -rn -k4 | head -n 10` 内存占用top10的进程
* `pidstat -d <时间间隔> -p <进程id>` 进程占用磁盘io
* `iftop`
* `nethogs` 进程带宽

### 线程

* `ps hH p | grep <pid>` 查看进程的线程

## 系统监控

### 进程内存监控

```
# !/bin/sh
# 内存是$4，cpu是$3，$2是进程号，内存>5%
pids=ps aux | grep <progress> | grep -v grep | awk '{if($4>=5)print $2}' 
for pid in pids; 
   do kill -9 $pid echo date +'%F %T' $pid >>/var/log/kill.log 
done
```

### 网络带宽监控

```

```

### 磁盘空间监控

```
#!/bin/sh 

diskinfo="/tmp/diskinfo.txt"
for d in `df -P | grep /dev | awk '{print $5}'| sed 's/%//g'`
do
    if [ $d -gt 90 ];then
        df -h>>$diskinfo;
        #sendmail
        mutt -s "disk warining!" "1399534656@qq.com" <${diskinfo} -a ${diskinfo}
        exit 0;
    fi
done
``` 

## 性能排查

排查引起系统变慢/网络超时的原因

### cpu高

### 内存高

### 网络带宽高

### 磁盘IO高

### GC耗时高
