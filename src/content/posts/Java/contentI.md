---
title: "Java从入门到“放弃”（精通）之旅——抽象类和接口⑨"
published: 2024-04-23
description: "本文将深入探讨抽象类和接口的核心概念、语法规则、使用场景以及它们之间的区别，并通过丰富的代码示例帮助读者全面掌握这些知识点"
image: "https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/cover.webp"
tags: ["JavaSE", "博客"]
category: JavaSE
pinned: false
draft: false
---

# Java从入门到“放弃”（精通）之旅🚀——抽象类和接口⑨
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/decorate.gif)

## 引言
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/i/1.png)



在Java面向对象编程中，抽象类和接口是两个非常重要的概念。它们为代码提供了更高层次的抽象能力，是设计灵活、可扩展系统的关键工具。

## 🟦一、抽象类：不完全的蓝图

### 1.1 抽象类的基本概念

抽象类是一种特殊的类，它不能被实例化，只能被继承。抽象类存在的意义在于为子类提供一个通用的模板，其中可以包含具体实现的方法和需要子类实现的抽象方法。

```java
// 抽象类示例：图形类
public abstract class Shape {
    // 抽象方法：没有方法体
    abstract public void draw();
    abstract void calcArea();
    
    // 普通方法和属性
    public double getArea() {
        return area;
    }
    
    protected double area; // 面积
}
```
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/i/2.png)


### 1.2 抽象类的关键特性

1. **不能直接实例化**：尝试实例化抽象类会导致编译错误
   ```java
   Shape shape = new Shape(); // 编译错误
   ```

2. **抽象方法限制**：
   - 必须要使用 **==abstract==** 修饰
   - 不能是private（**==必须能被继承==**）
   - 不能是final（**==必须能被子类重写==**）
   - 不能是static（**==属于类而不属于实例==**）

4. **继承要求**：子类必须实现所有抽象方法，除非子类也是抽象类

5. **构造方法**：抽象类可以有构造方法，用于初始化成员变量

### 1.3 抽象类的实际应用

```java
// 矩形类实现
public class Rect extends Shape {
    private double length;
    private double width;

    Rect(double length, double width) {
        this.length = length;
        this.width = width;
    }
    
    @Override
    public void draw() {
        System.out.println("矩形: length=" + length + " width=" + width);
    }

    @Override
    public void calcArea() {
        area = length * width;
    }
}
```

## 📜二、接口：行为的契约

### 2.1 接口的基本概念
>![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/i/3.png)
>通过上述例子可以看出：接口就是公共的行为规范标准，大家在实现时，只要符合规范标准，就可以通用。
>
***在Java中接口是一种引用数据类型，也是一种完全抽象的"纯规范"，它定义了一组方法签名而没有具体实现。Java 8之后，接口可以包含默认方法和静态方法。***

### 2.2 语法规则 
接口的定义格式与定义类的格式基本相同，将class关键字换成 interface 关键字，就定义了一个接口。
 

```java
public interface 接口名称{
    // 抽象方法
    public abstract void method1();   // public abstract 是固定搭配，可以不写
    public void method2();
    abstract void method3();
    void method4();
    
    // 注意：在接口中上述写法都是抽象方法，跟推荐方式4，代码更简洁
}
```

> **提示💡:**
> 1. 创建接口时, 接口的命名一般以大写字母 **==I==** 开头.
> 2. 接口的命名一般使用 "**==形容词==**" 词性的单词. 

代码示例：
```java
// USB接口示例
public interface USB {
    void openDevice();  // 默认是public abstract
    void closeDevice();
}
```

### 2.3 接口的实现

```java
// 鼠标类实现USB接口
public class Mouse implements USB {
    @Override
    public void openDevice() {
        System.out.println("打开鼠标");
    }

    @Override
    public void closeDevice() {
        System.out.println("关闭鼠标");
    }
    
    public void click() {
        System.out.println("鼠标点击");
    }
}
```

### 2.4 接口的核心特性和注意点❗

> 1. **默认public abstract**：接口方法默认是public abstract的
> 2. **接口类型是一种引用类型**：但是不能直接new接口的对象
> 3. **变量默认public static final**：接口中的变量默认是常量
> 4. **不能有构造方法和静态代码块**
> 5. **接口中的方法是不能在接口中实现的，只能由实现接口的类来实现**
> 6. 重写接口中方法时：**不能使用默认的访问权限**
> 7. **多实现**：一个类可以实现多个接口
> 8. **接口继承**：接口可以多继承其他接口

### 2.5 接口的多继承示例

