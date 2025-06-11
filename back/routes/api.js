const express = require('express');
const axios = require('axios');
const router = express.Router();
const nodemailer = require('nodemailer');
////////////////////////////////////////////////// search
const client_id = 'reu63fdeQl8IXmwLVsRM';
const client_secret = 'AvEnm8FcX2';

router.get('/search', async (req, res) => {
    const api_url = `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(req.query.query)}`;

    try {
        const response = await axios.get(api_url, {
            headers: {
                'X-Naver-Client-Id': client_id,
                'X-Naver-Client-Secret': client_secret,
            }
        });

        res.status(200).json(response.data); // 응답 데이터를 JSON 형식으로 반환
    } catch (error) {
        console.error('API 요청 오류:', error.response ? error.response.data : error.message);
        res.status(error.response?.status || 500).json({ error: 'API 요청 실패' });
    }
});

////////////////////////////////////////////////// mail 
// POST localhost:3065/api/email
//Content-Type: application/json
/*
{
  "to": "cozizii-_-@naver.com",
  "subject": "Test Email",
  "text": "Hello, this is a test email sent from Postman!"
}
*/ 

router.post('/email', async (req, res) => {
  const { to, subject, text } = req.body;
  const transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',
      port: 465,
      secure: true,
      auth: {
          user: 'cozizii@naver.com',
          pass: '300',
      }
  });

  const mailOptions = {
      from: 'cozizii@naver.com',
      to,
      subject,
      text
  };

  try {
      const info = await transporter.sendMail(mailOptions);
      res.json({ message: 'Email sent successfully', info });
  } catch (error) {
      res.status(500).json({ message: 'Error sending email', error });
  }
});

module.exports = router;

 