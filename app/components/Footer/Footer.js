import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="footerGeneral">
            <div className="footerTop">
                <div className="footerLeft">
                    <p className="footerText">Отставьте заявку</p>
                    <p className="footerText">и получите скидку</p>
                    <p className="footerText">35% на установку</p>
                    <p className="footerText">виниров E-MAX</p>
                </div>
                <div className="footerRight">
                    <input type="text" placeholder="Как вас зовут?" />
                    <input type="text" placeholder="Номер телефона" />
                    <button>Отправить заявку</button>
                </div>
            </div>
            <div className="footerFooter">
                <span className="footerLink">Политика конфиденциальности</span>
                <div className="centeredText">
                    <span>ООО &ldquo;Лаборатория улыбок и красоты&rdquo;</span>
                    <span>ВСЕ ПРАВА ЗАЩИЩЕНЫ, 2023</span>
                </div>
                <span className="footerLink">Сайт клиники Dr. Elmar</span>
            </div>
        </div>
    );
}


export default Footer;
