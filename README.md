# conpago-musixmatch

This is a technical assessment for Conpago. This project utilizes [MusixMatch](https://www.musixmatch.com/) API as a data source for authenticated users.

`Please read carefully for proper set up.`



### Prerequisites
#### 1. node.js

```
node version >=18.12.1
```

#### Install NVM for node version management
- [Linux installation](https://monovm.com/blog/install-nvm-on-ubuntu/)  
- [macOS installation](https://collabnix.com/how-to-install-and-configure-nvm-on-mac-os/)

#### Get and use required node version
```
nvm install 18
nvm use 18
```

#### 2. Redis
#### Installation
- [Linux installation](https://redis.io/docs/install/install-redis/install-redis-on-linux/)  
- [macOS installation](https://redis.io/docs/install/install-redis/install-redis-on-mac-os/)

#### Start redis for macOS
```
brew services start redis

```


### Tech Stack

#### Backend
- [ExpressJS](https://www.npmjs.com/package/express): For server
- [Joi](https://www.npmjs.com/package/joi): For request validation 
- [Redis](https://www.npmjs.com/package/redis): Redis cache client
- [Mongoose](https://www.npmjs.com/package/mongoose): DB client
- [Passport](https://www.npmjs.com/package/passport) / [Passport-JWT](https://www.npmjs.com/package/passport-jwt): JWT authentication and strategy middlewares
- [pm2](https://www.npmjs.com/package/pm2): Production process manager for Node.js applications with a built-in load balancer
- [Swagger](https://www.npmjs.com/package/swagger-ui): Visualize and interact with the API’s resources 
- [Morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware
- [bcryptjs](https://www.npmjs.com/package/bcryptjs): Password hash and compare package
- [axios](https://www.npmjs.com/package/axios): Promise based HTTP client
- [moment](https://www.npmjs.com/package/moment): library for parsing, validating, manipulating, and formatting dates
- MusixMatch API 

#### start backend with pm2
```
cd backend && npm start
```
#### start backend the vanilla way
```
cd backend && npm run dev
```
![pm2_startup](https://github.com/bishwo-pratap/conpago-musixmatch/assets/19890839/45f5f732-b9ae-43ad-b877-2443f0c8bf05)

<img width="943" alt="Screenshot-2024-03-10-at-15-49-55" src="https://github.com/bishwo-pratap/conpago-musixmatch/assets/19890839/45f5f732-b9ae-43ad-b877-2443f0c8bf05">

#### Swagger UI
```
http://localhost:3000/v1/docs/
```
![conpago-swagger-ui](https://github.com/bishwo-pratap/conpago-musixmatch/assets/19890839/f766c2cf-7abd-4d87-b20d-9820a423b3e7)

