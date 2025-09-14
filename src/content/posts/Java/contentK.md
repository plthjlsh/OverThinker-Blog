---
title: "Java从入门到“放弃”（精通）之旅——JavaSE（异常）"
published: 2024-04-27
description: "Java异常是程序运行时的不正常行为，分为Error（严重错误）和Exception（可处理异常）"
image: "https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/cover.webp"
tags: ["JavaSE", "博客"]
category: JavaSE
pinned: false
draft: false
---

# Java从入门到“放弃”（精通）之旅🚀——JavaSE终篇（异常）
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/decorate.gif)

   
## 一、异常的概念与体系结构
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/k/1.png)


### 1.1 什么是异常？

在生活中，当一个人表情痛苦时，我们可能会关心地问："你是不是生病了？"在程序中也是如此，即使我们绞尽脑汁将代码写得尽善尽美，程序运行时仍可能出现各种问题，比如数据格式不对、网络不通畅、内存不足等。

在Java中，将程序执行过程中发生的不正常行为称为异常。例如：

```java
// 算术异常
System.out.println(10 / 0);  // ArithmeticException: / by zero

// 数组越界异常
int[] arr = {1, 2, 3};
System.out.println(arr[100]);  // ArrayIndexOutOfBoundsException

// 空指针异常
int[] arr = null;
System.out.println(arr.length);  // NullPointerException
```

### 1.2 异常的体系结构

Java中的异常种类繁多，为了分类管理，Java维护了一个异常体系结构：
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/k/2.png)


```
Throwable
├── Error
└── Exception
    ├── IOException
    ├── ClassNotFoundException
    ├── CloneNotSupportedException
    └── RuntimeException
        ├── ArithmeticException
        ├── NullPointerException
        ├── ArrayIndexOutOfBoundsException
        └── ...
```

- **==Throwable==**：异常体系的顶层类
- **==Error==**：Java虚拟机无法解决的严重问题，如StackOverflowError和OutOfMemoryError
- **==Exception==**：程序员可以通过代码处理的异常

### 1.3 异常的分类

根据发生时机，异常可分为：

1. **编译时异常（Checked Exception）**：在编译期间就能发现的异常
2. **运行时异常（Unchecked Exception）**：RuntimeException及其子类，在程序运行时才会出现

```java
// 编译时异常示例
@Override
public Person clone() {
    return (Person)super.clone();  // 需要处理CloneNotSupportedException
}

// 运行时异常示例
int[] arr = null;
System.out.println(arr.length);  // NullPointerException
```

## 二、异常的处理方式

### 2.1 防御式编程的两种风格

1. **LBYL（Look Before You Leap）**：事前检查

```java
boolean ret = false;
ret = 登陆游戏();
if (!ret) {
    处理登陆游戏错误;
    return;
}
ret = 开始匹配();
if (!ret) {
    处理匹配错误;
    return;
}
// ...更多检查
```

2. **EAFP（It's Easier to Ask Forgiveness than Permission）**：事后处理

```java
try {
    登陆游戏();
    开始匹配();
    游戏确认();
    选择英雄();
    载入游戏画面();
} catch (登陆游戏异常) {
    处理登陆游戏异常;
} catch (开始匹配异常) {
    处理开始匹配异常;
}
// ...更多catch块
```

Java主要采用EAFP风格，通过五个关键字处理异常：`throw`、`try`、`catch`、`finally`、`throws`。

### 2.2 异常的抛出（throw）

使用`throw`关键字抛出异常：

```java
public static int getElement(int[] array, int index) {
    if (null == array) {
        throw new NullPointerException("传递的数据为null");
    }
    if (index < 0 || index >= array.length) {
        throw new ArrayIndexOutOfBoundsException("传递的数组下标越界");
    }
    return array[index];
}

public static void main(String[] args) {
    int[] array = {1, 2, 3};
    getElement(array, 3);  // 抛出ArrayIndexOutOfBoundsException
}
```

### 2.3 异常的捕获

#### 2.3.1 异常声明（throws）

```java
public class Config {
    public void openConfig(String filename) throws FileNotFoundException {
        if (!filename.equals("config.ini")) {
            throw new FileNotFoundException("配置文件名字不对");
        }
        // 打开文件
    }
}

public static void main(String[] args) throws FileNotFoundException {
    Config config = new Config();
    config.openConfig("config.ini");
}
```

#### 2.3.2 try-catch捕获处理

```java
public static void main(String[] args) {
    Config config = new Config();
    try {
        config.openConfig("config.txt");
        System.out.println("文件打开成功");
    } catch (FileNotFoundException e) {
        System.out.println("文件不存在，错误信息：" + e.getMessage());
        e.printStackTrace();  // 打印完整调用栈
    }
    System.out.println("异常处理后的代码");
}
```

#### 2.3.3 finally块

```java
public static int getData() {
    Scanner sc = null;
    try {
        sc = new Scanner(System.in);
        int data = sc.nextInt();
        return data;
    } catch (InputMismatchException e) {
        e.printStackTrace();
    } finally {
        System.out.println("finally中代码");
        if (null != sc) {
            sc.close();  // 确保资源被释放
        }
    }
    return 0;
}
```

> **面试题**：finally中的语句一定会执行吗？
>  答：正常情况下一定会执行，除非遇到：
>   1. 在try或catch块中调用System.exit()
>   2. 程序所在线程死亡
>   3. 关闭CPU

## 三、异常处理流程

```java
public static void main(String[] args) {
    try {
        func();
    } catch (ArrayIndexOutOfBoundsException e) {
        e.printStackTrace();
    }
    System.out.println("after try catch");
}

public static void func() {
    int[] arr = {1, 2, 3};
    System.out.println(arr[100]);  // 抛出异常
}
```

异常处理流程总结：
1. 执行try中的代码
2. 出现异常则匹配catch块
3. 找到匹配则执行catch，否则向上传递
4. 无论是否匹配，finally都会执行
5. 如果一直未被处理，最终由JVM处理，程序终止

## 四、自定义异常类

Java内置异常类不能满足所有需求时，可以自定义异常：

```java
// 自定义用户名异常
class UserNameException extends Exception {
    public UserNameException(String message) {
        super(message);
    }
}

// 自定义密码异常
class PasswordException extends Exception {
    public PasswordException(String message) {
        super(message);
    }
}

// 使用自定义异常
public class Login {
    private String userName = "admin";
    private String password = "123456";

    public static void loginInfo(String userName, String password) 
            throws UserNameException, PasswordException {
        if (!userName.equals("admin")) {
            throw new UserNameException("用户名错误！");
        }
        if (!password.equals("123456")) {
            throw new PasswordException("密码错误！");
        }
        System.out.println("登陆成功");
    }

    public static void main(String[] args) {
        try {
            loginInfo("admin", "123");
        } catch (UserNameException e) {
            System.out.println("用户名异常：" + e.getMessage());
        } catch (PasswordException e) {
            System.out.println("密码异常：" + e.getMessage());
        }
    }
}
```
> **注意事项：**
> - 自定义异常通常会继承自 **Exception** 或者 **RuntimeException**
> - 继承自 Exception 的异常默认是**受查异常**
> - 继承自 **RuntimeException** 的异常默认是**非受查异常**. 

## 总结

Java异常处理是编写健壮程序的关键技术。通过合理的异常处理，我们可以：
1. 提高程序的容错性
2. 分离正常逻辑和错误处理逻辑
3. 提供更清晰的错误信息
4. 确保资源被正确释放

**记住异常处理的原则：对可恢复情况使用受检异常，对编程错误使用运行时异常，避免滥用异常处理机制。**



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
