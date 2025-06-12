### NODE + REACT AWS

<br/>
<br/>

<style>
*{  font-size: 15px;}
.practice {
    display: inline-block;
    padding: .35em .65em;
    font-size: .75em;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
    background-color: #0d6efd !important;
    font-size:110%;
    margin:2%;
}
  .bg {
    padding: .8em;
    overflow: auto;
    border-radius: 3px;
    background: #f5f5f5;
    text-align: left;
    white-space: pre;
    word-break: normal;
    line-height: 1.4;
    white-space: pre-wrap; /* 자동 줄 바꿈 */
    word-wrap: break-word; /* 긴 단어도 줄 바꿈 */
  }
</style>

<div class="bg"><mark style="font-weight:bold; padding:5px">AWS1</mark> BACK + FRONT  / BRANCH-</div>

#### ■ PART001. EC2 / GIT HUB 에 올리기

##### 1. [back] 코드수정 - app.js 코드수정

1. app.js 코드변경
2. source tree로 git에 올리기

**[변경사항]**

```bash
const hpp = require('hpp');
const helmet = require('helmet');
if (process.env.NODE_ENV === 'production') { //// 배포용  주석풀기
}else{
}

app.listen(80, () => {
    console.log('서버 실행 중!');
});
```

**[full source]**

```bash
////1. require
const express = require('express');  // express 프레임워크를 사용해 서버 생성
const cors = require('cors');  // CORS(Cross-Origin Resource Sharing)를 설정하여 다른 도메인에서의 API 요청을 허용
const session = require('express-session');
const cookieParser = require('cookie-parser'); //쿠키와 세션을 관리하여 사용자의 인증 및 상태를 유지
const passport = require('passport');  //쿠키와 세션을 관리하여 사용자의 인증 및 상태를 유지
const dotenv = require('dotenv');  // 환경변수 .env 를 로드하여 민감한 데이터를 보호함.
const morgan = require('morgan');  // 브라우저 로그인 처리
const path = require('path');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');  // 라우터 연결
const db = require('./models');
const passportConfig = require('./passport');

const  apiRouter = require('./routes/api');
//const  chatRouter = require('./routes/server');

//#####
const hpp = require('hpp');
const helmet = require('helmet');

////2. 환경설정
dotenv.config();  //환경설정 .env 를 로드
const app = express();

////3. 데이터베이스 연결
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);
passportConfig();  //

/////4. 각종사용 연결
if (process.env.NODE_ENV === 'production') { //// 배포용
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(cors({
        origin: 'http://d2bing.com',
        credentials: true,
    }));
} else {  //// 개발용
    app.use(morgan('dev'));  // http요청로그를 기록하여 디버깅과 모니터링
    app.use(cors({
        origin: 'http://localhost:3000',  // 요청허용
        credentials: true,  // 쿠키와 같은 인증정보르 포함한 요청도 허용
    }));
}


app.use('/', express.static(path.join(__dirname, 'uploads')));   // uploads 디렉토리의 파일을  액세스할수 있게
app.use(express.json());  // 요청본문을 파싱하는 미들웨어 - 클라이언트로부터 json 데이터를 받을 때 사용됨.
app.use(express.urlencoded({ extended: true }));  // url 요청본문을 파싱함.
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키를 파싱하는 미들웨어
// 세션관리를 위한 미들웨어

if (process.env.NODE_ENV === 'production') { //// 배포용
    app.use(session({
        saveUninitialized: false,  // 초기화되지 않은 세션은 저장하지 않음.
        resave: false,  // 세션이 변경되지 않았다면 저장하지 않음.
        secret: process.env.COOKIE_SECRET,  // 세션데이털르 암호화하기위한 비밀키
        cookie: {
            httpOnly: true,
            secure: false,
            domain: process.env.NODE_ENV === 'production' && '.d2big.com'
        },
    }));
} else {
    app.use(session({
        saveUninitialized: false,  // 초기화되지 않은 세션은 저장하지 않음.
        resave: false,  // 세션이 변경되지 않았다면 저장하지 않음.
        secret: process.env.COOKIE_SECRET,  // 세션데이털르 암호화하기위한 비밀키
        cookie: { secure: false } // production에서는 true로 설정
    }));
}
app.use(passport.initialize());  // passport 를 초기화하는 미들웨어 , passport는 인증을 처리하는 라이브러리
app.use(passport.session()); // 사용자의 인증상태를 세션에 저장하고 요청간에 유지

app.get('/', (req, res) => {
    res.send('hello express');
});
// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
////5. 라우팅 - 요청을 처리하는 라우터를 연결
app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter); //##
app.use('/api', apiRouter);
//app.use('/chat', chatRouter);

////6. 서버설정 및 실행
app.listen(80, () => {
    console.log('서버 실행 중!');
});

```

