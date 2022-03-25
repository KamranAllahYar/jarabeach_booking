# jarabeach_web

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).



## Deployment guide 

```bash
# Resets the git repo and cleans any server changes
$ git reset --hard && git clean -df

# Pulls from the origin staging branch
$ git pull origin staging

# installs any new package that may be included
$ yarn install

# build the poject for production
$ yarn prod

# Restarts the service that runs the Nuxt application on the url (booking.jarabeachresort.com)
$ pm2 restart stg-booking.jarabeachresort.com

---------------------

# (OPTIONAL - ) If for any reason the server was restarted, run this command the first time only
$ pm2 start npm --name "stg-booking.jarabeachresort.com" --watch -- start
```
