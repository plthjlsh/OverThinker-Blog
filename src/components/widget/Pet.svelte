<script>
  import { onMount } from 'svelte';

  let pet;
  let messageBox;
  let isVisible = false;
  let promptIndex = 0; // 用于轮询提示词的索引

  const prompts = [
    '请创造一句随机但是富有含义的一串符号，不超过20字。',
    '请生成一句类似搞怪寒暄的的句子,加上我的名字就比如“（打招呼）我是Tingo，不超过20字。“',
    '请生成一句简短的随机吐槽或名言，风格可爱有趣，长度不超过20字。',
    '请说一句幽默的短语或俏皮话，关于生活或编程，保持可爱风格，不超过20字。',
    '请创造一句随机的搞笑评论或智慧语录，稀奇古怪，不超过20字。',
    '请想出一句俏皮的吐槽或励志小语，风格活泼，不超过20字。',
    '请生成一句类似（不要这么频繁点我啦，我也会烦的）类似句子，加上颜文字直接讲',
    '请生成一句可爱的随机感言或玩笑话，关于日常或创意，不超过20字。',
    '请分享一句科技趣闻或冷知识（不要总是蜜蜂），保持趣味性，不超过20字。',
    '请说出一句鼓励人心的话语，温暖治愈，不超过20字。',
    '请创造一句随机但是富有含义的一串数字，不超过20字。',
    '请创作一句有关天气或季节的俏皮话，生动活泼，不超过20字。',
    '请编写一句关于美食或饮品的可爱描述，诱人有趣，不超过20字。',
    '请生成一句类似（不要这么频繁点我啦，我也会烦的）类似句子，加上颜文字直接讲',
    '请创造一句关于梦想或未来的憧憬话语，充满希望，不超过20字。',
    '请说出一句有关友谊或情感的暖心话语，真诚动人，不超过20字。',
    '请分享一句关于时间或回忆的感慨话语，富有哲理，不超过20字。',
    '请编一句有关旅行或冒险的兴奋话语，充满期待，不超过20字。',
    '请生成一句类似（不要这么频繁点我啦，我也会烦的）类似句子，加上颜文字直接讲'
  ];

  // 本地消息数组，用于API调用失败时的回退机制
  const messages = [
    "今天也要元气满满哦！",
    "代码写累了就休息一下吧~",
    "你是最棒的开发者！",
    "遇到bug不要慌，慢慢调试~",
    "保持好奇心，每天学点新知识！",
    "记得多喝水，照顾好自己！",
    "编程路上，我们一起进步！",
    "今天的你比昨天更厉害了！",
    "别担心，每个大牛都曾是小白~",
    "灵感总会来的，不如先去喝杯咖啡？",
    "错误是成长的阶梯，加油！",
    "你的努力终将开花结果！",
    "相信自己，一切皆有可能！",
    "享受编程的乐趣吧！",
    "每一个bug被解决都是进步！"
  ];

  // 宠物表情数组
  const petExpressions = [
    // 默认猫脸表情
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='6' y='6' width='20' height='20' fill='%23000'/%3E%3Crect x='10' y='10' width='2' height='2' fill='%2300ff00'/%3E%3Crect x='20' y='10' width='2' height='2' fill='%2300ff00'/%3E%3Crect x='14' y='16' width='4' height='2' fill='%2300ff00'/%3E%3C/svg%3E",
    // 开心表情
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='6' y='6' width='20' height='20' fill='%23000'/%3E%3Crect x='10' y='10' width='2' height='2' fill='%2300ff00'/%3E%3Crect x='20' y='10' width='2' height='2' fill='%2300ff00'/%3E%3Cpath d='M12 20 Q16 24 20 20' stroke='%2300ff00' stroke-width='2' fill='none'/%3E%3C/svg%3E",
    // 惊讶表情
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='6' y='6' width='20' height='20' fill='%23000'/%3E%3Ccircle cx='11' cy='11' r='2' fill='%2300ff00'/%3E%3Ccircle cx='21' cy='11' r='2' fill='%2300ff00'/%3E%3Cellipse cx='16' cy='20' rx='4' ry='3' fill='%2300ff00'/%3E%3C/svg%3E",
    // 爱心表情
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='6' y='6' width='20' height='20' fill='%23000'/%3E%3Crect x='10' y='10' width='2' height='2' fill='%2300ff00'/%3E%3Crect x='20' y='10' width='2' height='2' fill='%2300ff00'/%3E%3Cpath d='M16 18 C14 16 12 18 12 20 C12 22 14 24 16 26 C18 24 20 22 20 20 C20 18 18 16 16 18 Z' fill='%2300ff00'/%3E%3C/svg%3E",
    // 眨眼表情
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='6' y='6' width='20' height='20' fill='%23000'/%3E%3Crect x='10' y='10' width='2' height='2' fill='%23000'/%3E%3Crect x='20' y='10' width='2' height='2' fill='%2300ff00'/%3E%3Crect x='14' y='16' width='4' height='2' fill='%2300ff00'/%3E%3C/svg%3E",
    // 思考表情
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='6' y='6' width='20' height='20' fill='%23000'/%3E%3Crect x='10' y='10' width='2' height='2' fill='%2300ff00'/%3E%3Crect x='20' y='10' width='2' height='2' fill='%2300ff00'/%3E%3Crect x='14' y='18' width='4' height='1' fill='%2300ff00'/%3E%3Crect x='22' y='14' width='3' height='1' fill='%2300ff00'/%3E%3C/svg%3E"
  ];

  let currentExpression = 0;

  async function showRandomMessage() {
    // 随机切换宠物表情
    currentExpression = Math.floor(Math.random() * petExpressions.length);
    pet.style.setProperty('--pet-expression', `url("${petExpressions[currentExpression]}")`);

    try {
      // Call DeepSeek API directly from client
      const apiKey = 'sk-dcfaa2e2f9274e1693c8aeb09e9bf49d';
      // 轮询使用提示词，确保每个提示词都能被均匀使用
      const randomPrompt = prompts[promptIndex];
      promptIndex = (promptIndex + 1) % prompts.length; // 循环递增索引
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: randomPrompt
            }
          ],
          max_tokens: 50,
          temperature: 1.0,
        }),
      });
      const data = await response.json();
      const message = data.choices[0]?.message?.content?.trim() || '哎呀，出错了！';
      messageBox.textContent = message;
    } catch (error) {
      console.error('Error fetching message:', error);
      // 回退到本地消息
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      messageBox.textContent = randomMessage;
    }
    isVisible = true;
    setTimeout(() => {
      isVisible = false;
      // 3秒后恢复默认表情
      pet.style.setProperty('--pet-expression', `url("${petExpressions[0]}")`);
    }, 3000);
  }

  onMount(() => {
    // 可以添加一些初始化逻辑
  });
