---
title: "Java从入门到“放弃”（精通）之旅——程序逻辑控制④"
published: 2024-04-15
description: "方法能将特定功能齿轮组封装起来。把重复执行的代码逻辑收纳其中，对外仅露出简洁的调用接口，需要执行相应功能时，只需精准呼唤方法之名，"
image: "https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/cover.webp"
tags: ["JavaSE", "博客"]
category: JavaSE
pinned: false
draft: false
---

# Java从入门到“放弃”（精通）之旅🚀：程序逻辑的完美理解
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/decorate.gif)

## 一、开篇：程序员的"人生选择"

> 曾经的我，生活就像一段顺序执行的代码：
>
>```java
>System.out.println("早上8:00起床");
>System.out.println("洗漱");
>System.out.println("吃早饭");
>// ... 重复枯燥的生活
>```
>
>直到某天，我的代码里加入了**分支结构**：
>
>```java
>if(不好好学习){
>    System.out.println("可能要卖红薯🍠");
>}else{
>    System.out.println("好好学习，走上人生巅峰💪");
>}
>```
>
>从此，我的生活变成了充满循环的奋斗史：
>
>```java
>while(活着){
>    学习();
>    敲代码();
>    刷题();
>    if(竞赛拿奖){
>        Score++;
>    }
>}
>```

## 二、顺序结构：代码界的"直男"
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/d/1.png)

顺序结构就像直男的思维——简单直接，一步一个脚印：

```java
System.out.println("第一步：起床");
System.out.println("第二步：打开IDE");
System.out.println("第三步：假装自己在学习");
```

> ⚠️ 警告：千万别把第三步放到第一步前面，除非你想体验"梦中编程"的快乐。

## 三、分支结构：程序员的"选择困难症"

![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/d/2.png)
### 1. if语句：人生处处是选择

```java
if(熬夜时间 == 0){
    System.out.println("养生学霸型：早睡早起，成绩优异");
}else if(熬夜时间 <= 2){
    System.out.println("普通学生型：偶尔熬夜，生活规律");
}else if(熬夜时间 <= 4){
    System.out.println("期末冲刺型：咖啡续命，笔记飞起");
}else if(熬夜时间 <= 6){
    System.out.println("DDL战士型：生死时速，键盘冒烟");
}else{
    System.out.println("修仙大佬型：见过凌晨四点的校园吗？天天见！");
}
```

### 2. switch语句：多选项的烦恼

```java
switch(减压方式){
    case "写代码":
        System.out.println("这算减压？");
        break;
    case "改bug":
        System.out.println("这明明是增压！");
        break;
    default:
        System.out.println("还是熬夜吧");
}
```

> 🎓 冷知识：switch不支持long类型，就像程序员不支持长时间不写代码一样

## 四、循环结构：程序员的"复读机模式"

![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/d/3.png)
### 1. while循环：bug改不完的绝望

```java
while(bug存在){
    System.out.println("我再改最后一个bug");
    // 此处应有break，但程序员总是忘记
}
```

### 2. for循环：优雅的计数君

```java
for(int i=1; i<=熬夜天数; i++){
    System.out.println("第" + i + "天熬夜复习");
    
    if(i == 3){
        System.out.println("⚠️ 警告：黑眼圈已形成");
    }
    else if(i == 5){
        System.out.println("⚠️⚠️ 严重警告：开始靠咖啡续命");
    }
    else if(i == 7){
        System.out.println("💀 系统提示：您的健康值即将耗尽");
    }
    
    if(熬夜天数 >= 10){
        System.out.println("🎓 成就解锁：获得『考试周生存专家』称号！");
        break;
    }
}
```

### 3. do-while循环：至少执行一次的倔强

```java
do{
    System.out.println("我保证这是最后一次熬夜");
}while(咖啡因还起作用);
```

## 五、控制语句：程序员的"后悔药"

### 1. break：及时止损

```java
while(上课中){
    if(老师突然点名提问){
        System.out.println("【系统警报】检测到危险信号！");
        System.out.println("执行紧急预案：");
        System.out.println("1. 低头假装记笔记");
        System.out.println("2. 眼神躲避术启动");
        System.out.println("3. 默念'不要点我'");
        break; // 终止当前危机
    }
}
```

### 2. continue：选择性失忆

```java
for(一天中的时间){
    if(是睡觉时间){
        continue; // 跳过睡觉，继续coding
    }
    写代码();
}
```

## 六、实战演练：猜数字游戏 🎮

```java
import java.util.Random;
import java.util.Scanner;

public class GuessNumber {
    public static void main(String[] args) {
        Random random = new Random();
        Scanner sc = new Scanner(System.in);
        int target = random.nextInt(100) + 1; // 1-100的随机数
        System.out.println("欢迎来到猜数字游戏！(开发者已偷偷把答案设为：" + target + ")");
        
        while(true){
            System.out.println("请输入你的猜测(1-100):");
            int guess = sc.nextInt();
            
            if(guess < target){
                System.out.println("猜小了，再大胆点！");
            }else if(guess > target){
                System.out.println("猜大了，收着点！");
            }else{
                System.out.println("恭喜你猜对了！奖励一朵小红花🌸");
                break;
            }
        }
        sc.close();
    }
}
```

> 💡 彩蛋：把注释掉的`System.out.println("toGuess: " + toGuess);`取消注释，你就是游戏界的"内部人员"了！