##### 2. ec2 생성

```bash
Q1. 2개 : ubuntu 24버젼으로 / http 80 , https 443 / 키페어 : pem 프로젝트안에
Q2. front front.pem
Q3. back back.pem
```

##### 3. github.com - 레파지토리만들기

```bash
git  remote  add  origin   깃허브 주소
git  add    .
git  commit   -m  "aws"
git  push origin  master
```

```gitignore
.env
.next
node_modules/
front.pem
back.pem
```

<br/>
<br/>

<div>
  <span class="practice">실습 1</span> <img src="images/aws (1).png" alt="alt text"><br>
  <span class="practice">실습 2</span> <img src="images/aws (2).png" alt="alt text"><br>
  <span class="practice">실습 3</span> <img src="images/aws (3).png" alt="alt text"><br>
  <span class="practice">실습 4</span> <img src="images/aws (4).png" alt="alt text"><br>
  <span class="practice">실습 5</span> <img src="images/aws (5).png" alt="alt text"><br>
  <span class="practice">실습 6</span> <img src="images/aws (6).png" alt="alt text"><br>
  <span class="practice">실습 7</span> <img src="images/aws (7).png" alt="alt text"><br>
  <span class="practice">실습 8</span> <img src="images/aws (8).png" alt="alt text"><br>
  <span class="practice">실습 9</span> <img src="images/aws (9).png" alt="alt text"><br>
  <span class="practice">실습 10</span> <img src="images/aws (10).png" alt="alt text"><br>
</div>

<br/>
<br/>
<br/>

---

#### ■ PART002. EC2 올리기 - BACK

##### 1. [BACK] ssh를 이용하여 연결하여 git파일다운로드

```bash
1. [vs code] - ssh로 접속
ssh -i "back.pem" ubuntu@ec2-13-209-68-174.ap-northeast-2.compute.amazonaws.com
  yes

2. github에서 clone
git clone https://github.com/sally03915/nodeReact.git
ls


※ pass---  3. 이름이 길면 폴더명 수정    ......  이름바꾸지 말것! 코드수정시 git clone 폴더명이 바뀜
mv d2big_nodeReact2025 d2big
ls
cd d2big/back
ls
```

<div>
  <span class="practice">실습 1</span> <img src="images/aws (11).png" alt="alt text"><br>
  <span class="practice">실습 2</span> <img src="images/aws (12).png" alt="alt text"><br>
  <span class="practice">실습 3</span> <img src="images/aws (13).png" alt="alt text"><br>
  <span class="practice">실습 4</span> <img src="images/aws (14).png" alt="alt text"><br>
  <span class="practice">실습 5</span> <img src="images/aws (15).png" alt="alt text"><br>
</div>

<br/>
<br/>
<br/>

##### 2. 노드설치

1. 노드 설치하기

```bash
   cd back    //back 있는 경로로 이동
   sudo apt-get update
   sudo apt-get install -y build-essential     // 어떤옵션이 나오면 -   Tab 키를 눌러 <Ok> 버튼으로 이동
   sudo apt-get install curl
   sudo apt-get install nodejs -y

```

 <div>
  <span class="practice">실습 1</span> <img src="images/aws (16).png" alt="alt text"><br>
  <span class="practice">실습 2</span> <img src="images/aws (17).png" alt="alt text"><br>

</div>

<br/>
<br/>
<br/>

##### 3. mysql 설치하기

