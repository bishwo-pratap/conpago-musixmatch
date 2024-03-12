# conpago-musixmatch

This is a technical assessment for Conpago. This project utilizes [MusixMatch](https://www.musixmatch.com/) API as a data source for authenticated users.

`Please read carefully for proper set up.`

### Architecture Overview

![musixmatch](https://github.com/bishwo-pratap/conpago-musixmatch/assets/19890839/d4962ec7-085d-4816-a03d-b529dbb93c3a)


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

#### Clone the project
```
git clone https://github.com/bishwo-pratap/conpago-musixmatch.git
```
#### Access the project
```
cd conpago-musixmatch
```

## Tech Stack

### Backend
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

#### Steps
#### 1. rename .env.sample to .env file
```
cd backend && cp .env.example .env
```

#### 2. add MM_API_KEY value in .env file
```
MM_API_KEY= xxxxxxxxxxx
```
#### 3. add MM_API_KEY value in .env file
```
npm i
```
#### 4. start backend with pm2
```
npm start
```
#### OR
#### 4. start backend the vanilla way
```
npm run dev
```
![pm2_startup](https://github.com/bishwo-pratap/conpago-musixmatch/assets/19890839/45f5f732-b9ae-43ad-b877-2443f0c8bf05)

#### Swagger UI
[http://localhost:3000/v1/docs/](http://localhost:3000/v1/docs/)

![conpago-swagger-ui](https://github.com/bishwo-pratap/conpago-musixmatch/assets/19890839/f766c2cf-7abd-4d87-b20d-9820a423b3e7)

#### Cache example
![cache-example](https://github.com/bishwo-pratap/conpago-musixmatch/assets/19890839/831692df-a136-4be8-98dd-0f038a1153dc)

### Frontend
- [NextJS](https://nextjs.org/): React Based Framework
- [ChakraUI](https://chakra-ui.com/): UI and Components Library
- [Redux](https://www.npmjs.com/package/redux): State Management Library
- [formik](https://www.npmjs.com/package/formik): Form Controls
- [yup](https://www.npmjs.com/package/yup): Form Validation
- [React Icons](https://www.npmjs.com/package/react-icons): Icons Pack

#### Steps
#### 1. Install Frontend Dependencies
```
cd frontend && npm run dev
```
#### 2. Start Frontend
```
npm run dev
```
#### 2. Open frontend
[http://localhost:3001](http://localhost:3001)
![frontent](https://github.com/bishwo-pratap/conpago-musixmatch/assets/19890839/95316b9b-14ea-4e3f-bd38-b5c38d4d0335)
