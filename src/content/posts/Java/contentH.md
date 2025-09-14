---
title: "Java从入门到“放弃”（精通）之旅——继承与多态⑧"
published: 2024-04-22
description: "本文将详细介绍Java中的继承和多态机制，包括基本概念、语法规则、使用场景以及注意事项"
image: "https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/cover.webp"
tags: ["JavaSE", "博客"]
category: JavaSE
pinned: false
draft: false
---

# Java从入门到“放弃”（精通）之旅🚀——继承与多态⑧

![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/decorate.gif)


## 一、继承：代码复用的利器

### 1.1 为什么需要继承？
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/h/1.png)


想象一下我们要描述狗和猫这两种动物。如果不使用继承，代码可能会是这样：
```java
// Dog.java
public class Dog {
    String name;
    int age;
    float weight;
    
    public void eat() {
        System.out.println(name + "正在吃饭");
    }
    
    public void sleep() {
        System.out.println(name + "正在睡觉");
    }
    
    void bark() {
        System.out.println(name + "汪汪汪---");
    }
}

// Cat.java
public class Cat {
    String name;
    int age;
    float weight;
    
    public void eat() {
        System.out.println(name + "正在吃饭");
    }
    
    public void sleep() {
        System.out.println(name + "正在睡觉");
    }
    
    void mew() {
        System.out.println(name + "喵喵喵---");
    }
}
```
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/h/2.png)

可以看到，这两个类中有大量重复的代码（name、age、weight属性，eat()和sleep()方法）。继承机制正是为了解决这种代码冗余问题而生的。

### 1.2 继承的概念

继承是面向对象程序设计使代码可以复用的最重要手段，它允许程序员在保持原有类特性的基础上进行扩展，增加新功能。这样产生的新类称为派生类（子类），被继承的类称为基类（父类）。

继承关系可以用以下图示表示：

```
        Animal
        /    \
       Dog    Cat
```

### 1.3 继承的语法

在Java中使用`extends`关键字实现继承：

```java
// Animal.java
public class Animal {
    String name;
    int age;
    
    public void eat() {
        System.out.println(name + "正在吃饭");
    }
    
    public void sleep() {
        System.out.println(name + "正在睡觉");
    }
}

// Dog.java
public class Dog extends Animal {
    void bark() {
        System.out.println(name + "汪汪汪---");
    }
}

// Cat.java
public class Cat extends Animal {
    void mew() {
        System.out.println(name + "喵喵喵---");
    }
}
```

### 1.4 继承中的成员访问

在继承体系中，子类可以访问父类的成员，但有一些规则需要注意：

1. **成员变量访问**：
   - 子类中有，优先访问子类的
   - 子类中没有，访问父类的
   - 都没有，编译报错

2. **成员方法访问**：
   - 方法名不同时，优先在子类中找，再到父类中找
   - 方法名相同时，根据参数列表决定（重载）
   - 完全相同时，子类会覆盖父类方法（重写）

### 1.5 super关键字

当子类和父类有同名成员时，可以使用`super`关键字显式访问父类的成员：

```java
public class Derived extends Base {
    int a;  // 与父类同名
    
    public void method() {
        super.a = 200;  // 访问父类的a
        this.a = 100;   // 访问子类的a
    }
}
```

### 1.6 子类构造方法

子类构造时必须先调用父类构造方法：

```java
public class Base {
    public Base() {
        System.out.println("Base()");
    }
}

public class Derived extends Base {
    public Derived() {
        // 编译器会自动添加super();
        System.out.println("Derived()");
    }
}
```

注意：
1. `super()`必须是子类构造方法的第一条语句
2. 如果父类没有无参构造，子类必须显式调用父类的有参构造


## 二、继承方式

在现实生活中，事物之间的关系是非常复杂，灵活多样，比如：
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/h/3.png)
**==但在Java中只支持这几种继承方式==**
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/h/4.png)
## 三、多态：灵活的行为表现

### 2.1 多态的概念