```bash
   1. 설치할수 있는 mysql버젼
      sudo apt-cache search mysql-server
   2. apt 업데이트
      sudo apt-get update
   3. mysql설치 - mysql-server8.0
      sudo apt-get install mysql-server-8.0
   4. mysql접속
      /etc/init.d/mysql status
      sudo mysql -uroot 비번없음
   5. 인증확인
      select user, host, plugin from mysql.user;
   6. 인증업데이트
      use mysql
      UPDATE user SET plugin='caching_sha2_password' WHERE user='root';
      flush privileges;
   7. 비번바꾸기
      SET password for 'root'@'localhost'='1234';
   8. 확인
      mysql -uroot -p
      1234
   9. db만들기
      create database node_react;
```

 <div>
  <span class="practice">실습 1</span> <img src="images/aws (19).png" alt="alt text"><br>
  <span class="practice">실습 2</span> <img src="images/aws (20).png" alt="alt text"><br>
  <span class="practice">실습 3</span> <img src="images/aws (21).png" alt="alt text"><br>
  <span class="practice">실습 1</span> <img src="images/aws (22).png" alt="alt text"><br>
  <span class="practice">실습 2</span> <img src="images/aws (23).png" alt="alt text"><br>
</div>
<br/>
<br/>
<br/>

##### 4. [back] - .env 파일만들기

1.  vi .env 파일자동생성및 코드수정
2.  i
3.  다음과 같이 코드 작성

```bash
COOKIE_SECRET=appsecret
DB_PASSWORD=1234
```

4. :wq!
5. ls -al
6. cat .env

 <div>
  <span class="practice">실습 1</span> <img src="images/aws (24).png" alt="alt text"><br>
  <span class="practice">실습 2</span> <img src="images/aws (25).png" alt="alt text"><br>
  <span class="practice">실습 3</span> <img src="images/aws (26).png" alt="alt text"><br>
  <span class="practice">실습 3</span> <img src="images/aws (27).png" alt="alt text"><br>
</div>

<br/>
<br/>
<br/>

##### 5. npx sequelize db:create

※ 2번에서 처리가 마무리 되었다면 db가 생성되는 코드 / db가 있다면 pass

```bash
sudo apt install npm   // 잘 설치가 안되었다면
sudo npm i
sudo npx sequelize db:create
```

 <div>
  <span class="practice">실습 1</span> <img src="images/aws (28-1).png" alt="alt text"><br>
  <span class="practice">실습 1</span> <img src="images/aws (28-2).png" alt="alt text"><br>
</div>
<br/>
<br/>
<br/>

##### 6. pm2

- 우분투를 나가버리면 서버가 꺼짐. 백그라운드로 서버실행하게 만들기

1.  방화벽확인
2.  설치코드 - sudo npm i pm2 cross-env helmet hpp
3.  실행 - sudo npm start && sudo npx pm2
4.  [back] - 포트번호 : 80 했다면 > 퍼블릭ip로 접속가능
5.  코드확인 : pm2 start app.js (js 꼭붙이기)

[방화벽확인]

```bash
sudo ufw status
sudo ufw enable
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw status
```

[설치]

```bash
sudo npm i pm2  cross-env  helmet hpp
```

[실행]

```bash
sudo npm start && sudo npx pm2
```

npx pm2 logs
npx pm2 kill
sudo npx pm2 list
sudo npx pm2 reload all

sudo lsof -i tcp:3065
sudo lsof -i tcp:80

 <div>
  <span class="practice">실습 1</span> <img src="images/aws (29).png" alt="alt text"><br>
  <span class="practice">실습 2</span> <img src="images/aws (30).png" alt="alt text"><br>
</div>

<br/>
<br/>
<br/>

##### 8. public ip로 접속해보기

1.  탄력적 ip 설정
2.  public ip로 접속

 <div>
  <span class="practice">실습 3</span> <img src="images/aws (31).png" alt="alt text"><br>
  <span class="practice">실습 4</span> <img src="images/aws (32).png" alt="alt text"><br>
</div>

<br/>
<br/>
<br/>

---

#### ■ PART004. EC2 올리기 - FRONT

##### 1. 코드변경

1. [front]- [config]-config.js

- back public ip로 변경

