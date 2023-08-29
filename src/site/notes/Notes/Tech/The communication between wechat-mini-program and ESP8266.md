---
{"alias":"MQTT controlled Robot","info":"Control ESP8266-developed robot by wechat mini program via mqtt","date":"2023-08-28T14:07","update":"2023-08-29T16:17","tags":["note/2023/08","note/tech"],"id":"note20230828140740","dg-publish":true,"noteIcon":2,"permalink":"/notes/tech/the-communication-between-wechat-mini-program-and-esp-8266/","dgPassFrontmatter":true,"created":"2023-08-28T14:07","updated":"2023-08-29T16:17"}
---


用了大约一个月的时间做了一个ESP8266模块驱动的四足机器人，机器人的动作和屏幕显示主要参考了其他开源项目，但是这些项目往往依靠ESP8266本身创建Web服务进行控制，不方便缺乏技术基础的人使用，我开发了一个微信小程序利用MQTT通讯协议对机器人进行控制，在使用上方便了许多。

# Overview
![excalidraw](https://cdn.jsdelivr.net/gh/blleng/images/upload/202308281558287.svg)

# Features
该机器人主体部分基于ESP8266(nodemcu)模块开发，利用PCA9685舵机扩展板通过`PWM`库控制8个SG90舵机。
电源由两节并联的18650锂离子电池供电，用升压板将电压由3.7V升至约4.8V接入舵机扩展板。
屏幕为64x128的一块I2C协议OLED屏（SSD1306），利用`U8G2`库控制屏幕输出。
控制部分通过ESP8266的`WiFiMulti`库接入网络，利用`PubSubClient`库建立`mqtt`通讯。

利用MQTX可以在服务器上便捷地搭建MQTT服务，使用nginx为mqtt服务做反向代理，并添加ssl支持。为了让正式发布的小程序接入mqtt服务器，域名需要备案且将其加入合法域名。

小程序通过引入`mqtt.min.js`文件可以方便地加入mqtt支持。

# Open Source
整个项目当前已经基本完善，待代码整理清晰并加入注释后将开源。

[[Open Source/An ESP8266 robot controlled via wechat mini program\|An ESP8266 robot controlled via wechat mini program]]

# Showcase
## Robot

![robot1|300](https://cdn.jsdelivr.net/gh/blleng/images/upload/202308281529331.jpg)

![robot2|300](https://cdn.jsdelivr.net/gh/blleng/images/upload/202308281529333.jpg)

## Wechat Mini Program
![mini program|300](https://cdn.jsdelivr.net/gh/blleng/images/upload/202308281534048.jpg)
