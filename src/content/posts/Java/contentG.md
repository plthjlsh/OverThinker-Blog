---
title: "Java从入门到“放弃”（精通）之旅——类和对象全面解析⑦"
published: 2024-04-20
description: "面向对象编程(OOP)是Java语言的核心思想，而类和对象则是OOP的基础"
image: "https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/cover.webp"
tags: ["JavaSE", "博客"]
category: JavaSE
pinned: false
draft: false
---

# Java从入门到“放弃”（精通）之旅🚀——类和对象全面解析⑦

![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/decorate.gif)

## 一、面向对象初探

### 1.1 什么是面向对象？

Java是一门纯面向对象的语言(OOP)，在面向对象的世界里，一切皆为对象。面向对象是解决问题的一种思想，主要依靠对象之间的交互完成一件事情。

**面向对象的==特点==**：
- 更符合人类对事物的认知方式
- 对大型程序的设计、扩展和维护更加友好
- 通过对象之间的交互来完成任务

### 1.2 面向对象 vs 面向过程

让我们通过洗衣服的例子来理解两者的区别：

> **传统洗衣服(面向过程)**：
> ![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/g/1.png)
> ![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/g/2.png)




> **现代洗衣服(面向对象)**：
> ![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/g/3.png)
>![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/g/4.png)

>- 对象：人、衣服、洗衣粉、洗衣机
>- 交互过程：人将衣服放进洗衣机、倒入洗衣粉、启动洗衣机
>面向对象方式不关注具体洗衣过程，而是通过对象间的交互完成任务。

## 二、类的定义和使用

### 2.1 什么是类？

类是用来对一个实体(对象)进行描述的，主要描述该实体具有哪些属性(外观尺寸等)和哪些功能(用来做什么)。

例如，洗衣机类的属性和功能：
- 属性：品牌、型号、重量、尺寸、颜色等
- 功能：洗衣、烘干、定时等

### 2.2 类的定义格式

```java
// 创建类
class ClassName {
    field;  // 字段(属性)或成员变量
    method; // 行为或成员方法
}
```

**洗衣机类示例**：

```java
class WashMachine {
    // 成员变量(属性)
    public String brand;   // 品牌
    public String type;    // 型号
    public double weight;  // 重量
    public double length;  // 长
    public double width;   // 宽
    public double height;  // 高
    public String color;   // 颜色
    
    // 成员方法(功能)
    public void washClothes() {  // 洗衣服
        System.out.println("洗衣功能");
    }
    
    public void dryClothes() {   // 脱水
        System.out.println("脱水功能");
    }
    
    public void setTime() {      // 定时
        System.out.println("定时功能");
    }
}
```

### 2.3 小练习

#### 2.3.1 定义狗类
>![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/g/5.png)
>![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/g/6.png)
>```java
>class PetDog {
>    // 属性
>    public String name;   // 名字
>    public String color;  // 颜色
>   
>    // 行为
>    public void bark() {
>        System.out.println(name + "：旺旺旺~~");
>    }
>    
>    public void wag() {
>        System.out.println(name + "：摇尾巴~~");
>    }
>}
>```

#### 2.3.2 定义学生类
>![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/g/7.png)
>```java
>public class Student {
>    // 属性
>    public String name;
>    public String gender;
>    public short age;
>    public double score;
>    
>    // 方法
>    public void DoClass() {
>        System.out.println("按时上课，不要迟到，如果请假，及时去补");
>    }
>    
>    public void DoHomework() {
>        System.out.println("教务系统，完成作业，一旦拖沓，神仙难救");
>    }
>    
>    public void Exam() {
>        System.out.println("考试目的，了解学情，人人必考，暴露问题");
>    }
>}
>```

**注意事项**：
1. 一般一个文件只定义一个类
2. main方法所在的类通常用public修饰
3. public修饰的类必须与文件名相同
4. 不要轻易修改public类的名称

## 三、类的实例化

### 3.1 什么是实例化？

用类类型创建对象的过程称为类的实例化，在Java中使用`new`关键字。

**实例化示例**：

```java
class PetDog {
    public String name;
    public String color;
    
    public void bark() {
        System.out.println(name + "：旺旺旺~~~");
    }
    
    public void wag() {
        System.out.println(name + "：摇尾巴~~~");
    }
}

public class Main {
    public static void main(String[] args) {
        // 通过new实例化对象
        PetDog dogH = new PetDog();
        dogH.name = "小黄";
        dogH.color = "黑黄";
        dogH.bark();
        dogH.wag();
        
        PetDog dogS = new PetDog();
        dogS.name = "赛虎";
        dogS.color = "棕色";
        dogS.bark();
        dogS.wag();
    }
}
```

