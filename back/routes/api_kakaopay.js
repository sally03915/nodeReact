const express = require('express');
const axios = require('axios');
const router = express.Router();
 
const KAKAO_PAY_HOST = 'https://kapi.kakao.com/v1/payment/ready';
const KAKAO_ADMIN_KEY = 'YOUR_ADMIN_KEY'; // 카카오에서 발급받은 관리자 키

// 결제 요청 API 엔드포인트
router.post('/kakao-pay', async (req, res) => {
    try {
        const response = await axios.post(KAKAO_PAY_HOST, {
            cid: 'TC0ONETIME',
            partner_order_id: 'order123',
            partner_user_id: 'user123',
            item_name: '테스트 상품',
            quantity: 1,
            total_amount: 10000,
            tax_free_amount: 0,
            approval_url: 'https://your-site.com/success',
            cancel_url: 'https://your-site.com/cancel',
            fail_url: 'https://your-site.com/fail'
        }, {
            headers: {
                Authorization: `KakaoAK ${KAKAO_ADMIN_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({
            message: '결제 요청 성공',
            redirect_url: response.data.next_redirect_pc_url
        });
    } catch (error) {
        res.status(500).json({
            message: '결제 요청 실패',
            error: error.response ? error.response.data : error.message
        });
    }
});

 
module.exports = router;
