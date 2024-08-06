---
layout: page
title: Quickstart
subtitle: A quickstart guide to using AICO
---

----------
<p align="center" style="font-weight: bold;">
    English | <a target="_blank"  href="https://aicodingassistant-pro.readthedocs.io/en/latest/index.html">简体中文</a>
</p>

---------
#### **Installation**

##### **Windows**

1. Download the installation package: [AICodingOfficer_windows.zip](https://github.com/etShaw-zh/AICodingAssistant-Pro/releases)
2. Unzip the installation package
3. Run `AICodingOfficer.exe`

##### **macOS**

1. Download the installation package: [AICodingOfficer_macOS.zip](https://github.com/etShaw-zh/AICodingAssistant-Pro/releases)
2. Unzip the installation package
3. Run `AICodingOfficer.app`

    ⚠️  Solving the issue of "Application 'xxx' cannot be opened" on Mac

    - First, right-click on the application and select 'Show Package Contents'
    - Then, expand 'Contents' - 'MacOS', find the corresponding file AICodingOfficer
    - Next, open the terminal and enter the following code (note that there are spaces before and after +x):
        
        ```shell
        chmod +x
        ```
        
    - Then drag the file AICodingOfficer into the terminal (to input the complete execution path). The complete command is as follows:
        
        ```shell
        chmod +x /Users/xiaojianjun/Downloads/AICodingOfficer.app/Contents/MacOS/AICodingOfficer
        ```

    - Finally, press Enter. At this point, the file that was originally of unknown type in Finder has now become a Unix executable file, and the icon has also become normal.
    - Reopen the downloaded software, and you will find that the downloaded program can be used and executed normally!
    - If it still cannot be opened, go to Settings, Security & Privacy, find the prompt information, and click to run and open it.

    📖  Tutorial: [How to solve the issue of "Application 'xxx' cannot be opened" on macOS](https://sspai.com/post/52828#!) 

---------
#### **How to use**

##### **1. At the beginning of coding, you need to prepare the following data**

###### 1.1 API_key:

- Apply for an API_key to call the encoding interface.

- Application address: [Kimi Open Platform](https://platform.moonshot.cn/docs)

- API_key viewing address: [Kimi API key console](https://platform.moonshot.cn/console/api-keys)

- API_key example: sk-DA...xf13S

###### 1.2 Text data:

* Topic and Reply data, as well as Coding_scheme.

* Topic is the topic of the text to be encoded, and Reply is the reply under the topic.

* Coding_scheme is the encoding rule that guides AICO to encode.

* Download link for example data: [Example data](/assets/example/example.zip)

    - topic.csv: Topic data

        | 字段          | 类型 | 描述                             |
        |---------------|------|----------------------------------|
        | index         | int  | 待编码文本的唯一标识符，是回帖ID |
        | user_id       | int  | 回帖的用户ID                     |
        | user_name     | str  | 回帖的用户昵称                   |
        | reply_content | str  | 回帖内容                         |
        | topic_id      | int  | 回帖的话题ID                     |
        | reply_id      | int  | 回帖ID                           |
        | to_reply_id   | int  | 回帖的父级回帖ID                 |
        | reason        | str  | 编码理由，这一列可以空着         |

    - reply.csv: Reply data

        | 字段          | 类型 | 描述                                       |
        |---------------|------|--------------------------------------------|
        | topic_id      | int  | 话题ID                                     |
        | topic_title   | str  | 话题标题                                   |
        | topic_content | str  | 话题内容，一半是话题的详细描述，这里可以空着 |

    - coding_scheme.csv: Coding scheme

        | 字段        | 类型 | 描述                               |
        |-------------|------|------------------------------------|
        | category    | str  | 编码分类                           |
        | code        | str  | 编码指标代码                       |
        | indicators  | str  | 编码指标                           |
        | example     | str  | 指标的示例（这一列可以不要）       |

##### **2. After preparing the data, open AICO**

###### 2.1 Fill in the API_key:
- Open the settings and fill in the API_key.

###### 2.2 Import data:

- Import the topic, reply, and coding_scheme csv files into AICO.

- Click 'Load data' to load the data.

##### 3. Test or batch encode

- Click 'Test encoding', AICO will automatically call the API to encode the first 10 data.

- Click 'Batch encoding', AICO will automatically call the API to encode all data.

##### 4. Export encoding results
- Click 'Export results', AICO will display the encoding results in the interface.

- Macbook will automatically open the exported CSV file, while Windows requires manual opening.

    | 字段              | 类型 | 描述                                       |
    |-------------------|------|--------------------------------------------|
    | user_id           | int  | 回帖的用户ID                               |
    | user_name         | str  | 回帖的用户昵称                             |
    | reply_content     | str  | 回帖内容                                   |
    | topic_id          | int  | 回帖的话题ID                               |
    | reply_id          | int  | 回帖ID                                     |
    | to_reply_id       | int  | 回帖的父级回帖ID                           |
    | reason            | str  | 编码理由                                   |
    | code_indicator 1  | int  | 0或1，1表示这一条回帖中包含了编码指标1     |
    | code_indicator 2  | int  | 0或1，1表示这一条回帖中包含了编码指标2     |
    | ...               | int  | 0或1，1表示这一条回帖中包含了编码指标...   |
    | code_indicator n  | int  | 0或1，1表示这一条回帖中包含了编码指标n     |