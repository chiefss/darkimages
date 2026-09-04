document.addEventListener('DOMContentLoaded', async () => {
  const enabledEl = document.getElementById('enabled');
  const filterTypeEl = document.getElementById('filterType');
  const brightnessEl = document.getElementById('brightness');
  const brightnessValEl = document.getElementById('brightnessValue');
  const contrastEl = document.getElementById('contrast');
  const contrastValEl = document.getElementById('contrastValue');
  const saturateEl = document.getElementById('saturate');
  const saturateValEl = document.getElementById('saturateValue');
  const warningEl = document.getElementById('warning');
  const brightnessControls = document.getElementById('brightnessControls');

  // Load saved settings
  const prefs = await browser.storage.local.get({
    enabled: true,
    filterType: 'brightness',
    brightness: 0.7,
    contrast: 0.7,
    saturate: 0.7
  });
  enabledEl.checked = prefs.enabled;
  filterTypeEl.value = prefs.filterType;
  brightnessEl.value = prefs.brightness;
  brightnessValEl.textContent = prefs.brightness;
  contrastEl.value = prefs.contrast;
  contrastValEl.textContent = prefs.contrast;
  saturateEl.value = prefs.saturate;
  saturateValEl.textContent = prefs.saturate;
  toggleControls(prefs.filterType);

  // Show warning when any setting changes
  const showWarning = () => {
    warningEl.style.display = 'block';
  };

  enabledEl.addEventListener('change', async () => {
    await browser.storage.local.set({enabled: enabledEl.checked});
    showWarning();
  });

  filterTypeEl.addEventListener('change', async () => {
    const type = filterTypeEl.value;
    await browser.storage.local.set({filterType: type});
    toggleControls(type);
    showWarning();
  });

  brightnessEl.addEventListener('input', async () => {
    const val = parseFloat(brightnessEl.value).toFixed(1);
    brightnessValEl.textContent = val;
    await browser.storage.local.set({brightness: parseFloat(val)});
    showWarning();
  });

  contrastEl.addEventListener('input', async () => {
    const val = parseFloat(contrastEl.value).toFixed(1);
    contrastValEl.textContent = val;
    await browser.storage.local.set({contrast: parseFloat(val)});
    showWarning();
  });

  saturateEl.addEventListener('input', async () => {
    const val = parseFloat(saturateEl.value).toFixed(1);
    saturateValEl.textContent = val;
    await browser.storage.local.set({saturate: parseFloat(val)});
    showWarning();
  });

  function toggleControls(type) {
    if (type === 'brightness') {
      brightnessControls.style.display = 'block';
    } else {
      brightnessControls.style.display = 'none';
    }
  }
});
