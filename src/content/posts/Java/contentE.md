---
title: "Java从入门到“放弃”（精通）之旅——方法的使用⑤"
published: 2024-04-15
description: "方法能将特定功能齿轮组封装起来。把重复执行的代码逻辑收纳其中，对外仅露出简洁的调用接口，需要执行相应功能时，只需精准呼唤方法之名"
image: "https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/cover.webp"
tags: ["JavaSE", "博客"]
category: JavaSE
pinned: false
draft: false
---
# Java从入门到“放弃”（精通）之旅🚀——方法的使用⑤
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/decorate.gif)

## 📖引言：


在编程领域，代码如同精密的齿轮相互咬合驱动程序运转。随着项目规模渐长，重复的代码片段如同冗余的齿轮，不仅增加负重，还易导致故障。

而<font color=red size = 5>**方法**</font>，恰似能将特定功能齿轮组封装起来的黑匣子。把重复执行的代码逻辑收纳其中，对外仅露出简洁的调用接口。需要执行相应功能时，只需精准呼唤方法之名，就如同转动黑匣子外的把手，内部精巧的齿轮组便会有序运转，高效输出预期结果。这将复杂的功能模块化、抽象化，提升代码的可读性、可维护性与复用性，此即Java中方法的本质所在。 

---

## 一、方法基础：告别"复制粘贴"的苦日子

### 1. 方法定义：你的第一个代码模板

Java定义方法的语法：
```java
public static 返回值类型 方法名(参数类型 参数名) {
    // 方法体（你的骚操作）
    return 返回值; // 如果有的话
}
```

**举个栗子🌰**：判断闰年
```java
public static boolean isLeapYear(int year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}
```

**关键点速记**：
- `public static`：表示公开属性并且是静态的
- **方法名**：建议`动词+名词`，比如`calculateSum`（千万别用`a1`、`test2`这种名字）
- **参数**：像点奶茶时的选项——要加珍珠吗？要几分糖？

### 2. 方法调用：让代码"自己动"

> **举个栗子🌰**：
> 当你写下`add(1, 2)`，**JVM**在幕后做了这些：
> 1. 找到`add`方法地址（找到收藏的奶茶店）
> 2. 把`1`和`2`传给方法（提交点单）
> 3. 执行方法体（店员做奶茶）
> 4. 返回结果（奶茶送到家）

**代码示例**：
```java
public static void main(String[] args) {
    System.out.println("2+3=" + add(2, 3)); // 输出：5
}

public static int add(int a, int b) {
    return a + b;
}
```
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/e/1.png)

---

## 二、方法进阶：玩转参数与返回值

### 1. 形参 vs 实参：分清"菜谱"和"食材"
- **形参**：方法定义时的参数（就像菜谱里的"适量"）
- **实参**：方法调用时传入的值（就像实际放的盐）
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/e/2.png)

```java
// 形参：a, b
public static int add(int a, int b) {
    return a + b;
}

public static void main(String[] args) {
    int x = 2, y = 3;
    add(x, y); // 实参：x, y
}
```

### 2. 值传递的陷阱：为什么交换失败了？
```java
public static void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp; // 这里交换的只是形参！
}
```
**原因**：Java是值传递，方法内操作的是参数的拷贝。*想真正交换要等学到了数组*

###  3.没有返回值的方法:void
方法的返回值是可以选择的，当没有返回值时，返回值类型必须写成<font color=red size = 5>**void**</font>！
代码示例：

```java
public static void main(String[] args) { 
	int a = 10; 
	int b = 20;
	print(a, b); 
}
public static void print(int x, int y) {
 	 System.out.println("x = " + x + " y = " + y); 
} 
```
 ---
## 三、方法重载：Java版的"一词多义"

### 1. 为什么需要重载？
想象去奶茶店：
- 你："要一杯奶茶"
- 店员："？？？（冰的热的？加糖吗？大杯中杯？）"

**代码版悲剧**：
```java
add(1, 2); // OK
add(1.5, 2.5); // 报错：所需参数是int，却传递double
```

### 2. 重载的正确打开方式
**规则**：方法名相同，参数列表不同（类型、个数、顺序）
```java
// 整型加法
public static int add(int a, int b) { return a + b; }

// 浮点加法 
public static double add(double a, double b) { return a + b; }

// 三数相加
public static int add(int a, int b, int c) { return a + b + c; }
```

**注意**：**返回值类型不同不算重载**！下面这个会报错：
```java
public static int add(int a, int b) {...}
public static double add(int a, int b) {...} // 编译错误
```

---

## 四、递归：程序员的"套娃"艺术
>**生活中的故事**
>从前有坐山，山上有座庙，庙里有个老和尚给小和尚将故事，讲的就是：
 >"从前有座山，山上有座庙，庙里有个老和尚给小和尚讲故事，讲的就是：
 >"从前有座山，山上有座庙..."
 >"从前有座山……"
>![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/e/3.png)

### 1. 递归三要素
- **出口条件**：什么时候结束套娃
- **递推公式**：如何把问题拆解成子问题
- **调用自身**：我调用我自己

**阶乘示例**：
```java
public static int factorial(int n) {
    if (n == 1) { // 出口条件
        return 1;
    }
    return n * factorial(n - 1); // 递推公式 + 调用自身
}
```

### 2. 递归执行过程（以factorial(5)为例）
```
factorial(5)
│
├─ 5 * factorial(4)
│     │
│     ├─ 4 * factorial(3)
│     │     │
│     │     ├─ 3 * factorial(2)
│     │     │     │
│     │     │     ├─ 2 * factorial(1)
│     │     │     │     │
│     │     │     │     └─ return 1
│     │     │     │
│     │     │     └─ return 2
│     │     │
│     │     └─ return 6
│     │
│     └─ return 24
│
└─ return 120
```
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/e/4.pngg)

### 3. 递归的坑：斐波那契数列的悲剧
```java
public static int fib(int n) {
    if (n <= 2) return 1;
    return fib(n-1) + fib(n-2); // 重复计算爆炸！
}
```
**改进方案**：用循环或记忆化搜索

---

## 五、结语：方法使用的"三大纪律"

1. **不要重复造轮子**：能用方法就别复制粘贴
2. **命名要见名知意**：别用`a1`、`func2`这种名字
3. **单一职责原则**：一个方法只做一件事

记住：**好的方法设计，能让你的代码变得简洁高效！**

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
