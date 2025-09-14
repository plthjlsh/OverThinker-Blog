---
title: "Java从入门到“放弃”（精通）之旅——启航①"
published: 2024-04-10
description: "Java从入门到“放弃 ”精通之旅"
image: "https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/cover.webp"
tags: ["JavaSE", "博客"]
category: JavaSE
pinned: false
draft: false
---

# 🌟Java从入门到“~~放弃~~ ”精通之旅🚀
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/decorate.gif)

今天我将要带大家一起探索神奇的Java世界！希望能帮助到同样初学Java的你~ (๑•̀ㅂ•́)و✧

## 🔥 Java是什么？为什么这么火？

Java不仅仅是一门编程语言，更是一个完整的技术体系！它由Sun公司（现Oracle）在1995年推出，凭借"Write Once, Run Anywhere"的理念迅速风靡全球。

### Java语言发展史 
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/a/1.png)


看看2017年12月和2018年10月最新的TIOBE编程语言社区排行榜就知道Java有多受欢迎了：
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/a/2.png)

| 排名 | 语言 | 市场份额 |
|------|------|----------|
| ==1==    | ==Java== | ==17.801%==  |
| 2    | C    | 15.376%  |
| 3    | C++  | 7.593%   |

> ✨ **小知识**：Java最初叫Oak（橡树），因为创始人James Gosling办公室外有一棵橡树🌳

## 💼 Java能做什么？就业方向有哪些？

学Java不愁找工作！主要应用领域包括：

- 🏢 **企业级系统**：银行、电信等大型系统
- 🌐 **Web开发**：京东、淘宝等电商平台
- 📱 **Android开发**：80%的安卓APP用Java开发
- 📊 **大数据**：Hadoop、Spark等大数据框架
- 🎮 **游戏开发**：Minecraft就是用Java写的！

## ✨ Java的11大特性

**1. 简单性：比C++更简洁，没有指针等复杂概念**

 - Java语法是C++语法的一个“纯净版本”，相当于对C++做了一个减法。这里没有头文件、指针运算（甚至指针语法）、结构、联合、操作符重载、虚基类等等。不仅如此，Java开发环境远远超出大多数其他编程语言的开
   发环境。

**2. 面向对象：一切皆对象！🐶🐱**

 - 比如：人、狗、手机、电脑等都是对象。所谓面相对象，就是依靠对象之间的交互来完成事情，比如：人用手机网上购物，狗吃骨头...

**3. 可移植：Java规范中没有“依赖具体实现的地方**

 - 基本数据类型的大小以及有关运算都做了明确的说明。例如，Java中的int永远是32位的整数，而在C/C++中，int可能是16位整数、32位整数，也可能是编译器提供商指定的其他大小。在Java中，数据类型具有固定的大小，这消除了代码移植时令人头疼的主要问题。

**4. 健壮性：自动内存管理，告别内存泄漏**

 - Java与C++最大的不同在于Java采用的指针模型可以消除重写内存和损坏数据的可能性（对于曾经花费几个小时来检查由于指针bug而引起内存冲突的人来说，一定很喜欢Java的这一特性）。不仅如此，Java编译器能够检测许多在其他语言中仅在运行时才能够检测出来的问题。

**5. 多线程：轻松处理高并发**

 - Java在当时很超前。它是第一个支持并发程序设计的主流语言。多线程可以带来更好的交互响应和实时行为。并发程序设计绝非易事，但是Java在这方面表现出色，可以很好的管理这个工作。

**6. ...（还有更多等你探索！）**

## 🛠️ 开发环境搭建