**输出结果**：
```
小黄: 旺旺旺~~~
小黄: 摇尾巴~~~
赛虎: 旺旺旺~~~
赛虎: 摇尾巴~~~
```

### 3.2 类和对象的关系


1. 类是一个模型，用于描述实体
2. 类是一种自定义类型，可以用来定义变量
3. 一个类可以实例化多个对象
4. 类比：类就像建筑设计图，对象是根据设计图建造的实际房子
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/g/8.png)

## 四、this引用

### 4.1 为什么需要this引用？

考虑以下日期类：

```java
public class Date {
    public int year;
    public int month;
    public int day;
    
    public void setDay(int year, int month, int day) {
        year = year;    // 这里会有歧义
        month = month;
        day = day;
    }
}
```

问题：
1. 形参名与成员变量名相同时，赋值语句有歧义
2. 多个对象调用同一方法时，方法如何知道操作的是哪个对象的数据？

### 4.2 this引用解决方案

```java
public class Date {
    public int year;
    public int month;
    public int day;
    
    public void setDay(int year, int month, int day) {
        this.year = year;   // 使用this明确指向当前对象的成员变量
        this.month = month;
        this.day = day;
    }
    
    public void printDate() {
        System.out.println(this.year + "/" + this.month + "/" + this.day);
    }
}
```

### 4.3 this引用特性

1. this的类型：对应类类型引用
2. this只能在成员方法中使用
3. 在成员方法中，this只能引用当前对象
4. this是成员方法的第一个隐藏参数，编译器自动传递

## 五、对象的构造及初始化

### 5.1 构造方法

构造方法是一种特殊成员方法，用于初始化对象。

```java
public class Date {
    public int year;
    public int month;
    public int day;
    
    // 构造方法
    public Date(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
        System.out.println("Date(int,int,int)方法被调用了");
    }
    
    public void printDate() {
        System.out.println(year + "-" + month + "-" + day);
    }
    
    public static void main(String[] args) {
        Date d = new Date(2021, 6, 9);  // 自动调用构造方法
        d.printDate();  // 输出：2021-6-9
    }
}
```

### 5.2 构造方法==特性==

1. 名字必须与类名相同
2. 没有返回值类型，void也不行
3. 创建对象时由编译器自动调用，生命周期内只调用一次
4. 可以重载
5. 用户未定义时，编译器生成默认无参构造方法
6. 构造方法中可通过this调用其他构造方法
7. 通常使用public修饰

### 5.3 默认初始化和就地初始化

**默认初始化**：成员变量未显式初始化时，Java会赋予默认值

| 数据类型    | 默认值      |
|------------|------------|
| byte       | 0          |
| short      | 0          |
| int        | 0          |
| long       | 0L         |
| float      | 0.0f       |
| double     | 0.0        |
| char       | '\u0000'   |
| boolean    | false      |
| reference  | null       |

![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/g/9.png)


**就地初始化**：声明成员变量时直接赋初值

```java
public class Date {
    public int year = 1900;
    public int month = 1;
    public int day = 1;
    
    // ...
}
```

## 六、封装

### 6.1 封装概念
==封装是面向对象三大特性之一，将数据和操作数据的方法有机结合，隐藏对象的属性和实现细节，仅对外公开接口。==

>**举个栗子**🌰：
	计算机厂商在出厂时，在外部套上壳子，将内部实现细节隐藏起来，仅仅对外提供开关机、鼠标以及键盘插孔等，让用户可以与计算机进行交互即可。
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/g/10.png)



### 6.2 访问限定符

Java提供四种访问权限：

![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/g/11.png)


**封装示例**：

```java
public class Computer {
    private String cpu;     // private: 仅本类可访问
    private String memory;  // private: 仅本类可访问
    public String screen;   // public: 任何类可访问
    String brand;          // default: 同包可访问
    
    public Computer(String brand, String cpu, String memory, String screen) {
        this.brand = brand;
        this.cpu = cpu;
        this.memory = memory;
        this.screen = screen;
    }
    
    public void Boot() {
        System.out.println("开机---");
    }
}
```

### 6.3 包(package)

