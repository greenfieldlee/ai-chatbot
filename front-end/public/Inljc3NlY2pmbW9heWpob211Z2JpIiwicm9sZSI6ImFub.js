
(function() {
  function init() {
    if (window.chatWidgetInitialized) {      
      return;
    }
    window.chatWidgetInitialized = true;    
    setTimeout(function() {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('id', 'askIot-bot-ui');
      iframe.src = 'https://ask-iot-chatbot.vercel.app/';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.zIndex = '1000';
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.bottom = window.innerWidth < 640 ? '0' : '80px';
      iframe.style.right = window.innerWidth < 640 ? '0' : '16px';
      iframe.style.width = window.innerWidth < 640 ? '100%' : '448px';
      iframe.style.height = window.innerWidth < 640 ? '100%' : '90vh';
      iframe.style.borderRadius = window.innerWidth < 640 ? '0' : '0.75rem';
      iframe.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
      iframe.style.zIndex = '9999999';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const toggleButton = document.createElement('button');
      toggleButton.setAttribute('id', 'sitegpt-chat-icon');
      toggleButton.style.overflow = 'hidden';
      toggleButton.innerHTML = '<img src="https://ask-iot-chatbot.vercel.app/images/bot-icon.png" style="width: 64px; height: 64px;" alt="" /><span class="sr-only">Open Chat</span>';
      toggleButton.style.padding = '0';
      toggleButton.style.backgroundColor = 'var(--chat-color)';
      toggleButton.style.color = 'var(--chat-text-color)';
      toggleButton.style.borderRadius = '9999px';
      toggleButton.style.position = 'fixed';
      toggleButton.style.display = 'flex';
      toggleButton.style.justifyContent = 'center';
      toggleButton.style.alignItems = 'center';
      toggleButton.style.bottom = '16px';
      toggleButton.style.right = '16px';
      toggleButton.style.width = '64px';
      toggleButton.style.height = '64px';
      toggleButton.style.zIndex = '9999998';
      toggleButton.style.border = 'none';
      toggleButton.style.cursor = 'pointer';

      setTimeout(function() {
        const showPopup = window.innerWidth < 640 ? false : false
        if (showPopup && iframe.style.display === 'none') {          
          iframe.contentWindow.postMessage({ openChat: true }, '*');
          iframe.style.display = 'block';
          tooltip.style.display = 'none';
          toggleButton.innerHTML = '<img src="https://sitegpt.ai/images/x.svg" style="width: 40px; height: 40px;" alt="" /><span class="sr-only">Close Chat</span>';
          toggleButton.style.width = '48px';
          toggleButton.style.height = '48px';
        }
      }, window.innerWidth < 640 ? 0 : 0);

      toggleButton.onclick = () => {
        if (iframe.style.display === 'none') {
          iframe.contentWindow.postMessage({ openChat: true }, '*');
          iframe.style.display = 'block';          
          tooltip.style.display = 'none';
          toggleButton.innerHTML = '<img src="https://sitegpt.ai/images/x.svg" style="width: 40px; height: 40px;" alt="" /><span class="sr-only">Close Chat</span>';
          toggleButton.style.width = '48px';
          toggleButton.style.height = '48px';
        } else {
          iframe.contentWindow.postMessage({ closeChat: true }, '*');
          iframe.style.display = 'none';
          // tooltip.style.display = 'block';
          toggleButton.innerHTML = '<img src="https://sitegpt.ai/cdn-cgi/imagedelivery/hQTLE0NTlcNyb_tOYFnnyA/8f2a49aa-6c32-41de-c373-ae2027d81600/square" style="width: 64px; height: 64px;" alt="" /><span class="sr-only">Open Chat</span>';
          toggleButton.style.width = '64px';
          toggleButton.style.height = '64px';
        }
      };      

      const tooltip = document.createElement('div');
      tooltip.innerHTML = `  
  <div id="sitegpt-chat-tooltip" class="tooltip-wrapper">
    <style>
      :root {
        --chat-color: #739e82;
        --chat-text-color: #FFFFFF;
        --chat-fontSize: 14px;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
      .tooltip-wrapper .relative {
        position: relative;
      }
      .tooltip-wrapper .max-w-sm {
        max-width: 384px;
      }
      .tooltip-wrapper .bg-slate-50 {      
        background-color: rgb(248 250 252);
      }
      .tooltip-wrapper .bg-brand {
        background-color: var(--chat-color);
      }
      .tooltip-wrapper .shadow-xl {      
        box-shadow: 0 3px 6px 0 rgba(0,0,0,.1);
      }
      .tooltip-wrapper .ring-gray-100 {
        --tw-ring-opacity: 1;
        --tw-ring-color: rgb(242 244 247 / var(--tw-ring-opacity));
      }
      .tooltip-wrapper .ring-1 {
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
      }
      .tooltip-wrapper .rounded-xl {
        border-radius: 10px;
      }
      .tooltip-wrapper .p-4 {
        padding: 16px;
      }
      .tooltip-wrapper .text-base {
        font-size: 16px;
        line-height: 24px;
      }
      .tooltip-wrapper .font-medium {
        font-weight: 500;
      }
      .tooltip-wrapper .text-white {
        --tw-text-opacity: 1;
        color: var(--chat-text-color);
      }
      .tooltip-wrapper .line-clamp-3 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .tooltip-wrapper .whitespace-pre-wrap {
        white-space: pre-wrap;
      }    
      .tooltip-wrapper .absolute {
        position: absolute;
      }
      .tooltip-wrapper .fixed {
        position: fixed;
      }
      .tooltip-wrapper .w-4 {
        width: 16px;
      }
      .tooltip-wrapper .h-4 {
        height: 16px;
      }
      .tooltip-wrapper .rotate-45 {
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-rotate: 45deg;
        --tw-skew-x: 0;
        --tw-skew-y: 0;
        --tw-scale-x: 1;
        --tw-scale-y: 1;
        transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      }
      .tooltip-wrapper .neg-bottom {
        bottom: -6px;
      }       
      .tooltip-wrapper {
        position: fixed;
        bottom: 96px;
        right: 16px;
        display: none;
        z-index: 9999998;
      }
      .tooltip-wrapper #tooltip-close-btn {
        cursor: pointer;
        position: absolute;
        width: 16px;
        height: 16px;
        top: 4px;
        right: 4px;
        color: var(--chat-text-color);
      }
    </style>
    <div class="relative max-w-sm bg-brand shadow-xl ring-gray-100 ring-1 rounded-xl">
      <div id="tooltip-close-btn">               
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256">
          <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z">
          </path>
        </svg>
      </div>
      <div class="p-4">
        <p class="text-base font-medium text-white line-clamp-3 whitespace-pre-wrap">Hi there! I'm an artificially intelligent chatbot trained to love sleep and sustainability. I can answer most questions about S&G in seconds! I may not always be 100% accurate, so if you stump me, just email our team at hi@sheetsgiggles.com and a normally intelligent person will reply. Returns can be started at SheetsGiggles.com/returns, and you can track your order at SheetsGiggles.com/track. Ask me anything, or click a prompt below that describes your question!</p>
      </div>

      <div class="absolute w-4 h-4 rotate-45 bg-brand neg-bottom" style="right: 24px;"></div>
    </div>
  </div>
  `;
    
      if (window.innerWidth >= 640 || true) {
        document.body.appendChild(toggleButton);
        document.body.appendChild(tooltip);
      }      
      
      const closeBtn = document.getElementById('tooltip-close-btn')      
      if (closeBtn) {
        closeBtn.onclick = () => {          
          tooltip.style.display = 'none';         
        }
      }      

      // Update iframe height on window resize
      window.addEventListener('resize', () => {
        iframe.style.bottom = window.innerWidth < 640 ? '0' : '5rem';
        iframe.style.right = window.innerWidth < 640 ? '0' : '1rem';
        iframe.style.width = window.innerWidth < 640 ? '100%' : '448px';
        iframe.style.height = window.innerWidth < 640 ? '100%' : '90vh';
        iframe.style.borderRadius = window.innerWidth < 640 ? '0' : '0.75rem';
      });

      window.addEventListener('message', (event) => {        
        // if (event.origin !== 'https://widget.sitegpt.ai') {
        //   return
        // }
        if (event.data.isOpen) {
          iframe.style.display = 'block';
          tooltip.style.display = 'none';
          toggleButton.innerHTML = '<img src="https://sitegpt.ai/images/x.svg" style="width: 40px; height: 40px;" alt="" /><span class="sr-only">Close Chat</span>';
          toggleButton.style.width = '48px';
          toggleButton.style.height = '48px';
        } else {
          iframe.style.display = 'none';
          // tooltip.style.display = 'block';
          toggleButton.innerHTML = '<img src="https://sitegpt.ai/cdn-cgi/imagedelivery/hQTLE0NTlcNyb_tOYFnnyA/8f2a49aa-6c32-41de-c373-ae2027d81600/square" style="width: 64px; height: 64px;" alt="" /><span class="sr-only">Open Chat</span>';
          toggleButton.style.width = '64px';
          toggleButton.style.height = '64px';
        }
      });
    }, 2000);
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();