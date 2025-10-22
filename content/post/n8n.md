---
title: n8n
description: 自动工作流程
date: 2025-10-21
categories:
    - Test
    - 教程
---

#### 直接本地部署n8n

先下载`node`

`win+R`  输 `cmd`

打开管理员权限，切换到淘宝镜像源
{{< highlight html >}}
npm config set registry https://registry.npmmirror.com
{{< /highlight >}}

输入    `npx n8n`  ，安装好之后每次打开都要重新用这个命令

等待下载成功

等待安装结束。如果最终出现类似 `n8n ready on http://localhost:5678`的提示，说明安装成功，可直接访问该地址使用。



#### 使用Docker部署n8n

使用Docker部署n8n是最推荐和最便捷的方式，因为他提供了环境隔离和易于管理的优势。

##### 基本部署步骤：
 
  1、安装Docker：确保你的服务器上已经安装了`Docker和Docker Compose`.

  2、创建数据卷：为了持久化n8n的数据，建议创建一个Docker数据卷。
 {{< highlight html >}}
 docker volume create n8n_data
 {{< /highlight >}}
   
 3、运行n8n容器：使用一下命令运行n8n容器。
 
 {{< highlight html >}}
 docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
 {{< /highlight >}}



   1、`-it`:交互式运行

   2、`--rm`:容器停止后自动删除

   3、`--name n8n`：为容器指定名称

   4、`-p 5678:5678` :将主机的5678端口映射到容器的5678端口

   5、`-v n8n_data:/home/node/.n8n`:将`n8n_data`数据卷挂载到容器内部n8n存储数据的路径

   6、`docker.n8n.io/n8nio/n8n` : n8n官方Docker镜像

4、访问n8n界面：部署成功后，通过浏览器访问`http://localhost:5678` (如果部署在远程服务器，请将localhost 替换为服务器IP地址)

5、
第1步：停止所有可能存在的旧容器（以防万一）
 
 虽然你的容器已经被删除了，但养成一个好习惯总没错。如果万一之前有其他叫 n8n 的容器卡住了，先清理掉它。
 
 {{< highlight html >}}
 docker stop n8n
 {{< /highlight >}}

 如果容器不存在，它会报错，没关系，继续下一步。

第2步：用正确的命令重新启动 n8n
 
 使用下面的命令，它包含了之前所有的核心参数，但移除了 --rm，并添加了 -d。


 {{< highlight html >}}
 docker run -d --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
 {{< /highlight >}}

 Docker 返回了一长串字符 faeb14a55b7f1...，这是你的新创建的容器的 唯一ID (Container ID)。然后命令行立刻返回到了,这表明 `docker run `命令已经成功完成，而你的 `n8n`

 命令解释：

 `-d: Detached mode` (分离模式)。这是关键！它会让容器在后台运行，你的命令行窗口会立刻返回，你可以继续做其他事情，而 n8n 服务会一直在后台为你工作。
 
 `--name n8n`: 给容器起名为 `n8n`。
 
 `-p 5678:5678`: 端口映射，保证你能访问。
 
 `-v n8n_data:/home/node/.n8n`: 数据持久化，保证你的数据不丢失。
 
 `docker.n8n.io/n8nio/n8n`: 镜像名称。
 
 运行这个命令后，你会立刻回到命令行提示符，而 n8n 已经在后台启动了。

第3步：验证 n8n 是否正在运行
 
 现在，运行以下命令来检查：
 {{< highlight html >}}
 docker ps
 {{< /highlight >}}

 你应该会看到类似下面的输出，这证明你的 n8n 容器正在后台运行：

{{< highlight html >}}
CONTAINER ID   IMAGE                               COMMAND                  CREATED         STATUS         
PORTS                    NAMES
xxxxxxxxxxxx   docker.n8n.io/n8nio/n8n:latest      "docker-entrypoint.s…"   5 seconds ago   Up 4 seconds   0.0.0.0:5678->5678/
tcp   n8n
STATUS 一列显示 Up X seconds，表示容器正在运行。
NAMES 一列显示 n8n，说明你成功启动了那个容器。
{{< /highlight >}}
第4步：从此以后，如何管理你的 n8n？

现在你有了一个稳定运行在后台的容器，以后的管理就非常简单了：

查看 n8n 日志 (非常有用，能看到运行状态和错误):

{{< highlight html >}}
docker logs n8n
{{< /highlight >}}

如果想实时跟踪日志（就像你第一次看到的那样），加上 -f：
{{< highlight html >}}
docker logs -f n8n
{{< /highlight >}}

停止 n8n:
{{< highlight html >}}
docker stop n8n
{{< /highlight >}}

执行后，n8n 服务会停止，但容器本身还存在，数据也还在。

重新启动 n8n (如果它被停止了):
{{< highlight html >}}
docker start n8n
{{< /highlight >}}

升级 n8n (如果想升级到新版本):

先停止容器：

`docker stop n8n`

删除旧容器：

`docker rm n8n`

用新的镜像名重新运行（比如 n8nio/n8n:latest）：

`docker run -d --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n`

















