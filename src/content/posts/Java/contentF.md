---
title: "Java从入门到“放弃”（精通）之旅——数组的定义与使用⑥"
published: 2024-04-19
description: "文章系统介绍了Java数组的基础知识与应用，包括数组概念、特点、创建与初始化方式、元素访问与遍历方法等核心内容"
image: "https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/cover.webp"
tags: ["JavaSE", "博客"]
category: JavaSE
pinned: false
draft: false
---

# Java从入门到“放弃”（精通）之旅🚀——数组⑥
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/decorate.gif)


## 前言——什么是数组？
数组：可以看成是相同类型元素的一个集合，在内存中是一段连续的空间。比如现实中的车库，在java中，包含6个整形类型元素的数组，就相当于上图中连在一起的6个车位，从下图中可以看到：
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/f/1.png)

## 📖一、数组的基本概念

### 1.1 为什么需要数组
考虑存储5个学生的考试成绩：

```java
// 传统方式
int score1 = 70;
int score2 = 80;
// ...需要定义多个变量
```

这种方式在数据量大时非常不便。数组应运而生，它可以存储**相同类型**的多个数据，是内存中的一段**连续空间**。


### 1.2 数组的特点
- 元素类型相同
- 内存空间连续
- 通过下标访问（从0开始）

## 🔛二、数组的创建与初始化

### 2.1 数组创建语法
```java
T[] 数组名 = new T[N];  // T:元素类型，N:数组长度
```
示例：
```java
int[] array1 = new int[10];      // 10个int
double[] array2 = new double[5]; // 5个double
```

### 2.2 初始化方式
**动态初始化**：指定长度
```java
int[] array = new int[10];  // 默认值0
```

**静态初始化**：指定内容
```java
int[] array1 = new int[]{1,2,3};
// 简写形式
int[] array2 = {1,2,3};  
```

> **注意**：
> - 静态初始化无需指定长度
> - 简写形式不能拆分两步操作

### 2.3 默认值规则
## ✅Java数组元素默认值对照表

| 数据类型  | 默认值      |
|-----------|------------|
| byte      | 0          |
| short     | 0          |
| int       | 0          |
| long      | 0          |
| float     | 0.0f       |
| double    | 0.0        |
| char      | '\u0000'   |
| boolean   | false      |

### 说明：
1. 数值类型（byte/short/int/long/float/double）默认值均为0
2. char类型默认是Unicode空字符（\u0000）
3. boolean类型默认false
4. 引用类型（如String、Object等）默认值为null

> 注意：当数组被创建但未显式初始化时，各元素会被自动赋予对应类型的默认值
## 🔧三、数组的使用

### 3.1 元素访问
```java
int[] arr = {10,20,30};
System.out.println(arr[0]); // 10
arr[0] = 100; // 修改元素
```

> **重要**：下标从0开始，越界会抛出`ArrayIndexOutOfBoundsException`

### 3.2 遍历数组
**传统for循环**：
```java
for(int i=0; i<arr.length; i++){
    System.out.println(arr[i]);
}
```

**增强for循环(for-each)**：
```java
for(int num : arr){
    System.out.println(num);
}
```

## 🤖四、数组的内存模型

### 4.1 JVM内存划分
- **栈**：存储局部变量
- **堆**：存储对象和数组
- 方法区、程序计数器等
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/f/2.png)

### 4.2 引用类型特性（简化版指针）
```java
int[] arr1 = new int[]{1,2,3};
int[] arr2 = arr1;  // 两个引用指向同一数组
```

## 🕹️五、数组常见操作

### 5.1 数组拷贝
>**浅拷贝**：
>```java
>int[] newArr = arr;  // 共享同一数组
>```
>**示意图：**
>![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/f/3.png)

>**深拷贝**：
>```java
>// 方法1：System.arraycopy
>int[] newArr = new int[arr.length];
>System.arraycopy(arr, 0, newArr, 0, arr.length);
>
>// 方法2：Arrays.copyOf
>int[] newArr = Arrays.copyOf(arr, arr.length);
>```
>**示意图：**
>![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/f/4.png)

### 5.2 数组排序
**冒泡排序**：
```java
void bubbleSort(int[] arr){
    for(int i=0; i<arr.length-1; i++){
        for(int j=0; j<arr.length-1-i; j++){
            if(arr[j] > arr[j+1]){
                int tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
            }
        }
    }
}
```


**内置排序**：
```java
Arrays.sort(arr);  // 快速排序实现
```

### 5.3 二分查找
```java
int binarySearch(int[] arr, int key){
    int left = 0, right = arr.length-1;
    while(left <= right){
        int mid = (left + right)/2;
        if(arr[mid] == key) return mid;
        else if(arr[mid] < key) left = mid+1;
        else right = mid-1;
    }
    return -1;
}
```

## 📜六、二维数组

### 6.1 基本使用
```java
int[][] arr = {
    {1,2,3},
    {4,5,6}
};

// 遍历
for(int i=0; i<arr.length; i++){
    for(int j=0; j<arr[i].length; j++){
        System.out.print(arr[i][j]+" ");
    }
    System.out.println();
}
```

## ⚙️七、实际应用案例

### 7.1 斐波那契数列
```java
public static int[] fib(int n){
    if(n <= 0) return null;
    int[] arr = new int[n];
    arr[0] = arr[1] = 1;
    for(int i=2; i<n; i++){
        arr[i] = arr[i-1] + arr[i-2];
    }
    return arr;
}
```
### 7.2 冒泡排序

```java
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换arr[j]和arr[j + 1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] array = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(array);
        for (int num : array) {
            System.out.print(num + " ");
        }
    }
}
```
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/DataStructure/h/p5.gif)



### 7.2 数组工具类
```java
// 数组转字符串
String str = Arrays.toString(arr);

// 数组填充
Arrays.fill(arr, 0);  // 全部填充为0
```



## 总结
数组作为Java中的基础数据结构，具有以下特点：
1. 存储相同类型元素的集合
2. 内存空间连续，支持随机访问
3. 长度固定，初始化后不可改变
4. 作为引用类型，需要注意深浅拷贝问题

**掌握数组的各种操作和特性，是Java编程的重要基础。在实际开发中，应根据需求选择合适的数组操作方式，并注意避免常见的数组越界等问题。**

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
