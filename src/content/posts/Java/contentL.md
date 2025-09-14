---
title: "Java从入门到“放弃”（精通）之旅——反射、枚举与Lambda"
published: 2024-04-29
description: "本文介绍了Java三大特性：反射、枚举和Lambda表达式）"
image: "https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/cover.webp"
tags: ["JavaSE", "博客"]
category: JavaSE
pinned: false
draft: false
---

# Java从入门到“放弃”（精通）之旅🚀——反射、枚举与Lambda

![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/decorate.gif)

## 一、反射：Java的“照妖镜”🔍

### 1.1 什么是反射？
想象一下，你正在参加一个化妆舞会，每个人都戴着面具。突然，你掏出一面“照妖镜”（反射），不仅能看穿对方的面具（私有属性），还能让对方即兴跳支舞（调用私有方法）。这就是Java反射——**在运行时窥探和操作类的私密信息**。

### 1.2 反射的“武器库”
反射四大金刚：

| 类名          | 用途                     |
|---------------|--------------------------|
| `Class`       | 代表类的实体（一切起点） |
| `Field`       | 操作属性（甚至私有）     |
| `Method`      | 调用方法（包括私有的）   |
| `Constructor` | 调用构造方法（偷偷new对象）|

### 1.3 获取Class对象的三种姿势

```java
// 1. 通过对象getClass()（最直白）
Student s1 = new Student();
Class c1 = s1.getClass();

// 2. 通过类名.class（最安全）
Class c2 = Student.class;

// 3. 通过Class.forName()（最常用，但容易翻车）
Class c3 = Class.forName("com.example.Student"); // 注意全限定名！
```

> 💡**冷知识**：一个类在JVM中只有一个Class实例，所以`c1==c2==c3`都是`true`！

### 1.4 反射实战：偷看私有日记📖

```java
public class ReflectClassDemo {
    // 1. 反射创建对象（无参构造）
    public static void reflectNewInstance() {
        try {
            Class<?> clazz = Class.forName("Student");
            Student student = (Student) clazz.newInstance(); // 相当于new Student()
            System.out.println("反射创建对象: " + student);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 2. 反射私有构造方法（带参数）
    public static void reflectPrivateConstructor() {
        try {
            Class<?> clazz = Class.forName("Student");
            Constructor<?> constructor = clazz.getDeclaredConstructor(String.class, int.class);
            constructor.setAccessible(true); // 关键！突破私有限制
            Student student = (Student) constructor.newInstance("高博", 15);
            System.out.println("反射私有构造: " + student);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 3. 反射私有属性（修改name）
    public static void reflectPrivateField() {
        try {
            Class<?> clazz = Class.forName("Student");
            Field field = clazz.getDeclaredField("name");
            field.setAccessible(true); // 再次突破限制
            Student student = (Student) clazz.newInstance();
            field.set(student, "小明"); // 偷偷改名字
            System.out.println("修改后的name: " + field.get(student));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 4. 反射私有方法（调用function）
    public static void reflectPrivateMethod() {
        try {
            Class<?> clazz = Class.forName("Student");
            Method method = clazz.getDeclaredMethod("function", String.class);
            method.setAccessible(true); // 继续突破
            Student student = (Student) clazz.newInstance();
            method.invoke(student, "我是参数"); // 偷偷调用方法
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

> ⚠️**警告**：反射虽好，可不要滥用哦！否则你的代码会变成“蜘蛛网”，维护起来想哭。

---

## 二、枚举：Java的“选择题”🔘

### 2.1 为什么需要枚举？
以前定义常量：

```java
public static final int RED = 1;
public static final int GREEN = 2;
public static final int BLACK = 3;
```

问题：  
- 容易混淆（`1`是RED还是ERROR？）  
- 没有类型安全（你可以把`1`赋值给任何int）

枚举来了！

```java
public enum Color {
    RED, GREEN, BLACK, WHITE;
}
```

现在`Color.RED`是一个类型安全的常量，再也不会和`1`搞混了！

### 2.2 枚举的高级玩法（带参数的枚举）

```java
public enum Color {
    RED("红色", 1), GREEN("绿色", 2), BLACK("黑色", 3), WHITE("白色", 4);

    private String name;
    private int key;

    // 枚举构造默认是私有的！
    private Color(String name, int key) {
        this.name = name;
        this.key = key;
    }