```
export const backUrl =
process.env.NODE_ENV === 'production' ? 'https://d2big.com' : 'http://localhost:3065';

```

> ㅁ추후 domain 연결후

```
export const backUrl =
process.env.NODE_ENV === 'production' ? 'https://d2big.com' : 'http://localhost:3065';
```

<br/>
<br/>

2. [front]- [sagas]- index.js

```
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;
```

<br/>
<br/>

3. [front] - package.json

```bash
"dev": "next -p 3000",
"build": "cross-env ANALYZE=true NODE_ENV=production next build",
"start": "cross-env NODE_ENV=production next start -p 3000"
```

 <div>
  <span class="practice">실습 1</span> <img src="images/aws (41).png" alt="alt text"><br>
  <span class="practice">실습 2</span> <img src="images/aws (42).png" alt="alt text"><br>
  <span class="practice">실습 3</span> <img src="images/aws (43).png" alt="alt text"><br>
  <span class="practice">실습 4</span> <img src="images/aws (44).png" alt="alt text"><br>
  <span class="practice">실습 5</span> <img src="images/aws (45).png" alt="alt text"><br>
  <span class="practice">실습 6</span> <img src="images/aws (46).png" alt="alt text"><br>
  <span class="practice">실습 7</span> <img src="images/aws (47).png" alt="alt text"><br>
  <span class="practice">실습 8</span> <img src="images/aws (48).png" alt="alt text"><br>
  <span class="practice">실습 9</span> <img src="images/aws (49).png" alt="alt text"><br>
</div>

<br/>
<br/>
<br/>

##### 2. [FRONT] ssh를 이용하여 연결하여 git파일다운로드

```bash
1. [vs code] - ssh로 접속
ssh -i "front.pem" ubuntu@ec2-15-164-162-146.ap-northeast-2.compute.amazonaws.com
yes

2. github에서 clone
git clone  https://github.com/sally03915/nodeReact.git
ls

... pass 3. 이름이 길면 폴더명 수정
mv d2big_nodeReact2025 d2big
ls

cd  d2big/front
ls
```

 <div>
  <span class="practice">실습 1</span> <img src="images/aws (33).png" alt="alt text"><br>
  <span class="practice">실습 2</span> <img src="images/aws (34).png" alt="alt text"><br>
</div>

<br/>
<br/>
<br/>

##### 2. 노드 설치하기

```bash
sudo  apt-get  update
sudo  apt-get  install  -y  build-essential
sudo  apt-get  install  curl
sudo  apt-get  install nodejs  -y
sudo  apt-get  install npm

npm install --legacy-peer-deps
npm i next@13.4.13 --legacy-peer-deps

node -v
npm  -v

```

 <div>
  <span class="practice">실습 1</span> <img src="images/aws (35).png" alt="alt text"><br>
  <span class="practice">실습 2</span> <img src="images/aws (36).png" alt="alt text"><br>
  <span class="practice">실습 3</span> <img src="images/aws (37).png" alt="alt text"><br>
  <span class="practice">실습 4</span> <img src="images/aws (38).png" alt="alt text"><br>
  <span class="practice">실습 5</span> <img src="images/aws (39).png" alt="alt text"><br>
  <span class="practice">실습 6</span> <img src="images/aws (40).png" alt="alt text"><br>
</div>

<br/>
<br/>
<br/>

<br/>
<br/>
<br/>

##### 3. build

1. build

- npm run build : 프로젝트의 소스 코드를 실제로 배포 가능한 형태로 변환하는 작업을 수행하는 명령어

```bash
npm run build
```

※ 참고 - 파일 수정 후 다시 받을때

```bash
git pull origin main
```

<br/>
<br/>

5.  [aws] - [front]

```bash
npm i pm2
npx pm2 start  npm  -- start
```

6. 탄력적ip

<br/>
<br/>
<br/>

---

<div class="bg"><mark style="font-weight:bold; padding:5px">AWS2</mark> DOMAIN + HTTPS  / BRANCH-3</div>

#### ■ PART005. 도메인연결 - 서비스 : Route 53

1. 왼쪽메뉴 - 호스팅영역
2. 호스팅영역생성

