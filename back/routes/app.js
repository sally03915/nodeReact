const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);
passportConfig();


/////4. 각종사용 연결
if (process.env.NODE_ENV === 'production') { //// 배포용
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(cors({
        //origin: 'http://d2big.com',    front
        origin: 'http://13.209.81.237',
        credentials: true,
    }));   ///배포된 프론트엔드 서버의 주소  3.36.100.83

} else {  //// 개발용
    app.use(morgan('dev'));  // http요청로그를 기록하여 디버깅과 모니터링
    app.use(cors({
        origin: 'http://localhost:3000',  // 요청허용
        credentials: true,  // 쿠키와 같은 인증정보르 포함한 요청도 허용
    }));
}
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,  // 초기화되지 않은 세션은 저장하지 않음.
    resave: false,  // 세션이 변경되지 않았다면 저장하지 않음.
    secret: process.env.COOKIE_SECRET,  // 세션데이털르 암호화하기위한 비밀키
    cookie: {
        httpOnly: true,
        secure: false,
        domain: process.env.NODE_ENV === 'production' && '13.209.81.237' //'.d2big.com'   back
    },    ///배포된  서버의 주소  54.180.24.191   -   백엔드 서버가 위치한 실제 도메인
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('hello express');
});

app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(3065, () => {
    console.log('서버 실행 중!');
});