    public static Color getByKey(int key) {
        for (Color color : values()) {
            if (color.key == key) {
                return color;
            }
        }
        return null;
    }
}
```

### 2.3 枚举与反射的“爱恨情仇”

尝试用反射创建枚举实例：

```java
public static void reflectPrivateConstructor() {
    try {
        Class<?> clazz = Class.forName("Color");
        Constructor<?> constructor = 
            clazz.getDeclaredConstructor(String.class, int.class, String.class, int.class);
        constructor.setAccessible(true);
        Object object = constructor.newInstance("父类参数", 666, "子类参数", 888);
        Color color = (Color) object;
        System.out.println("反射创建枚举: " + color);
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

输出：

```
java.lang.IllegalArgumentException: Cannot reflectively create enum objects
```

**结论**：枚举防反射！这是Java专门设计的安全机制。所以枚举实现单例模式是安全的（阿里面试题哦！）。

---

## 三、Lambda表达式：Java的“瘦身教练”💃

### 3.1 什么是Lambda？
以前写匿名内部类：

```java
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello");
    }
};
```

现在：

```java
Runnable r = () -> System.out.println("Hello");
```

从“臃肿大叔”变身“精神小伙”！

### 3.2 函数式接口（Lambda的前提）

只有一个抽象方法的接口就是函数式接口。可以用`@FunctionalInterface`注解标记。

```java
@FunctionalInterface
interface NoParameterNoReturn {
    void test();
    // 可以有默认方法
    default void test2() {
        System.out.println("我是默认方法");
    }
}
```

### 3.3 Lambda语法精简规则

1. 参数类型可省略  
2. 只有一个参数时，`()`可省略  
3. 方法体只有一句时，`{}`可省略  
4. 有返回值且只有一句时，`return`可省略

示例：

```java
// 1. 无参无返回值
NoParameterNoReturn () -> System.out.println("Hello");

// 2. 有参无返回值
OneParameterNoReturn a -> System.out.println(a);

// 3. 有参有返回值
MoreParameterReturn (a, b) -> a + b; // 自动return
```

### 3.4 Lambda在集合中的应用

#### forEach遍历：

```java
List<String> list = Arrays.asList("Hello", "bit", "Lambda");
list.forEach(s -> System.out.println(s));
```

#### sort排序：

```java
list.sort((s1, s2) -> s1.length() - s2.length());
```

#### Map遍历：

```java
Map<Integer, String> map = new HashMap<>();
map.put(1, "Hello");
map.put(2, "Lambda");
map.forEach((k, v) -> System.out.println(k + "=" + v));
```

### 3.5 变量捕获（Lambda的“闭包”）

Lambda只能捕获**final或等效final**的局部变量。

```java
int a = 10;
NoParameterNoReturn r = () -> {
    // a = 20; // 错误！不能修改捕获的变量
    System.out.println(a); // 可以读取
};
```

---

## 四、总结：三剑客的优缺点

| 技术       | 优点                          | 缺点                     |
|------------|-------------------------------|--------------------------|
| **反射**   | 动态、灵活、框架基石          | 性能低、代码复杂、不安全 |
| **枚举**   | 安全、清晰、防反射            | 不可继承、扩展性差       |
| **Lambda** | 代码简洁、函数式编程、并行友好 | 可读性差、调试困难       |

---

## 五、彩蛋：单例模式大PK

### 5.1 静态内部类实现

```java
class Singleton {
    private Singleton() {}
    private static class Holder {
        private static final Singleton INSTANCE = new Singleton();
    }
    public static Singleton getInstance() {
        return Holder.INSTANCE;
    }
}
```

### 5.2 枚举实现（最安全！）

```java
public enum Singleton {
    INSTANCE;
    public void doSomething() {
        System.out.println("我是单例！");
    }
}
// 使用：Singleton.INSTANCE.doSomething();
```

---

> 最后提醒：  
> - 反射要用在正道（框架、工具），别偷看别人隐私！  
> - 枚举是单例的最佳选择，安全又省心。  
> - Lambda能让代码变帅，但别写得太抽象，否则同事会打你。

---

**致谢**：感谢Java设计者给了我们这么多好玩的东西，也感谢各位佬们的关注和支持，点个赞再走吧😊
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/l/1.gif)



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
