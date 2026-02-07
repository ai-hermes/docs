export default function QuickStartEn() {
  return (
    <>
      <h2>Quick Start</h2>
      <p>
        This guide will help you start using Rethink AI for conversation analysis in 5 minutes.
      </p>

      <h2>Step 1: Create an Account</h2>
      <ol>
        <li>Visit the <a href="/en/auth/register">registration page</a></li>
        <li>Enter your phone number</li>
        <li>Enter the verification code you receive (for testing, use: <code>123456</code>)</li>
        <li>Complete registration</li>
      </ol>

      <h2>Step 2: Export Chat Logs</h2>
      <p>
        Choose the export method based on your chat tool:
      </p>

      <h3>WeChat</h3>
      <ol>
        <li>Open the chat window with the target contact</li>
        <li>Tap "..." in the top right corner</li>
        <li>Select "Chat History" → "Export Chat History"</li>
        <li>Choose "Text format" for export</li>
      </ol>

      <h3>WhatsApp</h3>
      <ol>
        <li>Open the chat window</li>
        <li>Tap the menu in the top right corner</li>
        <li>Select "More" → "Export Chat"</li>
        <li>Choose "Without Media"</li>
      </ol>

      <h3>Telegram</h3>
      <ol>
        <li>Open Telegram Desktop</li>
        <li>Enter the target chat</li>
        <li>Click the menu in the top right corner → "Export Chat History"</li>
        <li>Select JSON format</li>
      </ol>

      <h2>Step 3: Upload and Analyze</h2>
      <ol>
        <li>Log in to your Rethink AI account</li>
        <li>Go to the dashboard page</li>
        <li>Click "Start New Analysis"</li>
        <li>Upload your exported chat log file</li>
        <li>Wait for AI analysis to complete (usually 1-2 minutes)</li>
      </ol>

      <h2>Step 4: View Analysis Report</h2>
      <p>
        After analysis is complete, you will see a detailed report including:
      </p>
      <ul>
        <li><strong>Personality Profile</strong> - Multi-dimensional personality trait analysis</li>
        <li><strong>Emotion Curve</strong> - Emotional change trends during the conversation</li>
        <li><strong>Intent List</strong> - Expressed needs and potential intentions</li>
        <li><strong>Communication Tips</strong> - Communication strategy suggestions based on analysis results</li>
      </ul>

      <h2>FAQ</h2>

      <h3>What file formats are supported?</h3>
      <p>
        Currently supports <code>.txt</code>, <code>.json</code>, <code>.csv</code> format chat log files.
      </p>

      <h3>How long does analysis take?</h3>
      <p>
        Depending on the length of the chat log, analysis usually takes 1-5 minutes.
      </p>

      <h3>What are the free tier limitations?</h3>
      <p>
        The free tier allows 10 analyses per month with basic personality and emotion analysis.
        For more analyses and advanced features, please upgrade to Pro.
      </p>

      <h2>Next Steps</h2>
      <p>
        Want to learn more about chat log import details? Read the
        <a href="./chatlog-integration">Chat Log Integration</a> documentation.
      </p>
    </>
  );
}
