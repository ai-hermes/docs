export default function ChatlogIntegrationZh() {
  return (
    <>
      <h2>对接聊天记录</h2>
      <p>
        本文档详细介绍如何从各种聊天工具导出记录并导入到 Rethink AI 进行分析。
      </p>

      <h2>支持的聊天工具</h2>
      <table>
        <thead>
          <tr>
            <th>聊天工具</th>
            <th>支持格式</th>
            <th>导出方式</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>微信</td>
            <td>TXT</td>
            <td>内置导出功能</td>
          </tr>
          <tr>
            <td>WhatsApp</td>
            <td>TXT</td>
            <td>内置导出功能</td>
          </tr>
          <tr>
            <td>Telegram</td>
            <td>JSON, HTML</td>
            <td>Desktop 导出</td>
          </tr>
          <tr>
            <td>iMessage</td>
            <td>CSV</td>
            <td>第三方工具</td>
          </tr>
          <tr>
            <td>LINE</td>
            <td>TXT</td>
            <td>内置导出功能</td>
          </tr>
        </tbody>
      </table>

      <h2>微信导出指南</h2>

      <h3>iOS 设备</h3>
      <ol>
        <li>打开微信，进入目标聊天</li>
        <li>点击右上角「...」进入聊天详情</li>
        <li>向下滑动，找到「聊天记录」</li>
        <li>选择「导出聊天记录」</li>
        <li>选择时间范围</li>
        <li>选择「文本格式」</li>
        <li>通过「文件」应用保存到本地</li>
      </ol>

      <h3>Android 设备</h3>
      <ol>
        <li>打开微信，进入目标聊天</li>
        <li>点击右上角「...」</li>
        <li>选择「查找聊天记录」</li>
        <li>点击右上角「导出」</li>
        <li>选择保存位置</li>
      </ol>

      <h2>WhatsApp 导出指南</h2>

      <h3>导出步骤</h3>
      <ol>
        <li>打开 WhatsApp</li>
        <li>进入目标聊天</li>
        <li>点击联系人名称或群组名称</li>
        <li>向下滑动找到「导出聊天」</li>
        <li>选择「不包含媒体文件」</li>
        <li>选择保存或分享方式</li>
      </ol>

      <h3>注意事项</h3>
      <ul>
        <li>导出的文件包含所有聊天记录</li>
        <li>建议选择「不包含媒体」以减小文件大小</li>
        <li>文件格式为 <code>.txt</code></li>
      </ul>

      <h2>Telegram 导出指南</h2>

      <h3>使用 Telegram Desktop</h3>
      <ol>
        <li>下载并登录 Telegram Desktop</li>
        <li>打开目标聊天</li>
        <li>点击右上角三个点</li>
        <li>选择「导出聊天记录」</li>
        <li>在设置中：
          <ul>
            <li>格式选择「JSON」（推荐）或「HTML」</li>
            <li>取消勾选媒体文件</li>
            <li>设置时间范围</li>
          </ul>
        </li>
        <li>点击「导出」</li>
      </ol>

      <h2>文件格式要求</h2>

      <h3>TXT 格式</h3>
      <pre><code>{`[2024-01-15 10:30:25] 张三: 你好，最近怎么样？
[2024-01-15 10:31:02] 李四: 挺好的，谢谢关心！
[2024-01-15 10:32:15] 张三: 周末有空吗？想约你吃饭`}</code></pre>

      <h3>JSON 格式</h3>
      <pre><code>{`{
  "messages": [
    {
      "date": "2024-01-15T10:30:25",
      "from": "张三",
      "text": "你好，最近怎么样？"
    },
    {
      "date": "2024-01-15T10:31:02",
      "from": "李四",
      "text": "挺好的，谢谢关心！"
    }
  ]
}`}</code></pre>

      <h2>常见问题</h2>

      <h3>导出的文件太大怎么办？</h3>
      <p>
        建议选择特定的时间范围导出，或者排除媒体文件。
        Rethink AI 支持最大 50MB 的文件上传。
      </p>

      <h3>文件编码问题</h3>
      <p>
        请确保文件使用 UTF-8 编码。如果出现乱码，
        可以使用文本编辑器将文件另存为 UTF-8 格式。
      </p>

      <h3>隐私内容如何处理？</h3>
      <p>
        您可以在上传前手动删除敏感信息。
        我们的系统不会存储您的原始聊天记录。
      </p>

      <h2>下一步</h2>
      <p>
        了解了如何导出聊天记录后，请阅读
        <a href="./usage-guide">使用说明</a>了解如何充分利用分析结果。
      </p>
    </>
  );
}