多态是指同一行为在不同对象上表现出不同的形态。例如：

```
打印机
├─ 彩色打印机 → 打印效果：彩色
└─ 黑白打印机 → 打印效果：黑白
```

### 2.2 多态的实现条件

Java中实现多态需要满足三个条件：
1. 必须在继承体系下
2. 子类必须重写父类方法
3. 通过父类引用调用重写的方法

### 2.3 方法重写(Override)
| 区别点       | 重写(override)                                   | 重载(overload)              |
|--------------|------------------------------------------------|-----------------------------|
| 参数列表     | 一定不能修改                                   | 必须修改                    |
| 返回类型     | 不能修改（除非构成父子类关系）                | 可以修改                    |
| 访问限定符   | 不能做更严格的限制（可以降低限制）            | 可以修改                    |

**==重载和重写的区别：==**
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/h/5.png)

重写是子类对父类方法的重新实现，必须遵循以下规则：
- 方法名、参数列表必须相同
- 返回值类型相同或是父类返回值的子类
- 访问权限不能比父类更严格
- 不能重写static、private、final方法

示例：
```java
class Animal {
    public void eat() {
        System.out.println("动物吃饭");
    }
}

class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }
}
```

### 2.4 向上转型与向下转型

1. **向上转型**：子类对象赋值给父类引用
   ```java
   Animal animal = new Cat("咪咪", 2);
   ```

2. **向下转型**：父类引用强制转换为子类类型
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/h/6.png)

   ```java
   if (animal instanceof Cat) {
       Cat cat = (Cat) animal;
       cat.mew();
   }
   ```

### 2.5 多态的优缺点

**优点**：
1. 降低代码复杂度，减少if-else
2. 提高可扩展性，新增子类不影响现有代码

**缺点**：
1. 运行效率略低（动态绑定）
2. 属性没有多态性
3. 构造方法中调用重写方法可能导致问题

### 2.6 避免在构造方法中调用重写方法

看一个典型问题：

```java
class B {
    public B() {
        func();  // 危险！
    }
    
    public void func() {
        System.out.println("B.func()");
    }
}

class D extends B {
    private int num = 1;
    
    @Override
    public void func() {
        System.out.println("D.func() " + num);
    }
}

public class Test {
    public static void main(String[] args) {
        D d = new D();  // 输出：D.func() 0
    }
}
```

此时num还未初始化（值为0），因为父类构造方法执行时子类字段还未初始化。

## 四、继承与组合的选择

继承表示"is-a"关系，组合表示"has-a"关系。例如：

```java
// 继承：奔驰是汽车
class Benz extends Car {
    // ...
}

// 组合：汽车有发动机、轮胎等
class Car {
    private Engine engine;
    private Tire tire;
    // ...
}
```

**设计原则**：优先使用组合，除非明显是"is-a"关系。

## 五、final关键字

final可以修饰：
1. 变量：表示常量
2. 方法：不能被子类重写
3. 类：不能被继承

```java
final class String {  // String类不可继承
    // ...
}
```

## 总结


> <font size = 4>【使用多态的好处】</font>
>能够降低代码的 "**圈复杂度**", 避免使用大量的 ==if - else==
>什么叫 "**圈复杂度**" ?
>圈复杂度是一种描述一段代码复杂程度的方式. 一段代码如果平铺直叙, 那么就比较简单容易理解. 而如果有很多的条件分支或者循环语句, 就认为理解起来更复杂.因此我们可以简单粗暴的计算一段代码中条件语句和循环语句出现的个数, 这个个数就称为 "圈复杂度".如果一个方法的圈复杂度太高, 就需要考虑重构.

继承和多态是Java面向对象编程的核心概念，掌握它们对于写出优雅、灵活的代码至关重要。记住：
- 继承用于代码复用和建立"is-a"关系
- 多态让程序更灵活、更易扩展
- 合理使用final可以增强安全性
- 组合优于继承是良好的设计原则


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