- 도메인이름 : d2bing.com
- NS

- 레코드세트생성 : d2big.com 유형 : A-IPv4 / 값 : front ipv4
- 레코드세트생성 : api.d2big.com 유형 : A-IPv4 / 값 : back ipv4
- 레코드세트생성 : www.d2big.com 유형 : cname / 값 : d2big.com

hsts 해제 - https로 접속하면 그 다음부터 일정시간동안 무조건 https로 접속해야함.

sudo npx pm2 list

- secure 는 일단 false - https적용시 true로 만들기
- domain에서 .d2big.com 으로 만들면 . 을 만들면 api.d2big.com 과 d2big.com 사이에서 쿠키가 공유
  cookie: {
  httpOnly: true,
  secure: false,
  domain: process.env.NODE_ENV === 'production' && '.d2big.com'
  },

코드변경시 다시 올리고
sudo npx pm2 reload all

<br/>
<br/>
<br/>

---

#### ■ PART006. nginx (HTTPS)

<br/>
<br/>

##### 1. nginx ?

- 정적 파일 서빙: 이미지, CSS, JS 같은 정적 파일은 nginx가 빠르게 처리하고, Node.js는 API나 동적 처리에 집중
- 리버스 프록시: nginx가 외부 요청을 받아서 내부의 Node.js 서버로 전달, 이 구조는 보안과 성능 면에서 유리
- 로드 밸런싱: 여러 개의 Node.js 인스턴스를 띄워서 nginx가 트래픽을 분산

![nginx001](nginx001.png)

- nginx가 80/443 포트를 리스닝
- Next.js는 3000번 포트에서 실행 중
  <br/><br/>

<br/>
<br/>

##### 2. nginx 설치 - front

```bash
[front]
sudo su
sudo lsof -i tcp:80
(나오는 값이 없어야 함, 나온다면 sudo kill -9 프로세스아이디(PID))
```

```bash
sudo apt-get install -y nginx
```

<br/>
<br/>

##### 3. 설정파일 - 서버네임바꾸기기

```bash
vi /etc/nginx/nginx.conf
```

```bash

(여기서 http 안에 server에 여러분 도메인(server_name)과 프록시 포트(3000같은 것)로 작성)

server {
    listen 80;
    server_name d2bing.com;
    location / {
       proxy_set_header HOST $host;
       proxy_pass  http://127.0.0.1:3065;
       proxy_redirect off;
    }
}
```

```bash
sudo systemctl start nginx (정상 실행이면 바로 아무 말 없이 실행)

sudo lsof -i tcp:80 (nginx가 보여야 함)
```

