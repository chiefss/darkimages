(async () => {
  const prefs = await browser.storage.local.get({
    enabled: true,
    filterType: 'brightness',
    brightness: 0.7,
    contrast: 0.7,
    saturate: 0.7
  });

  if (!prefs.enabled) return;

  // Remove any previously injected style
  const existing = document.getElementById('dark-images-style');
  if (existing) existing.remove();

  const style = document.createElement('style');
  style.id = 'dark-images-style';
  let css = '';
  if (prefs.filterType === 'brightness') {
    const b = Math.max(0.1, Math.min(1.0, prefs.brightness));
    const c = Math.max(0.1, Math.min(1.0, prefs.contrast));
    const s = Math.max(0.1, Math.min(1.0, prefs.saturate));
    css = `img, picture, video, canvas, svg { filter: brightness(${b}) contrast(${c}) saturate(${s}) !important; }`;
  } else if (prefs.filterType === 'invert') {
    css = `img, picture, video, canvas, svg { filter: invert(1) hue-rotate(180deg) !important; }`;
  }
  style.textContent = css;
  document.head.appendChild(style);
})();
