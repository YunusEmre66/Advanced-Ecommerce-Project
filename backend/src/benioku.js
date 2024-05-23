npm install typescript ts-node @types/node --save-dev

npm install sequelize sequelize-typescript mysql2

.env dosyasını oluşturmayı unutma başka bir projeden çekiyorsan

.gitignore dosyasına .env dosyasını ekle eğer git e atacaksan

//!npx create-next-app@latest 

//tokenın içinde user veya ıd olup olmadığını jwt.io sitesinden kontrol edebilirsin. burada gösterir.

length.reduce : dizi oluşturur.
açıklaması : length.reduce((acc, curr) => acc + curr, 0); // 0 başlangıç değeri

//secret key olmadan jwt çalışmaz. secret key olmadan token oluşturulmaz.

//expmonthyear : son kullanma tarihi
//kredi kartı enteg konusu ayrı bir konudur her bankanın kendine göre bir şeyi var.
//req.body bankaya hiç değiştirilmeden ham halde gönderildikten sonra bize cevap geliyor kaydedebiliyoruz.

// common-payment-point : ortak ödeme noktası

//vs code build ederek dosyaları javascripte çevirir bu şekilde çalıştırır. build dosyası oluşturur. npm run build

//use strict : sıkı kullanım, katı javascript kullanımı geçerli olur.

//npm i json-server -g

Json-server --watch data/db.json --port 3500      //json server çalıştırma, veritabanı oluşturma işlemi yapar. sanal backend oluşturur.id şarttır.-

//! basic kurulum başlangıç  **************************************************

mkdir common-payment-point

cd common-payment-point

npm init -y

npm install -D typescript

npm install -D ts-node

npm install -D nodemon

tsconfig.json dosyası oluştur proje içinde

//! index.ts

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

const app = express();
app.use(cors({
credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


//! tsconfig.json

{
    "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "node",
    "baseUrl": "src",
    "outDir": "dist",
    "sourceMap": true,
    "noImplicitAny": true,
    },
    "include": ["src/**/*"],
    }

    //!package.json 

    {
        "name": "common-payment-point",
        "version": "1.0.0",
        "description": "",
        "main": "server.ts",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "build": "node_modules/.bin/tsc",
          "dev": "node ./build/server.js",
          "start": "nodemon && tsc && npm run dev"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "devDependencies": {
          "nodemon": "^3.0.3",
          "ts-node": "^10.9.2",
          "typescript": "^5.3.3"
        },
        "dependencies": {
          "@types/body-parser": "^1.19.5",
          "@types/compression": "^1.7.5",
          "@types/cookie-parser": "^1.4.6",
          "@types/cors": "^2.8.17",
          "@types/express": "^4.17.21"
        }
      }
      

//! basic kurulum bitiş **************************************************

//! hazır token oluşturma psotmandan test kısmına yazılıyor.

var responseData = pm.response.json();
if (responseData && responseData.token) {
  pm.environment.set("TOKEN", responseData.token);
  }


  //! 
  
isNaN(123);     // false, çünkü 123 bir sayıdır
isNaN('123');   // false, çünkü '123' bir sayıdır ve otomatik olarak sayıya dönüştürülür
isNaN('hello'); // true, çünkü 'hello' bir sayıya dönüştürülemez
isNaN(NaN);     // true, çünkü NaN (Not a Number) değeridir