包是对类的封装机制，用于更好地组织类。（可以理解为目录）

![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/g/12.png)


**包的导入**：

```java
import java.util.Date;  // 导入特定类
import java.util.*;     // 导入整个包(不推荐)
```

**自定义包**：

```java
package com.example.demo;

public class Test {
    // 类内容
}
```

## 七、static成员

### 7.1 static修饰成员变量

static修饰的成员变量属于类，所有对象共享。

```java
public class Student {
    private String name;
    private static String classRoom = "Bit306";  // 静态成员变量
    
    public static String getClassRoom() {
        return classRoom;
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.println(Student.getClassRoom());  // 输出：Bit306
    }
}
```

### 7.2 static修饰成员方法

静态方法属于类，不依赖于特定对象实例。

```java
public class Student {
    private static String classRoom = "Bit306";
    
    public static String getClassRoom() {
        return classRoom;
    }
}
```

**静态方法特性**：
1. 属于类方法
2. 推荐通过类名调用
3. 不能访问非静态成员变量
4. 不能调用非静态方法
5. 无法重写

## 八、代码块

### 8.1 普通代码块

定义在方法中的代码块。

```java
public class Main {
    public static void main(String[] args) {
        {
            int x = 10;
            System.out.println("x1 = " + x);
        }
        int x = 100;
        System.out.println("x2 = " + x);
    }
}
```

### 8.2 构造代码块(实例代码块)

定义在类中，用于初始化实例成员变量。

```java
public class Student {
    private String name;
    private int age;
    
    // 实例代码块
    {
        this.name = "bit";
        this.age = 12;
        System.out.println("实例代码块执行");
    }
    
    public Student() {
        System.out.println("构造方法执行");
    }
}
```

### 8.3 静态代码块

使用static定义，用于初始化静态成员变量。

```java
public class Student {
    private static String classRoom;
    
    // 静态代码块
    static {
        classRoom = "bit306";
        System.out.println("静态代码块执行");
    }
}
```

**注意事项**：
- 静态代码块只会执行一次
- 多个静态代码块按定义顺序执行
- 实例代码块每次创建对象都会执行

## 九、内部类

### 9.1 实例内部类

未用static修饰的成员内部类。

```java
public class OutClass {
    private int a = 10;
    
    // 实例内部类
    class InnerClass {
        public void print() {
            System.out.println(a);  // 可以直接访问外部类成员
        }
    }
}
```

### 9.2 静态内部类

用static修饰的成员内部类。

```java
public class OutClass {
    private static int b = 20;
    
    // 静态内部类
    static class InnerClass {
        public void print() {
            System.out.println(b);  // 只能访问外部类静态成员
        }
    }
}
```

### 9.3 局部内部类

定义在方法中的内部类。

```java
public class OutClass {
    public void method() {
        class InnerClass {
            public void print() {
                System.out.println("局部内部类");
            }
        }
        
        InnerClass inner = new InnerClass();
        inner.print();
    }
}
```

### 9.4 匿名内部类

没有名字的内部类，通常用于实现接口或抽象类。

```java
interface Message {
    void send(String msg);
}

public class Test {
    public static void main(String[] args) {
        Message m = new Message() {  // 匿名内部类
            @Override
            public void send(String msg) {
                System.out.println("发送消息：" + msg);
            }
        };
        
        m.send("Hello");
    }
}
```

## 十、对象的打印

默认打印对象时输出的是对象的哈希码，可以通过重写toString()方法自定义输出。

```java
public class Person {
    String name;
    String gender;
    int age;
    
    public Person(String name, String gender, int age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "Person[name=" + name + ", gender=" + gender + ", age=" + age + "]";
    }
    
    public static void main(String[] args) {
        Person p = new Person("张三", "男", 25);
        System.out.println(p);  // 输出：Person[name=张三, gender=男, age=25]
    }
}
```

## 总结

本文全面介绍了Java中类和对象的各个方面，包括：
1. 类的定义和实例化
2. 成员变量和成员方法
3. this引用的使用
4. 构造方法和对象初始化
5. 封装特性和访问控制
6. static成员的使用
7. 各种代码块的作用
8. 内部类的分类和使用
9. 对象的打印和toString()方法

掌握这些内容是学习Java面向对象编程的基础，希望本文能帮助大家更好地理解和运用这些概念。在实际开发中，合理使用面向对象的特性可以让代码更加清晰、可维护性更高。




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
