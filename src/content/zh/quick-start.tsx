export default function QuickStartZh() {
  return (
    <>
      <h2>快速开始</h2>
      <p>
        本指南将帮助您在 5 分钟内开始使用 Rethink AI 进行对话分析。
      </p>

      <h2>第一步：创建账户</h2>
      <ol>
        <li>访问 <a href="/zh/auth/register">注册页面</a></li>
        <li>输入您的手机号码</li>
        <li>输入收到的验证码（测试环境请使用：<code>123456</code>）</li>
        <li>完成注册</li>
      </ol>

      <h2>第二步：导出聊天记录</h2>
      <p>
        根据您使用的聊天工具，选择对应的导出方式：
      </p>

      <h3>微信</h3>
      <ol>
        <li>打开与目标联系人的聊天窗口</li>
        <li>点击右上角「...」</li>
        <li>选择「聊天记录」→「导出聊天记录」</li>
        <li>选择「文本格式」导出</li>
      </ol>

      <h3>WhatsApp</h3>
      <ol>
        <li>打开聊天窗口</li>
        <li>点击右上角菜单</li>
        <li>选择「更多」→「导出聊天」</li>
        <li>选择「不包含媒体」</li>
      </ol>

      <h3>Telegram</h3>
      <ol>
        <li>打开 Telegram Desktop</li>
        <li>进入目标聊天</li>
        <li>点击右上角菜单 →「导出聊天记录」</li>
        <li>选择 JSON 格式</li>
      </ol>

      <h2>第三步：上传并分析</h2>
      <ol>
        <li>登录您的 Rethink AI 账户</li>
        <li>进入控制台页面</li>
        <li>点击「开始新分析」</li>
        <li>上传您导出的聊天记录文件</li>
        <li>等待 AI 分析完成（通常需要 1-2 分钟）</li>
      </ol>

      <h2>第四步：查看分析报告</h2>
      <p>
        分析完成后，您将看到一份详细的报告，包括：
      </p>
      <ul>
        <li><strong>性格画像</strong> - 多维度的性格特征分析</li>
        <li><strong>情绪曲线</strong> - 对话过程中的情绪变化趋势</li>
        <li><strong>诉求清单</strong> - 对方表达的需求和潜在意图</li>
        <li><strong>沟通建议</strong> - 基于分析结果的沟通策略建议</li>
      </ul>

      <h2>常见问题</h2>

      <h3>支持哪些文件格式？</h3>
      <p>
        目前支持 <code>.txt</code>、<code>.json</code>、<code>.csv</code> 格式的聊天记录文件。
      </p>

      <h3>分析需要多长时间？</h3>
      <p>
        根据聊天记录的长度，分析时间通常在 1-5 分钟之间。
      </p>

      <h3>免费版有什么限制？</h3>
      <p>
        免费版每月可进行 10 次分析，支持基础的性格和情绪分析。
        如需更多分析次数和高级功能，请升级到专业版。
      </p>

      <h2>下一步</h2>
      <p>
        想了解更多关于聊天记录导入的详细说明？请阅读
        <a href="./chatlog-integration">对接聊天记录</a>文档。
      </p>
    </>
  );
}
