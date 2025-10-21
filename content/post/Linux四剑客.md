---
title: Linux四剑客
description: 各自的用法
date: 2025-10-20
categories:
    - Test
    - 教程
---


Linux四剑客

1、find         查找文件、目录，find与其他命令配合

2、gerp/egrep   过滤

3、sed           过滤，替换，取行

4、awk           过滤，取行，取列，统计与计算



##### find

选项

-type                    类型f 文件d 目录

-iname                  文件名不区分大小写grep -i

-name                    指定文件名，默认精确匹配。加上*模糊

-size                       指定大小+10M -100k

-mtime                   根据时间查找

-maxdepth             查找最大深度



#### 案例01：找出/etc/目录下面以.conf结尾的文件

find /etc/ -type f -name '*.conf'

find  目录  类型 名字

find /etc/ -type f -name 'host*'       #以hosts开头

找出/bin/  /sbin/  文件中包含ip的文件

find /bin/ /sbin/ -type f -name "*ip"

#### 案例02：找出/etc/目录下以.conf结尾的文件文件大小大于10k

find /etc/ -type f -name "*.conf" -size +10k

#### 案例03：找出/var/log下面以.log结尾的文件并且修改时间大于3天

find /var/log/ -type f -name "*.log" -mtime +3

#### 案例04：查找文件或目录的时候不区分大小写

find /etc/ -type f -iname "*.conf"

#### 案例根据深度查找文件

find /etc/ -maxdepth 1 -type f -name "*.conf"



#### 案例05：find找出文件后进行删除

创建测试环境

mkdir  -p /app/logs/

touch /app/logs/access{01..10}.log

方法01：find与反引导

rm -f `find /app/logs/ -type f -name '*.log'`

方法02：find 管道

find /app/logs/ -type f -name "*.log" | xargs rm -f

| 与|xargs区别

|传递的是字符串，文字符号

|xargs传递是参数 命令后面文件，目录

方法03：find选项-exec

find -type f -name "*.log" -exec rm -f {} \;

-exec 命令 {} \;

{}前面find找出的文件内容

\;结尾标记



#### 案例06：找出/etc/下以.conf结尾的文件与打包压缩/backup/

方法01：find+反引号

tar zcf /backup/etc-conf.tar.gz  `find /etc/ -type f -name "*.conf"`

方法02：find |xargs

find /etc/ -type f -name "*.conf" |xargs tar zcf /backup/etc_conf.tar.gz

方法03：find -execf 

find /etc/ -type f -name "*.conf" -exec tar -zcf /backup/etc_conf.tar.gz {} \;

有坑，发现打包压缩后只有1个文件



find 与 -exe执行流程

find找出1个文件exec执行1次命令



find /etc/ -type f -name "*.conf" -exec tar zcf /backup/etc-exec.tar.gz {} +

+ 先执行前面命令执行完成，结果一次性通exec传递给后面命令







#### 特殊符号-重定向

##### 单引号、双引号、反引号、不加引号的区别

单引号：所见即所得，单引号里面的内容会原封不动输出，shell(bash)不会解析与运行

双引号：与单引号类似，特殊符号会被解析运行$,``,不会解析{}(通配符匹配文件名)

不加引号：与双引号类似，解析{}

反引号：优先执行，先运行引号里面的命令



#echo 'oldboy $LANG hostname{01..10}'| oldboy $LANG hostname {01..10}

#echo "oldboy $LANG hostname {01..10}"





##### 重定向符号 



> 或1>           标准输出重定向（正确信息），先清空，然后写入

> > 或1>>     标准输出追加重定向（正确信息），追加到文件末尾

2>                标准错误输出重定向（错误信息），先清空，然后写入

2>>              标准错误追加输出重定向（错误信息），追加到文件末尾

> > oldboy.txt 2>&1 &>>oldboy.txt               标准错误信息都写入到指定文件

 <或0<            输入重定向

<<或0<<           追加输入重定向



2>&1:将正确和错误的信息都输出，适用于日志文件

2>:只输出错误的信息















#### grep

-i       不区分大小写ignore case

-n       行号number

-v        取反，排除

--color       给过滤出的内容加上颜色

##### 案例04-过滤/etc/passwd中包含root的行

grep 'root' /etc/passwd

##### 案例05-过滤出/var/log/secure文件中包含failed的行（不区分大小写）

制造错误

cat >secure<<EOF

Failed password

failed password

Failed password

failED password

EOF

过滤

grep -i 'failed password' secure

过滤出并显示行号

grep -in 'failed password' secure

在/etc/ssh/sshd_config中过滤包含port的行并显示行号

grep -in 'port' /etc/ssh/sshd_config

在/etc/ssh/ssh_config中过滤包含permitrootlogin的行并显示行号

grep -in 'permitrootlogin' /etc/ssh/sshd_config

PermitRootLogin yes #准许root远程登录

