## 七、练习题：程序员的"脑力激荡"

> 1. **年龄分段器**：输入年龄自动输出你是少年/青年/中年/老年（温馨提示：慎测程> 序员年龄）
> 
> ```java
> import java.util.Scanner;
> 
> public class AgeClassifier {
>     public static void main(String[] args) {
>         Scanner scanner = new Scanner(System.in);
>         System.out.print("请输入你的年龄：");
>         int age = scanner.nextInt();
>         
>         if (age < 0) {
>             System.out.println("年龄不能为负数！");
>         } else if (age <= 18) {
>             System.out.println("少年：青春无敌，好好学习！");
>         } else if (age <= 28) {
>             System.out.println("青年：奋斗的黄金时期，加油！");
>         } else if (age <= 55) {
>             System.out.println("中年：家庭事业双丰收的阶段");
>         } else {
>             System.out.println("老年：享受生活，保持健康");
>         }
>         
>         scanner.close();
>     }
> }
> ```


>    2. **素数鉴定师**：判断一个数是否为素数（数学老师看了都点赞）
> ```java 
> import java.util.Scanner;
> 
> public class PrimeChecker {
>     public static void main(String[] args) {
>         Scanner scanner = new Scanner(System.in);
>         System.out.print("请输入一个正整数：");
>         int num = scanner.nextInt();
>         
>         if (num <= 1) {
>             System.out.println(num + " 不是素数");
>             return;
>         }
>         
>         boolean isPrime = true;
>         for (int i = 2; i <= Math.sqrt(num); i++) {
>             if (num % i == 0) {
>                 isPrime = false;
>                 break;
>             }
>         }
>         
>         if (isPrime) {
>             System.out.println(num + " 是素数");
>         } else {
>             System.out.println(num + " 不是素数");
>         }
>         
>         scanner.close();
>     }
> }   
> ```

> 3. **闰年探测器**：找出1000-2000年所有闰年（历史学家都说好）
>
> ```java
>在这里插入代码片public class LeapYearFinder {
>    public static void main(String[] args) {
>        System.out.println("1000-2000年之间的闰年有：");
>        int count = 0;
>        
>        for (int year = 1000; year <= 2000; year++) {
>            if (isLeapYear(year)) {
>                System.out.print(year + " ");
>                count++;
>                if (count % 10 == 0) { // 每10个换一行
>                    System.out.println();
>                }
>            }
>        }
>        
>        System.out.println("\n共计：" + count + "个闰年");
>    }
>    
>    // 判断闰年的方法
>    public static boolean isLeapYear(int year) {
>        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
>    }
>}
>```

   
> 4. **水仙花数**：找出所有水仙花数（比真花还难找的数字）
> 
> ```java
> public class NarcissisticNumber {
>     public static void main(String[] args) {
>         System.out.println("所有的三位数水仙花数：");
>         
>         for (int num = 100; num < 1000; num++) {
>             int hundreds = num / 100;
>             int tens = (num / 10) % 10;
>             int units = num % 10;
>             
>             // 计算各位数字的立方和
>             int sum = (int)(Math.pow(hundreds, 3) + 
>                      (int)(Math.pow(tens, 3)) + 
>                      (int)(Math.pow(units, 3));
>             
>             if (sum == num) {
>                 System.out.println(num + " 是水仙花数");
>                 System.out.println("验证：" + hundreds + "³ + " + tens + "³ + " + units + "³   = " + sum);
>             }
>         }
>     }
> }
> ```

   
> 5. **二进制解剖**：分析数字的二进制表示（让你看清数字的"本质"）
>
>```java
>import java.util.Scanner;
>
>public class BinaryAnalyzer {
>    public static void main(String[] args) {
>        Scanner scanner = new Scanner(System.in);
>        System.out.print("请输入一个整数：");
>        int num = scanner.nextInt();
>        
>        System.out.println("原始数字：" + num);
>        System.out.println("二进制表示：" + Integer.toBinaryString(num));
>        
>        // 计算1的个数
>        int count = Integer.bitCount(num);
>        System.out.println("二进制中1的个数：" + count);
>        
>        // 输出奇数位和偶数位
>        System.out.print("奇数位（从右往左数，第一位为1）：");
>        for (int i = 31; i >= 0; i--) {
>            if (i % 2 == 0) { // 奇数位（因为从0开始计数）
>                System.out.print((num >> i) & 1);
>            }
>        }
>        
>        System.out.print("\n偶数位：");
>        for (int i = 31; i >= 0; i--) {
>            if (i % 2 == 1) { // 偶数位
>                System.out.print((num >> i) & 1);
>            }
>        }
>        
>        scanner.close();
>    }
>}
>```

## 八、关于一些格式化字符串
![在这里插入图片描述](https://overthinker.oss-cn-guangzhou.aliyuncs.com/ima_for_overthinker/JavaSE/JavaSE/d/4.png)


## 九、结语：代码如人生

记住，编程就像人生：
- 顺序执行是基础
- 分支选择决定方向
- 循环坚持才能成功
- 偶尔break是为了更好的continue

🔑🔑🔑
```java
while(活着){
    学习();
    进步();
    if(遇到bug){
        解决它();
    }else{
        制造bug(); // 这样才能进步
    }
}
```

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