</script>

<style>
  .pet {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 64px;
    height: 64px;
    cursor: pointer;
    z-index: 1000;
    /* 黑绿风格 */
    background: #000;
    border: 2px solid #00ff00;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #00ff00;
    /* 像素化效果 */
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }

  .pet:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }

  .message-box {
    position: fixed;
    bottom: 100px;
    left: 20px;
    background: #000;
    color: #00ff00;
    border: 1px solid #00ff00;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 14px;
    max-width: 200px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s, transform 0.3s;
    z-index: 1001;
    pointer-events: none;
  }

  .message-box.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* 简单的像素宠物图形 */
  .pet::before {
    content: '';
    width: 32px;
    height: 32px;
    background: #00ff00;
    position: relative;
    display: block;
    /* 简单的像素猫脸 */
    background-image: var(--pet-expression, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='6' y='6' width='20' height='20' fill='%23000'/%3E%3Crect x='10' y='10' width='2' height='2' fill='%2300ff00'/%3E%3Crect x='20' y='10' width='2' height='2' fill='%2300ff00'/%3E%3Crect x='14' y='16' width='4' height='2' fill='%2300ff00'/%3E%3C/svg%3E"));
    background-size: 32px 32px;
  }
</style>

<div class="pet" bind:this={pet} on:click={showRandomMessage}>
  <!-- 宠物图形 -->
</div>

<div class={isVisible ? 'message-box visible' : 'message-box'} bind:this={messageBox}>
  <!-- 消息内容 -->
</div>