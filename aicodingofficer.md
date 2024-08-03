---
layout: page
title: AI Coding Officer
subtitle: AI coding officer, make coding ease.
---

![AI Coding Officer screenshot](/assets/img/AICO-logo.png){:height="" width="300px" style="display: block; margin: 0 auto" }

<p align="center">
    <div align="center">
        <img src="https://img.shields.io/github/license/etShaw-zh/AICodingAssistant-Pro?color=2E75B6"  alt="License">
        <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-2E75B6"  alt="Platform">
        <img src="https://img.shields.io/github/v/release/etShaw-zh/AICodingAssistant-Pro?color=2E75B6"  alt="Release">
        <img src="https://img.shields.io/github/downloads/etShaw-zh/AICodingAssistant-Pro/total?color=2E75B6"  alt="Downloads">
        <img src='https://readthedocs.org/projects/aicodingassistant-pro/badge/?version=latest' alt='Docs' />
    </div>
</p>

#### Introduction
AICO is a cutting-edge artificial intelligence coding assistant, designed to enhance the efficiency of text encoding.
- **AI**: Stands for "Artificial Intelligence", emphasizing the intelligent features of the tool.
- **CO**: Stands for "Coding Officer", indicating that AICO is a professional coding assistant capable of executing and unsupervising encoding tasks.

#### Screenshots

<style>
    .slideshow-container {
        position: relative;
        max-width: 1000px;
        margin: auto;
    }
    .slides {
        display: none;
    }
    .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: auto;
        padding: 16px;
        margin-top: -22px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
        user-select: none;
    }
    .next {
        right: 0;
        border-radius: 3px 0 0 3px;
    }
    .prev:hover, .next:hover {
        background-color: rgba(0,0,0,0.8);
    }
    .text {
        color: #f10404;
        font-weight: bold;
        font-size: 24px;
        padding: 8px 12px;
        position: absolute;
        bottom: 50px;
        width: 100%;
        text-align: center;
    }
    .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
    }
    .active, .dot:hover {
        background-color: #717171;
    }
</style>

<div class="slideshow-container">
    <div class="slides">
        <img src="/assets/img/screenshot_2.png" style="width:800px;height: 400px;">
        <div class="text">Automatic Encoding</div>
    </div>
    <div class="slides">
        <img src="/assets/img/screenshot.jpg" style="width:800px;height: 400px;">
        <div class="text">Manual Encoding</div>
    </div>
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>
<div style="text-align:center">
    <span class="dot" onclick="currentSlide(1)"></span> 
    <span class="dot" onclick="currentSlide(2)"></span> 
</div>

<script>
    let slideIndex = 0;
    showSlides();

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("slides");
        let dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active";
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }
</script>

<!-- ![AI Coding Officer screenshot 2](/assets/img/screenshot_2.png){:height="400px" width="600px" style="display: block; margin: 0 auto" }

![AI Coding Officer screenshot](/assets/img/screenshot.jpg){:height="400px" width="600px" style="display: block; margin: 0 auto" } -->

#### Core Values

- **Intelligence**: AICO utilizes Large Language Models (LLMs) technology to provide intelligent coding solutions.
- **Efficiency**: By automating and optimizing the coding process, AICO increases the speed of scientific research work.
- **Reliability**: AICO's algorithms ensure the accuracy and reliability of the encoding.

#### Target Users

- Researchers
- Data Scientists
- Educators
- Any professionals in need of efficient text encoding support

#### Features

- Multi-language support
- Customizable encoding rules
- User-friendly interface

#### Installation

##### Windows

1. Download the installation package: [AICodingOfficer_windows.zip](https://github.com/etShaw-zh/AICodingAssistant-Pro/releases)
2. Unzip the installation package
3. Run `AICodingOfficer.exe`

##### macOS

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

#### Learn More

##### User and Developer Guide

⚠️Document: [AICO DOCUMENT](https://aicodingassistant-pro.readthedocs.io/en/latest/index.html)

##### Contact Information

- **WeChat:** etshaw8888

- **Personal Homepage:** https://xiaojianjun.cn 

- **WeChat Official Account:** EdTech肖建军

- **Email:** et_shaw@126.com

- **Address:** Room 1005A, Block C, Science and Technology Building, Beijing Normal University

![my info](/assets/img//shaw.png){:height="200px" width="400px" style="display: block; margin: 0 auto" }
