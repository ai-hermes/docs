export default function ChatlogIntegrationEn() {
  return (
    <>
      <h2>Chat Log Integration</h2>
      <p>
        This document provides detailed instructions on how to export logs from various chat tools
        and import them into Rethink AI for analysis.
      </p>

      <h2>Supported Chat Tools</h2>
      <table>
        <thead>
          <tr>
            <th>Chat Tool</th>
            <th>Supported Format</th>
            <th>Export Method</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>WeChat</td>
            <td>TXT</td>
            <td>Built-in export</td>
          </tr>
          <tr>
            <td>WhatsApp</td>
            <td>TXT</td>
            <td>Built-in export</td>
          </tr>
          <tr>
            <td>Telegram</td>
            <td>JSON, HTML</td>
            <td>Desktop export</td>
          </tr>
          <tr>
            <td>iMessage</td>
            <td>CSV</td>
            <td>Third-party tools</td>
          </tr>
          <tr>
            <td>LINE</td>
            <td>TXT</td>
            <td>Built-in export</td>
          </tr>
        </tbody>
      </table>

      <h2>WhatsApp Export Guide</h2>

      <h3>Export Steps</h3>
      <ol>
        <li>Open WhatsApp</li>
        <li>Enter the target chat</li>
        <li>Tap the contact or group name</li>
        <li>Scroll down and find "Export Chat"</li>
        <li>Select "Without Media"</li>
        <li>Choose save or share method</li>
      </ol>

      <h3>Notes</h3>
      <ul>
        <li>The exported file contains all chat history</li>
        <li>Recommended to select "Without Media" to reduce file size</li>
        <li>File format is <code>.txt</code></li>
      </ul>

      <h2>Telegram Export Guide</h2>

      <h3>Using Telegram Desktop</h3>
      <ol>
        <li>Download and log in to Telegram Desktop</li>
        <li>Open the target chat</li>
        <li>Click the three dots in the top right</li>
        <li>Select "Export Chat History"</li>
        <li>In settings:
          <ul>
            <li>Choose "JSON" (recommended) or "HTML" for format</li>
            <li>Uncheck media files</li>
            <li>Set time range</li>
          </ul>
        </li>
        <li>Click "Export"</li>
      </ol>

      <h2>File Format Requirements</h2>

      <h3>TXT Format</h3>
      <pre><code>{`[2024-01-15 10:30:25] John: Hey, how are you doing?
[2024-01-15 10:31:02] Jane: I'm good, thanks for asking!
[2024-01-15 10:32:15] John: Are you free this weekend? I'd like to have dinner together`}</code></pre>

      <h3>JSON Format</h3>
      <pre><code>{`{
  "messages": [
    {
      "date": "2024-01-15T10:30:25",
      "from": "John",
      "text": "Hey, how are you doing?"
    },
    {
      "date": "2024-01-15T10:31:02",
      "from": "Jane",
      "text": "I'm good, thanks for asking!"
    }
  ]
}`}</code></pre>

      <h2>FAQ</h2>

      <h3>What if the exported file is too large?</h3>
      <p>
        It's recommended to export a specific time range or exclude media files.
        Rethink AI supports file uploads up to 50MB.
      </p>

      <h3>File Encoding Issues</h3>
      <p>
        Please ensure the file uses UTF-8 encoding. If you see garbled characters,
        you can use a text editor to save the file as UTF-8 format.
      </p>

      <h3>How is private content handled?</h3>
      <p>
        You can manually remove sensitive information before uploading.
        Our system does not store your original chat logs.
      </p>

      <h2>Next Steps</h2>
      <p>
        Now that you know how to export chat logs, read the
        <a href="./usage-guide">Usage Guide</a> to learn how to make the most of your analysis results.
      </p>
    </>
  );
}