- https 인증서를 발생해줌 : SSL 인증서 (Let's Encrypt 기준)

<br/>
<br/>

##### 4.certbot-auto

```bash
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
ls -al

./certbot-auto
y
sally03915@gmail.com
a
y
1  도메인이 보이면 1번 누르면 됨

sudo systemctl start nginx
```

- chmod a+x certbot-auto 모든 유저에게 실행권한

```bash
sudo npx pm2 start npm  --start
sudo npx pm2 monit
```

```bash
./certbot-auto
  (자동화하려면 crontab 명령어 알아보기)
```

<br/>
<br/>

##### 5. nginx 설치 - back

```bash
[back]
sudo su
sudo lsof -i tcp:80
(나오는 값이 없어야 함, 나온다면 sudo kill -9 프로세스아이디(PID))
sudo npx pm2 kill
```

```bash
sudo apt-get install -y nginx
```

<br/>
<br/>

##### 6. 설정파일 - 서버네임바꾸기기

```bash
vi /etc/nginx/nginx.conf
```

```bash

(여기서 http 안에 server에 여러분 도메인(server_name)과 프록시 포트(3000같은 것)로 작성)

server {
    listen 80;
    server_name api.d2bing.com;
    location / {
       proxy_set_header  Host $host;
       proxy_set_header  X-Forwarded-Proto  $scheme;
       proxy_pass  http://127.0.0.1:3065;
       proxy_redirect off;
    }
}
```

```bash
sudo systemctl start nginx (정상 실행이면 바로 아무 말 없이 실행)

sudo lsof -i tcp:80 (nginx가 보여야 함)
```

- https 인증서를 발생해줌 : SSL 인증서 (Let's Encrypt 기준)

<br/>
<br/>

##### 7.certbot-auto

```bash
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
ls -al

./certbot-auto
y
sally03915@gmail.com
a
y
1  도메인이 보이면 1번 누르면 됨

sudo systemctl start nginx
```

- chmod a+x certbot-auto 모든 유저에게 실행권한

```bash
sudo npx pm2 start npm  --start
sudo npx pm2 monit
```

```bash
./certbot-auto
  (자동화하려면 crontab 명령어 알아보기)
```

<br/>
<br/>

##### 8. [back] - [config] - config.js

```bash
export const backUrl = '//api.d2big.com';
```

- http , https 알아서 받아줌.

<br/>
<br/>

##### 9. [back] - app.js

```bash
1. passportConfig();  다음에
  if (process.env.NODE_ENV === 'production') {
   app.set('trust proxy' , 1);
   ... 안에 코드 생략
  }
   app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true,
      domain: process.env.NODE_ENV === 'production' && '.nodebird.com'
    },
  }));
2. cookie 부분 - secure : true
3. https://d2big.com
```

<br/>
<br/>

##### 10. 콘솔 다 지우기

1. console.log 한부분들 다 지우기
2. [front] - next.config.js

- 이부분이 없으면 브라우저 웹팩에 소스코드들이 다 노출됨.

```bash
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ],
    };
  },
});

```

3. [front] - [store] - configureStore.js

```bash
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  return next(action);
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(sagaMiddleware)
    : composeWithDevTools(applyMiddleware(sagaMiddleware, loggerMiddleware));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;

```

4. [front] - [reducers] - index.js

```bash
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

// (이전상태, 액션) => 다음상태
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;

```

5. [front] - [components] - PostCardContent.js , PostCard.js

- 모든링크에 <Link prefetch={false}

```bash
 <div>
      {editMode
        ? (
          <>
            <TextArea value={editText} onChange={onChangeText} />
            <Button.Group>
              <Button loading={updatePostLoading} onClick={onChangePost(editText)}>수정</Button>
              <Button type="danger" onClick={onClickCancel}>취소</Button>
            </Button.Group>
          </>
        )
        : postData.split(/(#[^\s#]+)/g).map((v, i) => {
          if (v.match(/(#[^\s#]+)/)) {
            return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}><a>{v}</a></Link>;
          }
          return v;
        })}
    </div>
```

<br/>
<br/>

---

<div class="bg"><mark style="font-weight:bold; padding:5px">AWS3</mark> IMAGE  / BRANCH-4</div>
#### ■ PART007. PART003. 이미지작업

1. 이미지작업
2. 도메인작업
3. 파일올리기

<br/>
<br/>
<br/>

##### 2. 이미지는 s3

- server가 계속복제되기때문에.... 계속 이미지를 복사해서 백업본이 생김.
-

1. 네비게이션 - 서비스 - S3

1) 버킷만들기 : react-node-d2big , 리전설정 , ACL 비활성화 - 내가 접속한 계정에서만 소유하도록 , 동의 □ 모든 퍼블릭 액세스 차단 풀기
2) [권한]탭

```적용코드
{
    "Version": "2012-10-17", // Bucket Policy의 문법이 언제 날짜 기준으로 확정된 문법을 사용하는지 → 2008-10-17 버전 후 2012-10-17 버전이 있는데, 그 뒤로는 업데이트가 안됐음
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*" ,
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
            ],
            "Resource": "arn:aws:s3:::react-node-d2big/*",
        }
    ]
}
```

> 탭에 권한이 PUBLIC으로 바뀐것 확인

3. 내이름탭 클릭 - 보안자격증명 - CloudFront 키페어 - 새 액세스키만들기 - 키 다운로드
4. local back으로 접속하고

```
npm  i  multer-s3  aws-sdk
```

multer-s3 파일올리기
aws-sdk s3접근권한 얻기

5.  .env

