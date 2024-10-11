// components/Footer.tsx

const Footer = () => {
  return (
    <footer id="footer">
      <ul className="util-menu">
        <li>
          <button type="button" className="btn-util">
            로그아웃
          </button>
        </li>
        <li>
          <button type="button" className="btn-util">
            예약확인/결제
          </button>
        </li>
        <li>
          <button type="button" className="btn-util">
            TOP
          </button>
        </li>
      </ul>
      <ul className="footer-info">
        <li>
          <span>
            <button type="button" className="btn-footer-info">
              <strong>개인정보처리방침</strong>
            </button>
          </span>
          <span>
            <button type="button" className="btn-footer-info">
              이용약관
            </button>
          </span>
        </li>
        <li>비즈플레이(주)</li>
        <li>대표이사 : 김홍기</li>
        <li>
          주소 :{' '}
          <address>서울시 영등포구 영신로 220 KnK디지털타워 12층</address>
        </li>
        <li>사업자등록번호 : 107-88-36127</li>
        <li>통신판매신고번호 : 2015-서울영등포-0113호</li>
        <li>Copyright(c) bizplay All rights reserved.</li>
      </ul>
    </footer>
  );
};

export default Footer;