#### 使用Docker Compose部署n8n

 1、创建 `docker-compose.yml`文件：
 {{< highlight html >}}
 version: '3.8'

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=user
      - N8N_BASIC_AUTH_PASSWORD=password
      - N8N_EDITOR_BASE_URL=http://localhost:5678/ # 根据实际情况修改
      - GENERIC_TIMEZONE=Asia/Shanghai # 设置时区
      - TZ=Asia/Shanghai # 设置时区
      # - N8N_EMAIL_MODE=smtp # 邮件配置示例
      # - N8N_SMTP_HOST=smtp.example.com
      # - N8N_SMTP_PORT=587
      # - N8N_SMTP_USER=your_email@example.com
      # - N8N_SMTP_PASS=your_email_password
      # - N8N_SMTP_SENDER=your_email@example.com

volumes:
  n8n_data:

 {{< /highlight >}}
 
 1、可以根据需要添加环境变量，例如设置用户名密码、时区、邮件服务等

 2、启动服务：在`docker-compose.yml`文件所在目录执行
 {{< highlight html >}}
 docker-compose up -d
 {{< /highlight >}}

##### 使用Docker Compose部署汉化版本

直接在 docker-compose.yml 文件中配置汉化：
{{< highlight html >}}
version: '3.8'

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
      - ./editor-ui:/usr/local/lib/node_modules/n8n/dist/packages/editor-ui/dist
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=user
      - N8N_BASIC_AUTH_PASSWORD=password
      - N8N_EDITOR_BASE_URL=http://localhost:5678/
      - GENERIC_TIMEZONE=Asia/Shanghai

volumes:
  n8n_data:

{{< /highlight >}}

汉化注意事项

版本匹配：确保下载的汉化包版本与你使用的 n8n 版本匹配，否则可能会导致界面显示异常。

升级时的处理：在升级 n8n 版本时，需要重新下载对应版本的汉化包并替换原有的汉化文件。

权限问题：如果遇到权限问题，可能需要调整汉化文件的权限：
 {{< highlight html >}}
 chmod -R 755 ./editor-ui
 {{< /highlight >}}

使用官方国际化：随着 n8n 的发展，官方可能会增加对中文的支持，届时可以直接使用官方的国际化方案，无需手动汉化。










部署 `unclecode/crawl4ai`，需按拉取镜像→配置运行→访问使用的流程操作
{{< highlight html >}}
docker pull unclecode/crawl4ai:all-amd64
{{< /highlight >}}

先检查本地是否已存在 `crawl4ai:all-amd64 `镜像：
{{< highlight html >}}
docker images | grep crawl4ai
{{< /highlight >}}
若能看到 unclecode/crawl4ai 且标签为 all-amd64，则镜像拉取成功。













#### crawl4ai

部署 `unclecode/crawl4ai`，需按拉取镜像→配置运行→访问使用的流程操作
{{< highlight html >}}
docker pull unclecode/crawl4ai:all-amd64
{{< /highlight >}}

先检查本地是否已存在 `crawl4ai:all-amd64 `镜像：
{{< highlight html >}}
docker images | grep crawl4ai
{{< /highlight >}}
若能看到 unclecode/crawl4ai 且标签为 all-amd64，则镜像拉取成功。

 是 LLM 友好的爬虫工具，需配置端口、LLM 密钥、数据持久化等参数，命令如下：
{{< highlight html >}}
# 提前创建本地数据目录（用于持久化爬虫结果、配置）
mkdir -p ./crawl4ai-data

# 启动容器（替换 YOUR_OPENAI_KEY 为实际密钥，若用其他 LLM 需调整环境变量）
docker run -d \
  -p 3000:3000 \  # 端口映射，本地访问 http://localhost:3000
  -e OPENAI_API_KEY=YOUR_OPENAI_KEY \  # LLM 密钥（必填，用于 AI 相关功能）
  -v ./crawl4ai-data:/app/data \  # 挂载本地目录，持久化数据
  unclecode/crawl4ai:all-amd64
{{< /highlight >}}

访问并使用 `crawl4ai`

容器启动后，打开浏览器访问：

http://localhost:3000

即可进入 `crawl4ai` 的 `Web` 界面，按以下流程开始使用：

配置爬虫任务：输入目标网站 URL、爬取规则（如允许的域名、深度）。

关联 LLM 能力：利用内置的 AI 功能（如内容提取、表格识别、文本总结）。

启动爬取：点击 “开始” 按钮，任务结果会存储在本地 `./crawl4ai-data` 目录中。


#### RSSHub

[官网网址](https://docs.rsshub.app)

步骤 1：确认 Docker Desktop 是否启动并正常运行

 打开Docker Desktop应用，检查其是否处于 “运行中” 状态。如果未启动，启动它；如果处于异常状态（如卡住、报错），尝试重启 Docker Desktop。

步骤 2：确认容器模式为 “Linux 容器”

RSSHub 的镜像基于 Linux 系统，需确保 Docker Desktop 的容器模式为Linux 容器（而非 Windows 容器）。
 
 在 Docker Desktop 右下角图标上右键，选择 **“Switch to Linux Containers...”**（如果当前是 Windows 容器模式），完成切换后重启 Docker Desktop。

步骤 3：重启 Docker 服务
 
 按下Win+R，输入services.msc，找到 **“Docker Desktop Service”，右键选择“重启”**。

步骤 4：再次执行docker-compose up -d

重启 Docker 服务后，回到 PowerShell（确保路径仍为D:\RSSHub\rsshub），再次执行命令：

`docker-compose up -d`