```
COOKIE_SECRET=appsecret
DB_PASSWORD=1234
S3_ACCESS_KEY_ID=다운로드받은값
S3_SECRET_ACCESS_KEY=다운로드받은값
```

6. [back] - .env 파일만들기
   vi .env 파일자동생성및 코드수정
   i

```
COOKIE_SECRET=appsecret
DB_PASSWORD=1234
S3_ACCESS_KEY_ID=다운로드받은값
S3_SECRET_ACCESS_KEY=다운로드받은값
```

:wq!

1. [front] - PostForm.js / PostImage.js / ImagesZoom backUrl 빼기

<br/>
<br/>
<br/>

##### 3. 모바일에서는 용량줄이기 - 리사이징

- 이미지 업로드시 함수를 실행해서 이미지를 리사이징하기

1. local - [lambda] 폴더만들기 front와 back과 같은경로
2. 프로젝트 초기화 npm init
3. aws접속, 리사이징도구 설치

```
npm i  aws-sdk  sharp
```

4. index.js 작성
   const s3 = new AWS.S3(); 안에서 알아서 key를 찾아서 설정할 필요가 없음.

```
const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

index.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // react-node-d2big
  const Key = decodeURIComponent(event.Records[0].s3.object.key); // original/123_abc.png
  console.log(Bucket, Key);
  const filename = Key.split('/')[Key.split('/').length - 1];
  const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase();
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;
  console.log('filename', filename, 'ext', ext);

  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise();
    console.log('original', s3Object.Body.length);
    const resizedImage = await sharp(s3Object.Body)
      .resize(400, 400, { fit: 'inside' })
      .toFormat(requiredFormat)
      .toBuffer();
    await s3.putObject({
      Bucket,
      Key: `thumb/${filename}`,
      Body: resizedImage,
    }).promise();
    console.log('put', resizedImage.length);
    return callback(null, `thumb/${filename}`);
  } catch (error) {
    console.error(error)
    return callback(error);
  }
}

```

sharp 공식문서 가서 확인할것.

5.  aws - [back] 과 같은 서버에 / [lambda] 다운로드 , 설치

```
lambda로 가서
npm i
apt   install   zip
sudo zip -r  aws-upload.zip  ./*
sudo  curl  "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip"   -o  "awscliv2.zip"
unzip  awscliv2.zip
sudo  ./aws/install
aws  configure

//.dev에서 설정한 access_key_id ,  secret key  ,  ap-north-east2  리젼  , json 입력하기

aws  s3  cp  "aws-upload.zip"   s3://react-node-d2big
```

sudo ./aws/install // aws 명령어 칠수 있게
s3://react-node-d2big // s3://뒤에는 본인꺼

6. aws - 서비스 [ lambda ]

- 함수생성 - 새로작성
- 함수이름 - [image-resize]

![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
4개만 남아 있는상태에서 index.js node_modules, package.json , package-lock.json 압축하기

```
sudo zip  -r aws-upload.zip   ./*
aws  s3  cp  "aws-upload.zip"   s3://react-node-d2big
```

7.  local - [back] - [routes] - post.js

```
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
  console.log(req.files);
  res.json(req.files.map((v) => v.location.replace(/\/original\//, '/thumb/')));
});
```

8.  local - [front] - [components] - ImagesZoom - index.js

```
<Slick>  안에
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img src={`${v.src.replace(/\/thumb\//, '/original/')}`} alt={v.src} />
              </ImgWrapper>
            ))}
</Slick>
```

9. 다시올리고

```back
sudo  npx  pm2  reload all
```

```front
sudo npm run build
sudo  npx  pm2  reload all
```

10. local - [front] - [components] - PostForm.js

```bash
{Array.isArray(imagePaths) ? imagePaths.map((v, i) => (
  <div key={v} style={{ display: 'inline-block' }}>
    {/* s3안할때   <img src={`${backUrl}/${v}`} style={{ width: '200px' }} alt={v} /> */}
    <img src={`${v.replace(/\/original\//, '/thumb/')}`} style={{ width: '200px' }} alt={v} />
    <div>
      <Button onClick={onRemoveImage(i)}>제거</Button>
    </div>
  </div>
)) : null}
```
