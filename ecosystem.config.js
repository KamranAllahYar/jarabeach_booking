module.exports = {
  apps: [
      {
          name: 'jarabeach-web',
          script: './start.js',
          env: {
              HOST: 'localhost',
              PORT: 3000
          }
      }
  ],
}
