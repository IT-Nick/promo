import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="footerGeneral">
            <div className="footerTop">
                <div className="footerLeft">
                    <svg viewBox="0 0 400 138" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="30" fontFamily="Arial" fontSize="24" fill="white">
                            Отставьте заявку
                        </text>
                        <text x="0" y="55" fontFamily="Arial" fontSize="24" fill="white">
                            и получите скидку
                        </text>
                        <text x="0" y="80" fontFamily="Arial" fontSize="24" fill="white">
                            35% на установку
                        </text>
                        <text x="0" y="100" fontFamily="Arial" fontSize="24" fill="white">
                            виниров E-MAX
                        </text>
                    </svg>
                </div>
                <div className="footerRight">
                    <input type="text" placeholder="Как вас зовут?" />
                    <input type="text" placeholder="Номер телефона" />
                    <button>Отправить заявку</button>
                </div>
            </div>
            <div className="footerFooter">
                <span>Политика конфиденциальности</span>
                <span>ООО &ldquo;Лаборатория улыбок и красоты&rdquo;<br />ВСЕ ПРАВА ЗАЩИЩЕНЫ, 2023</span>
                <span>Сайт клиники Dr. Elmar</span>
            </div>
        </div>
    );
}

export default Footer;