安装JDK是第一步！

 1. [可能是Windows下最简单的Java](https://www.cnblogs.com/gaobo123/articles/13304599.html) 
 2. [环境安装指南Linux下JDK的安装（多种方式）](https://blog.csdn.net/lyhkmm/article/details/79524712) 
 3. [Mac下JDK的安装](https://jingyan.baidu.com/article/7f766daffd99354101e1d095.html)

```bash
# 检查安装是否成功
java -version
javac -version
```

> ⚠️ 注意配置环境变量哦！PATH和JAVA_HOME都要设好~

## 🎯 第一个Java程序：Hello World
Java是一门半编译型、半解释型语言。先通过javac编译程序把源文件进行编译，编译后生成的.class文件是由字节码组成的平台无关、面向JVM的文件。最后启动java虚拟机来运行.class文件，此时JVM会将字节码转换成平台能够理解的形式来运行。
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/a/3.png)

```java
/**
 * 我的第一个Java程序
 * @author 你的名字
 */
public class HelloWorld {
    /*
     * main方法是程序入口
     */
    public static void main(String[] args) {
        // 打印Hello World!
        System.out.println("Hello, World!"); 
    }
}
```

编译运行步骤：
1. 保存为`HelloWorld.java`
2. 编译：`javac HelloWorld.java`
3. 运行：`java HelloWorld`

## 📝 Java三大注释类型

1. **单行注释**：`// 我是注释`
2. **多行注释**：`/* 我是多行注释 */`
3. **文档注释**：`/** 我是文档注释 */`（可以用javadoc生成文档）

### 注释规范
 1. 内容准确: 注释内容要和代码一致, 匹配, 并在代码修改时及时更新
 2. 篇幅合理: 注释既不应该太精简, 也不应该长篇大论.
 3. 使用中文: 一般中国公司都要求使用中文写注释, 外企另当别论.
 4. 积极向上: 注释中不要包含负能量(例如 不想工作，想躺平等). 


```Java
# 生成API文档
javadoc -d doc HelloWorld.java
```
## 🏷️ 标识符命名规则
在上述程序中，Test称为类名，main称为方法名，也可以将其称为标识符，即：在程序中由用户给类名、方法名或者变量所取的名字。

- **硬性规则**：
  - 不能以数字开头
  - 不能是关键字
  - 区分大小写

- **软性建议**（团队协作很重要！）：
  - 类名：`大驼峰`，如`HelloWorld`
  - 方法/变量：`小驼峰`，如`getUserName`
  - 常量：`全大写_连接`，如`MAX_SIZE`

## 🔑 Java关键字大全

Java有50+个关键字，先认识几个常用的：

| 类别 | 关键字示例 |
|------|------------|
| 访问控制 | `public`, `private`, `protected` |
| 类相关 | `class`, `interface`, `extends` |
| 流程控制 | `if`, `else`, `for`, `while` |
| 异常处理 | `try`, `catch`, `finally` |

> ![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/a/4.png)
> ❌ 注意：关键字不能用作标识符！

## 💡 学习建议

1. 多敲代码！光看不动手=学不会游泳只看书🏊
2. 遇到报错别慌，这是进步的机会💪
3. 坚持写注释和文档，三个月后的你会感谢现在认真的自己
4. 加入Java学习社群，互相督促成长

## ❓【面试题】JDK、JRE、JVM之间的关系？
解答：
1. JDK(Java Development Kit):Java开发工具包，提供给Java程序员使用，包含了JRE，同时还包含了编译器javac与自带的调试工具Jconsole、jstack等。
2. JRE(Java Runtime Environment):Java运行时环境，包含了JVM，Java基础类库。是使用Java语言编写程序运行的所需环境。
3. JVM：Java虚拟机，运行Java代码
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/a/5.png)

## 🌈 总结

Java是一门强大而优雅的语言，无论是就业还是个人成长都是绝佳选择。从今天开始，让我们一起在Java的世界里探索吧！下次我会带来Java基础语法的详细讲解，敬请期待~

**互动时间**：你学Java的目的是什么？评论区告诉我吧！👇



---
> **JavaSE专栏（CSDN）**
> - [Java从入门到“放弃”（精通）之旅——启航①](https://blog.csdn.net/weixin_46491509/article/details/147120069?spm=1011.2124.3001.6209)
> - [Java从入门到“放弃”（精通）之旅——数据类型与变量②](https://blog.csdn.net/weixin_46491509/article/details/147142049?spm=1011.2124.3001.6209)
> - [Java从入门到“放弃”（精通）之旅——运算符③](https://blog.csdn.net/weixin_46491509/article/details/147169650?spm=1011.2124.3001.6209)
> - [Java从入门到“放弃”（精通）之旅——程序逻辑控制④](https://blog.csdn.net/weixin_46491509/article/details/147196623?spm=1001.2014.3001.5501)
> - [Java从入门到“放弃”（精通）之旅——方法的使用⑤](https://blog.csdn.net/weixin_46491509/article/details/147235179?spm=1011.2124.3001.6209)
> - [Java从入门到“放弃”（精通）之旅——数组的定义与使用⑥](https://blog.csdn.net/weixin_46491509/article/details/147354965?spm=1011.2124.3001.6209)
> - [Java从入门到“放弃”（精通）之旅——类和对象全面解析⑦](https://blog.csdn.net/weixin_46491509/article/details/147365547?spm=1011.2124.3001.6209)
> - [Java从入门到“放弃”（精通）之旅——继承与多态⑧](https://blog.csdn.net/weixin_46491509/article/details/147404308?spm=1011.2124.3001.6209)
> - [Java从入门到“放弃”（精通）之旅——抽象类和接口⑨](https://blog.csdn.net/weixin_46491509/article/details/147433445?spm=1011.2124.3001.6209)
>  - [Java从入门到“放弃”（精通）之旅——String类⑩](https://blog.csdn.net/weixin_46491509/article/details/147447054?spm=1011.2124.3001.6209)
>  - [Java从入门到“放弃”（精通）之旅——JavaSE终篇（异常）](https://blog.csdn.net/weixin_46491509/article/details/147518200?sharetype=blogdetail&sharerId=147518200&sharerefer=PC&sharesource=weixin_46491509&spm=1011.2480.3001.8118)
>  - [Java从入门到“放弃”（精通）之旅——反射、枚举与Lambda](https://blog.csdn.net/weixin_46491509/article/details/150613690)