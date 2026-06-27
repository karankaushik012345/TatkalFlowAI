console.log('TatkalFlowAI Content Script Loaded');

// Listen for messages from popup (optional, if we want manual injection)
// For now, we will add a floating button on the IRCTC page to trigger autofill.

function injectAutofillButton() {
  if (document.getElementById('tatkalflow-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'tatkalflow-btn';
  btn.innerText = '⚡ AutoFill TatkalFlow';
  btn.style.position = 'fixed';
  btn.style.bottom = '20px';
  btn.style.right = '20px';
  btn.style.zIndex = '999999';
  btn.style.padding = '12px 24px';
  btn.style.backgroundColor = '#2563EB';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.borderRadius = '8px';
  btn.style.fontWeight = 'bold';
  btn.style.fontSize = '16px';
  btn.style.cursor = 'pointer';
  btn.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';

  btn.addEventListener('click', handleAutoFill);
  
  document.body.appendChild(btn);
}

async function handleAutoFill() {
  chrome.storage.local.get(['activeTemplateData'], (result) => {
    if (!result.activeTemplateData) {
      alert('TatkalFlowAI: No active template selected. Please click the extension icon and select a template.');
      return;
    }

    const template = result.activeTemplateData;
    const passengers = template.passengers;

    console.log('Auto-filling passengers:', passengers);
    
    // NOTE: These selectors are highly dependent on the IRCTC website's DOM.
    // They will need to be updated if IRCTC changes their frontend.
    
    try {
      // Loop through passengers and fill forms
      passengers.forEach((p, index) => {
        // Typically IRCTC has inputs like passengerName0, passengerAge0, etc. (Or similar form array indexes)
        // We simulate finding them. Since IRCTC is Angular-based, we often need to dispatch events.
        
        // Find name input
        const nameInput = document.querySelector(`input[formcontrolname="passengerName"]`) || 
                          document.querySelectorAll('input[placeholder="Passenger Name"]')[index];
                          
        if (nameInput) {
          nameInput.value = p.name;
          nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // Find age input
        const ageInput = document.querySelector(`input[formcontrolname="passengerAge"]`) || 
                         document.querySelectorAll('input[placeholder="Age"]')[index];
                         
        if (ageInput) {
          ageInput.value = p.age;
          ageInput.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // Find gender dropdown
        const genderSelect = document.querySelectorAll('select[formcontrolname="passengerGender"]')[index];
        if (genderSelect) {
          genderSelect.value = p.gender;
          genderSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        // Find berth dropdown
        const berthSelect = document.querySelectorAll('select[formcontrolname="passengerBerthChoice"]')[index];
        if (berthSelect) {
          berthSelect.value = p.berthPreference;
          berthSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      
      // Update button visual
      const btn = document.getElementById('tatkalflow-btn');
      btn.innerText = '✅ Filled Successfully';
      btn.style.backgroundColor = '#10B981';
      setTimeout(() => {
        btn.innerText = '⚡ AutoFill TatkalFlow';
        btn.style.backgroundColor = '#2563EB';
      }, 3000);

    } catch (e) {
      console.error('Error autofilling:', e);
      alert('TatkalFlowAI: Error autofilling. IRCTC may have changed their website structure.');
    }
  });
}

// Check if we are on the passenger entry page by looking for specific keywords in the URL or DOM
const observer = new MutationObserver((mutations) => {
  // If we see passenger related form fields, inject button
  if (document.body.innerText.includes('Passenger Details') || document.querySelector('app-passenger')) {
    injectAutofillButton();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Initial check
if (document.body.innerText.includes('Passenger Details')) {
  injectAutofillButton();
}
