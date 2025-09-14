---
title: "Java从入门到“放弃”（精通）之旅——数据类型与变量②"
published: 2024-04-11
description: "我们来聊聊Java中的数据类型与变量吧~"
image: "https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/cover.webp"
tags: ["JavaSE", "博客"]
category: JavaSE
pinned: false
draft: false
---

# 🌟Java从入门到“放弃”（精通）之旅🚀：程序员的“尺码”选择指南
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/decorate.gif)
今天我们来聊聊Java中的数据类型与变量，这就像程序员买衣服时的"尺码"选择一样有趣~
## 🎲一、字面常量：程序中的"固定台词"

想象一下，你是一个演员，剧本里有几句台词是永远不变的：

```java
System.out.println("Hello World"); 
System.out.println(100);
System.out.println(3.14);
```

这里的"Hello World"、100、3.14就像是你的固定台词，每次表演都要一字不差地说出来，我们称之为**字面常量**。

### 常量界的"六大门派"：
1. **字符串常量**：被双引号"绑架"的字符，如"123"
2. **整型常量**：没有小数点的"整数君"，如520
3. **浮点常量**：带小数点的"圆滑派"，如3.14
4. **字符常量**：被单引号'包养'的单身字符，如'A'
5. **布尔常量**：非黑即白的"极端分子"，只有true/false
6. **空常量**：神秘莫测的null（这个我们后面再聊）

## 📦二、数据类型：程序员的"衣柜"

Java的数据类型就像你的衣柜，分为两大类：

### 1. 基本数据类型（8件基础款）
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/b/1.png)
> *注：boolean大小没有严格规定，Oracle实现中是1字节

#### ❓什么是字节?

```java
字节是计算机中表示空间大小的基本单位.
计算机使用二进制表示数据. 我们认为 8 个二进制位(bit) 为一个字节(Byte).
我们平时的计算机为 8GB 内存, 意思是 8G 个字节.
其中 1KB = 1024 Byte, 1MB = 1024 KB, 1GB = 1024 MB.
所以 8GB 相当于 80 多亿个字节.
```

### 2. 引用数据类型（高级定制款）
比如String（字符串）、数组、类等，这个我们后面再细说。

## 🤖三、变量：程序中的"变形金刚"

变量就像你的体重，是可以变化的（扎心了）：

```java
int weight = 65;  // 初始值65kg
weight = 70;      // 过年吃胖了
weight = 60;      // 减肥成功了
```

### 变量定义三要素：
1. 数据类型（决定能存什么）
2. 变量名（==要有意义==，比如用weight而不是a）
3. 初始值（可以先不赋值，但==使用前必须赋值==）

## 四、类型转换：数据界的"变形记"

### 1. 自动类型转换（隐式）
小类型转大类型，Java自动完成：
```java
int a = 100;
long b = a;  // 自动把int转为long
```

### 2. 强制类型转换（显式）
大类型转小类型，需要手动确认：
```java
long a = 100L;
int b = (int)a;  // 可能有数据丢失，就像把XL衣服硬塞进S码
```

### 类型提升趣事
```java
byte a = 10;
byte b = 20;
byte c = (byte)(a + b); // 必须强转，因为byte运算会自动提升为int
```
> 
> 结论:
>  byte 和 byte 都是相同类型, 但是出现编译报错. 原因是, 虽然 a 和 b 都是 byte, 但是计算 a + b 会先将 a和 b 都提升成 int, 再进行计算, 得到的结果也是 int, 这是赋给 c, 就会出现上述错误.由于计算机的 CPU 通常是按照 4 个字节为单位从内存中读写，这就像两个小朋友（byte）一起玩，必须有个大人（int）看着才安全！

## 💬五、字符串：程序中的"话痨"

String类型可以存储任意文本：
```java
String s1 = "Hello";
String s2 = "World";
System.out.println(s1 + s2);  // 输出HelloWorld
```

### 字符串与数字的"爱恨情仇"（相互转换）
```java
// int转String
int num = 10;
String str1 = num + "";  // 方法1：加空字符串
String str2 = String.valueOf(num);  // 方法2：官方转换

// String转int
String str = "100";
int num = Integer.parseInt(str);  // 注意：str必须是数字格式
```

## 🌈六、总结：数据类型选择指南

选择数据类型就像买衣服：
1. **整数类型**：
   - 小数字用byte/short（童装/S码）
   - 一般用int（M码）
   - 大数字用long（L码）
   
2. **浮点类型**：
   - 默认用double（精度更高）
   - 特殊情况用float（省内存但会丢精度）
   
3. **其他**：
   - 字符用char
   - 真假用boolean

记住：**合适的才是最好的**！就像你不会穿童装去参加正式会议一样，程序中也应该根据需求选择合适的数据类型。

---

## 💌 PS：最后送大家一个段子：
				为什么程序员分不清万圣节和圣诞节？
				因为 Oct 31 == Dec 25！
				（八进制31等于十进制25，get到了吗？😉）




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
