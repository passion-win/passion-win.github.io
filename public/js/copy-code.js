document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    if (!pre.querySelector('.copy-btn')) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.innerHTML = '📋 复制';
      copyBtn.title = '点击复制代码';

      copyBtn.addEventListener('click', () => {
        const code = codeBlock.textContent;
        navigator.clipboard.writeText(code).then(() => {
          copyBtn.innerHTML = '✅ 已复制';
          setTimeout(() => {
            copyBtn.innerHTML = '📋 复制';
          }, 2000);
        }).catch(err => {
          copyBtn.innerHTML = '❌ 失败';
          console.error('复制失败:', err);
        });
      });

      pre.appendChild(copyBtn);
    }
  });
});