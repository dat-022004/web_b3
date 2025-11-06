module.exports = {
  flowFile: 'flows.json',
  uiPort: process.env.PORT || 1880,

  // Editor và API paths (giữ như bạn đang dùng)
  httpAdminRoot: '/nodered',
  httpNodeRoot: '/api',

  // CHO PHÉP require('crypto') trong Function node
  functionExternalModules: true,

  // Nếu bạn có adminAuth thì giữ nguyên phần đó; ví dụ:
  // adminAuth: {
  //   type: "credentials",
  //   users: [{
  //     username: "dat",
  //     password: "PASTE_BCRYPT_HASH_HERE",
  //     permissions: "*"
  //   }]
  // },

  functionGlobalContext: {}
};