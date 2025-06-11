const express = require('express');
const axios = require('axios');
const router = express.Router();

////////////////////////////////////////////////////  kakao api
const client_id = "YOUR_KAKAO_REST_API_KEY";
const redirect_uri = "http://localhost:4000/redirect";
const token_uri = "https://kauth.kakao.com/oauth/token";

app.get("/login", (req, res) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
    res.redirect(kakaoAuthURL);
});

app.get("/redirect", async (req, res) => {
    const { code } = req.query;
    const tokenResponse = await axios.post(token_uri, null, {
        params: {
            grant_type: "authorization_code",
            client_id,
            redirect_uri,
            code
        }
    });
    const { access_token } = tokenResponse.data;
    res.send(`Access Token: ${access_token}`);
});


module.exports = router;