```java
interface IRunning {
    void run();
}

interface ISwimming {
    void swim();
}

// 接口多继承
interface IAmphibious extends IRunning, ISwimming {}

// 青蛙类实现两栖接口
class Frog extends Animal implements IAmphibious {
    @Override
    public void run() {
        System.out.println(this.name + "正在往前跳");
    }

    @Override
    public void swim() {
        System.out.println(this.name + "正在蹬腿游泳");
    }
}
```
## 🗂️三、Clonable 接口和深拷贝
Java 中内置了一些很有用的接口, **==Clonable==** 就是其中之一.
Object 类中存在一个 clone 方法, 调用这个方法可以创建一个对象的 "拷贝". 但是要想合法调用 clone 方法, 必须要先实现 Clonable 接口, 否则就会抛出 ***CloneNotSupportedException*** 异常.

```java
class Animal implements Cloneable {
    private String name;
 
    @Override
    public Animal clone() {
        Animal o = null;
        try {
            o = (Animal)super.clone();
       } catch (CloneNotSupportedException e) {
            e.printStackTrace();
       }
        return o;
   }
}
 
public class Test {
    public static void main(String[] args) {
        Animal animal = new Animal();
        Animal animal2 = animal.clone();
        System.out.println(animal == animal2);
   }
}
 
// 输出结果
// false
```
>**浅拷贝** VS **深拷贝**
**==Cloneable 拷贝出的对象是一份 "浅拷贝"==**
观察以下代码:

>  ```java
> class Money {
>     public double m = 99.99;
> }
>  
> class Person implements Cloneable{
>     public Money money = new Money();
>  
>     @Override
>     protected Object clone() throws CloneNotSupportedException {
>         return super.clone();
>    }
> }
>  
> public class TestDemo3 {
>     public static void main(String[] args) throws CloneNotSupportedException {
>         Person person1 = new Person();
>         Person person2 = (Person) person.clone();
>         System.out.println("通过person2修改前的结果");
>         System.out.println(person1.money.m);
>         System.out.println(person2.money.m);
>         person2.money.m = 13.6;
>         System.out.println("通过person2修改后的结果");
>         System.out.println(person1.money.m);
>         System.out.println(person2.money.m);
>    }
> }
>  
> // 执行结果
> 通过person2修改前的结果
> 99.99
> 99.99
> 通过person2修改后的结果
> 13.6
> 13.6
>```
>如上代码，我们可以看到，通过clone，我们只是拷贝了Person对象。但是Person对象中的Money对象，并没有拷贝。通过person2这个引用修改了m的值后，person1这个引用访问m的时候，值也发生了改变。这里就是发生了浅拷贝。

## 🆚四、抽象类与接口的对比

| 特性                | 抽象类                      | 接口                          |
|---------------------|---------------------------|-----------------------------|
| 实例化              | 不能直接实例化              | 不能直接实例化               |
| 方法实现            | 可以有具体方法              | Java 8前只能有抽象方法        |
| 变量                | 普通变量                    | 默认public static final常量   |
| 继承/实现           | 单继承                     | 多实现                       |
| 构造方法            | 可以有                     | 不能有                      |
| 访问修饰符          | 各种权限                   | 默认public                   |
| 设计理念            | "是什么"(is-a)关系         | "能做什么"(has-a)能力        |

图示：
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/i/4.png)



## 🦸🏼五、Object类：所有类的超类

### 5.1 Object类概述

Object类是Java中所有类的默认父类，提供了以下重要方法：

- `toString()`: 返回对象的字符串表示
- `equals()`: 比较对象内容
- `hashCode()`: 返回对象的哈希码
- `clone()`: 创建并返回对象的拷贝

### 5.2 重要方法实现

**equals方法重写示例：**

```java
@Override
public boolean equals(Object obj) {
    if (obj == null) return false;
    if (this == obj) return true;
    if (!(obj instanceof Person)) return false;
    Person person = (Person) obj;
    return this.name.equals(person.name) && this.age == person.age;
}
```

**hashCode方法重写示例：**

```java
@Override
public int hashCode() {
    return Objects.hash(name, age);
}
```

## 📖六、总结与实践建议

1. **抽象类使用场景**：
   - 需要为相关类提供公共代码
   - 需要声明非静态、非常量字段
   - 需要定义构造函数

2. **接口使用场景**：
   - 需要定义行为契约
   - 需要多重继承行为
   - 需要定义API而不关心实现

3. **设计原则**：
   - 优先使用接口而非抽象类（接口更灵活）
   - 当需要提供公共代码时再使用抽象类
   - 合理使用多态特性，编写更通用的代码

**通过学习本文，相信您已经掌握了Java中抽象类和接口的核心概念与使用技巧。在实际开发中，灵活运用这些特性可以帮助您设计出更加优雅、可维护的面向对象程序。**



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
