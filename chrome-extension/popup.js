const API_URL = 'https://tatkalflowai-backend.onrender.com/api/v1';

document.addEventListener('DOMContentLoaded', async () => {
  const loginSection = document.getElementById('loginSection');
  const mainSection = document.getElementById('mainSection');
  const statusIndicator = document.getElementById('statusIndicator');
  
  // Check if we have a token stored
  chrome.storage.local.get(['token', 'templates', 'activeTemplateId'], (result) => {
    if (result.token) {
      showMainScreen();
      if (result.templates) {
        renderTemplates(result.templates, result.activeTemplateId);
      }
      fetchTemplates(result.token); // refresh
    } else {
      showLoginScreen();
    }
  });

  // Login handler
  document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const errorDiv = document.getElementById('loginError');
    
    errorDiv.textContent = 'Logging in...';
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        errorDiv.textContent = '';
        chrome.storage.local.set({ token: data.token }, () => {
          showMainScreen();
          fetchTemplates(data.token);
        });
      } else {
        errorDiv.textContent = data.message || 'Login failed';
      }
    } catch (err) {
      errorDiv.textContent = 'Network error connecting to backend.';
    }
  });

  // Logout handler
  document.getElementById('logoutBtn').addEventListener('click', () => {
    chrome.storage.local.remove(['token', 'templates', 'activeTemplateId', 'activeTemplateData'], () => {
      showLoginScreen();
    });
  });
});

function showLoginScreen() {
  document.getElementById('loginSection').classList.remove('hidden');
  document.getElementById('mainSection').classList.add('hidden');
  document.getElementById('statusIndicator').className = 'status-offline';
  document.getElementById('statusIndicator').textContent = 'Offline';
}

function showMainScreen() {
  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('mainSection').classList.remove('hidden');
  document.getElementById('statusIndicator').className = 'status-online';
  document.getElementById('statusIndicator').textContent = 'Connected';
}

async function fetchTemplates(token) {
  try {
    const response = await fetch(`${API_URL}/templates`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      const templates = await response.json();
      chrome.storage.local.set({ templates }, () => {
        chrome.storage.local.get(['activeTemplateId'], (res) => {
          renderTemplates(templates, res.activeTemplateId);
        });
      });
    } else if (response.status === 401) {
      // Token expired
      chrome.storage.local.remove(['token']);
      showLoginScreen();
    }
  } catch (err) {
    console.error('Failed to fetch templates', err);
  }
}

function renderTemplates(templates, activeId) {
  const list = document.getElementById('templateList');
  list.innerHTML = '';
  
  if (templates.length === 0) {
    list.innerHTML = '<p style="color: #9CA3AF; font-size: 12px;">No templates found. Create one in the web app.</p>';
    return;
  }

  templates.forEach(t => {
    const div = document.createElement('div');
    div.className = `template-item ${t._id === activeId ? 'active' : ''}`;
    
    div.innerHTML = `
      <div class="template-title">${t.sourceStationCode} &rarr; ${t.destinationStationCode}</div>
      <div class="template-meta">${t.passengers.length} Passenger(s) • ${t.travelClass}</div>
    `;
    
    div.addEventListener('click', () => {
      chrome.storage.local.set({ 
        activeTemplateId: t._id,
        activeTemplateData: t // Store full data for content script
      }, () => {
        renderTemplates(templates, t._id); // re-render to update UI
      });
    });
    
    list.appendChild(div);
  });
}
