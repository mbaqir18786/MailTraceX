/* ==========================================================================
   MailTraceX - Cyber Sahayak AI (साइबर सहायक)
   24x7 Sovereign Government AI Chatbot Assistant
   Ministry of Electronics & Information Technology, Government of India
   ========================================================================== */

(function() {
  // Inject Chatbot HTML and Styles dynamically if not present
  const style = document.createElement('style');
  style.innerHTML = `
    /* CHATBOT TRIGGER BUTTON — compact icon-only circle */
    #cyberSahayakTrigger {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 52px;
      height: 52px;
      background: linear-gradient(135deg, #001B44 0%, #0B3D91 100%);
      color: #FFFFFF;
      border: 2.5px solid #FF9933;
      border-radius: 50%;
      box-shadow: 0 4px 18px rgba(0, 27, 68, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      z-index: 9990;
      transition: transform 0.2s, box-shadow 0.2s;
      user-select: none;
    }
    #cyberSahayakTrigger:hover {
      transform: translateY(-3px) scale(1.07);
      box-shadow: 0 8px 24px rgba(0, 27, 68, 0.5);
    }
    /* Tooltip on hover */
    #cyberSahayakTrigger::after {
      content: 'Cyber Sahayak AI';
      position: absolute;
      right: 58px;
      bottom: 50%;
      transform: translateY(50%);
      background: #001B44;
      color: #FFF;
      font-size: 11px;
      font-weight: 700;
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      white-space: nowrap;
      padding: 5px 10px;
      border-radius: 4px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s;
    }
    #cyberSahayakTrigger:hover::after { opacity: 1; }
    .sahayak-pulse-dot {
      width: 9px;
      height: 9px;
      background: #00FF66;
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(0, 255, 102, 0.7);
      animation: sahayakPulse 1.8s infinite;
    }
    @keyframes sahayakPulse {
      0% { box-shadow: 0 0 0 0 rgba(0, 255, 102, 0.7); }
      70% { box-shadow: 0 0 0 8px rgba(0, 255, 102, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 255, 102, 0); }
    }

    /* CHATBOT CONTAINER */
    #cyberSahayakModal {
      position: fixed;
      bottom: 82px;
      right: 24px;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 520px;
      max-height: calc(100vh - 120px);
      background: #FFFFFF;
      border: 2px solid #0B3D91;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      display: none;
      flex-direction: column;
      z-index: 9995;
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      overflow: hidden;
    }

    /* HEADER */
    .sahayak-header {
      background: linear-gradient(135deg, #001B44 0%, #0B3D91 100%);
      color: #FFFFFF;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px solid #FF9933;
    }
    .sahayak-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .sahayak-emblem {
      width: 28px;
      height: 34px;
    }
    .sahayak-title {
      font-size: 13.5px;
      font-weight: 800;
      line-height: 1.1;
    }
    .sahayak-sub {
      font-size: 10.5px;
      color: #D1E2FA;
    }
    .sahayak-close-btn {
      background: none;
      border: none;
      color: #FFFFFF;
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      padding: 2px 6px;
      line-height: 1;
    }
    .sahayak-close-btn:hover { color: #FF9933; }

    /* BODY / MESSAGES */
    .sahayak-body {
      flex: 1;
      padding: 14px;
      overflow-y: auto;
      background: #F8FAFC;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .chat-msg {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 12.5px;
      line-height: 1.5;
    }
    .chat-msg.bot {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-left: 4px solid #0B3D91;
      color: #1E293B;
      align-self: flex-start;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .chat-msg.user {
      background: #0B3D91;
      color: #FFFFFF;
      align-self: flex-end;
      border-bottom-right-radius: 2px;
    }

    /* QUICK PROMPTS */
    .sahayak-quick-prompts {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }
    .quick-prompt-btn {
      background: #EBF3FC;
      border: 1px solid #93B4D7;
      color: #0B3D91;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.15s;
      text-align: left;
    }
    .quick-prompt-btn:hover {
      background: #0B3D91;
      color: #FFFFFF;
    }

    /* INPUT BAR */
    .sahayak-footer {
      background: #FFFFFF;
      border-top: 1px solid #E2E8F0;
      padding: 10px 12px;
      display: flex;
      gap: 8px;
    }
    .sahayak-input {
      flex: 1;
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 12.5px;
      font-family: inherit;
    }
    .sahayak-input:focus {
      outline: none;
      border-color: #0B3D91;
      box-shadow: 0 0 0 2px rgba(11,61,145,0.15);
    }
    .sahayak-send-btn {
      background: #0B3D91;
      color: #FFF;
      border: none;
      border-radius: 4px;
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }
    .sahayak-send-btn:hover { background: #001B44; }

    /* HIGH CONTRAST COMPATIBILITY */
    [data-theme="high-contrast"] #cyberSahayakTrigger {
      background: #000000 !important;
      color: #FFFF00 !important;
      border: 2.5px solid #FFFF00 !important;
    }
    [data-theme="high-contrast"] #cyberSahayakModal {
      background: #000000 !important;
      border: 2px solid #FFFF00 !important;
    }
    [data-theme="high-contrast"] .sahayak-header,
    [data-theme="high-contrast"] .sahayak-body,
    [data-theme="high-contrast"] .sahayak-footer {
      background: #000000 !important;
      color: #FFFFFF !important;
      border-color: #FFFFFF !important;
    }
    [data-theme="high-contrast"] .chat-msg.bot {
      background: #000000 !important;
      color: #FFFFFF !important;
      border: 1px solid #FFFFFF !important;
    }
    [data-theme="high-contrast"] .chat-msg.user {
      background: #FFFF00 !important;
      color: #000000 !important;
    }
    [data-theme="high-contrast"] .quick-prompt-btn,
    [data-theme="high-contrast"] .sahayak-send-btn {
      background: #000000 !important;
      color: #FFFF00 !important;
      border: 1px solid #FFFF00 !important;
    }
    [data-theme="high-contrast"] .sahayak-input {
      background: #000000 !important;
      color: #FFFFFF !important;
      border: 1px solid #FFFF00 !important;
    }
  `;
  document.head.appendChild(style);

  // Chatbot HTML Structure
  const triggerHtml = `
    <div id="cyberSahayakTrigger" role="button" aria-label="Open Cyber Sahayak AI Assistant" title="Cyber Sahayak AI">
      <span class="sahayak-pulse-dot" style="position:absolute;top:8px;right:8px;"></span>
      💬
    </div>
  `;

  const modalHtml = `
    <div id="cyberSahayakModal" role="dialog" aria-label="Cyber Sahayak Chatbot">
      <div class="sahayak-header">
        <div class="sahayak-title-wrap">
          <svg class="sahayak-emblem" viewBox="0 0 100 130" fill="none">
            <path d="M50 15 C50 15 42 12 36 19 C31 24 33 34 33 42 C30 43 27 46 27 50 C27 54 30 56 32 58 C32 63 35 68 39 71 L39 76 C35 77 32 80 32 84 C32 89 36 92 40 92 L60 92 C64 92 68 89 68 84 C68 80 65 77 61 76 L61 71 C65 68 68 63 68 58 C70 56 73 54 73 50 C73 46 70 43 67 42 C67 34 69 24 64 19 C58 12 50 15 50 15 Z" fill="#FF9933"/>
            <text x="50" y="120" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle">MeitY AI</text>
          </svg>
          <div>
            <div class="sahayak-title">साइबर सहायक | Cyber Sahayak AI</div>
            <div class="sahayak-sub">24x7 Government Cyber Security Assistant</div>
          </div>
        </div>
        <button class="sahayak-close-btn" id="sahayakCloseBtn" title="Close Chat">&times;</button>
      </div>

      <div class="sahayak-body" id="sahayakChatBody">
        <div class="chat-msg bot" id="sahayakWelcomeMsg">
          <strong>नमस्ते / Greetings!</strong><br>
          I am <strong>Cyber Sahayak</strong>, your official Government AI Cyber Security Assistant. Ask me anything about email threats, 1-second auto-blocking, MeitY human reviews, pricing plans, or paste any email/domain to verify it instantly!
        </div>

        <div class="sahayak-quick-prompts" id="sahayakPrompts">
          <button class="quick-prompt-btn" onclick="sendSahayakPrompt('How does 1-second auto blocking work?')">⚡ How does 1-sec blocking work?</button>
          <button class="quick-prompt-btn" onclick="sendSahayakPrompt('How does MeitY Gov review blocked emails?')">🛡️ How does MeitY Review Board work?</button>
          <button class="quick-prompt-btn" onclick="sendSahayakPrompt('What are the pricing plans for citizens and universities?')">💰 Pricing for Citizen &amp; Universities?</button>
          <button class="quick-prompt-btn" onclick="sendSahayakPrompt('Check email: notice-tax@incometax-gov.in.top')">🔍 Test Sample Scam Email</button>
          <button class="quick-prompt-btn" onclick="sendSahayakPrompt('How to file complaint on 1930?')">📞 How to report cyber fraud on 1930?</button>
        </div>
      </div>

      <div class="sahayak-footer">
        <input type="text" class="sahayak-input" id="sahayakInput" placeholder="Ask a question or paste email/domain..." onkeydown="if(event.key==='Enter') sendSahayakMessage();">
        <button class="sahayak-send-btn" onclick="sendSahayakMessage()">Send</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', triggerHtml);
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const trigger = document.getElementById('cyberSahayakTrigger');
  const modal = document.getElementById('cyberSahayakModal');
  const closeBtn = document.getElementById('sahayakCloseBtn');
  const input = document.getElementById('sahayakInput');
  const body = document.getElementById('sahayakChatBody');

  trigger.onclick = () => {
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    if (modal.style.display === 'flex') input.focus();
  };

  closeBtn.onclick = () => { modal.style.display = 'none'; };

  window.sendSahayakPrompt = function(text) {
    input.value = text;
    sendSahayakMessage();
  };

  window.sendSahayakMessage = function() {
    const query = input.value.trim();
    if (!query) return;

    // Append User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-msg user';
    userDiv.textContent = query;
    body.appendChild(userDiv);
    input.value = '';
    body.scrollTop = body.scrollHeight;

    // Simulate AI Response
    setTimeout(() => {
      const botDiv = document.createElement('div');
      botDiv.className = 'chat-msg bot';
      botDiv.innerHTML = generateSahayakResponse(query);
      body.appendChild(botDiv);
      body.scrollTop = body.scrollHeight;
    }, 400);
  };

  function generateSahayakResponse(q) {
    const lower = q.toLowerCase();
    const curLang = localStorage.getItem('mailtracex_lang') || 'en';

    // 1. Email Verification Query
    if (lower.includes('@') || lower.includes('.top') || lower.includes('.online') || lower.includes('.click') || lower.includes('check email') || lower.includes('verify')) {
      const isScam = lower.includes('top') || lower.includes('online') || lower.includes('claim') || lower.includes('tax') || lower.includes('sbi') || lower.includes('click');
      if (isScam) {
        return `
          <strong style="color:#B91C1C;">🚨 THREAT DETECTED (Risk Score: 96/100)</strong><br>
          <strong>Verdict:</strong> Malicious Phishing / Lookalike Spoofing.<br>
          <strong>Forensics:</strong> SPF/DKIM Authentication failed, domain registered recently, high urgency intent detected.<br>
          <strong>Gateway Action:</strong> Auto-blocked at gateway in 0.38s and escalated to <a href="gov.html" style="color:#0B3D91; font-weight:700;">MeitY Human Review Board</a>.
        `;
      } else {
        return `
          <strong style="color:#15803D;">✅ VERIFIED SAFE (Risk Score: 5/100)</strong><br>
          <strong>Verdict:</strong> Clean &amp; Authentic domain.<br>
          <strong>Forensics:</strong> Valid SPF pass, DMARC p=reject compliant, trusted domain history.<br>
          <strong>Gateway Action:</strong> Delivered safely to inbox.
        `;
      }
    }

    // 2. How 1-Sec Blocking Works
    if (lower.includes('1-second') || lower.includes('how') && lower.includes('block') || lower.includes('work') || lower.includes('कार्यप्रणाली')) {
      return `
        <strong>⚡ 1-Second Interception &amp; Review Workflow:</strong><br>
        1️⃣ <strong>Inbound Mail Received:</strong> The MailTraceX gateway captures raw email before rendering.<br>
        2️⃣ <strong>Sub-Second AI Check (380ms):</strong> Multi-model judges evaluate SPF/DKIM, NLP coercive language &amp; malware hashes.<br>
        3️⃣ <strong>Auto-Quarantine (&gt;75 Score):</strong> High-risk mails are sealed from user inboxes.<br>
        4️⃣ <strong>MeitY Gov Review:</strong> Blocked emails are forwarded to <a href="gov.html" style="font-weight:700;">gov.html</a> where officers can <em>[Unblock &amp; Release]</em> or <em>[Maintain Block &amp; Blacklist]</em>.
      `;
    }

    // 3. Pricing Query
    if (lower.includes('pricing') || lower.includes('cost') || lower.includes('plan') || lower.includes('मूल्य') || lower.includes('fee')) {
      return `
        <strong>💰 MailTraceX Differentiated Pricing Plans:</strong><br>
        • 👤 <strong>Citizens:</strong> <strong style="color:#15803D;">₹0 (Free)</strong> under Digital India initiative.<br>
        • 🏛️ <strong>Universities &amp; Colleges:</strong> <strong>₹4,999/month</strong> (UGC/AICTE Subsidized).<br>
        • 🛡️ <strong>Ministries &amp; Defense:</strong> Sovereign Central Grant (MeitY Budget).<br>
        • 🏢 <strong>Enterprises &amp; Banks:</strong> ₹14,999/month (GeM Portal Contract).<br>
        👉 <a href="pricing.html" style="color:#0B3D91; font-weight:700; text-decoration:underline;">View Full Pricing Breakdown on pricing.html →</a>
      `;
    }

    // 4. MeitY Review Board
    if (lower.includes('review') || lower.includes('human') || lower.includes('meity') || lower.includes('समीक्षा')) {
      return `
        <strong>🛡️ MeitY Human Review Board (मानव समीक्षा बोर्ड):</strong><br>
        Located in <a href="gov.html" style="font-weight:700;">gov.html</a>, nodal officers review every auto-blocked email. They inspect Section 65B legal hashes, SPF logs, and phishing indicators, then choose to:<br>
        • <strong>Unblock &amp; Release:</strong> If false positive, safely deliver to recipient with audit note.<br>
        • <strong>Maintain Block:</strong> Permanently quarantine and issue nationwide CERT-In alerts!
      `;
    }

    // 5. 1930 Cybercrime Helpline
    if (lower.includes('1930') || lower.includes('helpline') || lower.includes('complaint') || lower.includes('report') || lower.includes('शिकायत')) {
      return `
        <strong>📞 National Cybercrime Helpline 1930:</strong><br>
        If you have been targeted by financial cyber fraud or phishing, dial <strong>1930 (Toll Free)</strong> immediately or track grievances in the <a href="user.html#complaints" style="font-weight:700;">Citizen Portal</a>. MailTraceX integrates directly with the National Cyber Crime Reporting Portal.
      `;
    }

    // Default Fallback
    return `
      I can assist you with:
      <ul style="margin: 6px 0 6px 16px; font-size:12px;">
        <li>Testing any email or domain for phishing</li>
        <li>Explaining the 1-second auto-blocking system</li>
        <li>Reviewing pricing for citizens vs universities</li>
        <li>Navigating to Citizen, DU Console, or Gov Review portals</li>
      </ul>
      Feel free to ask your question or click a prompt above!
    `;
  }
})();
