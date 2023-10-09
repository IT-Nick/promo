import React from 'react';
import './HeaderBar.css';
import Image from 'next/image';

function HeaderBar() {
    return (
        <div className="header-container">
            <div className="header-logo">
                <Image src="/LogoHeader.svg" alt="Logo" width={200} height={60} />  {/* Используем компонент Image */}
            </div>
            <div className="header-right">
                <div className="header-phone">+7 (495) 005-57-67</div>
                <button className="header-button">Узнать больше</button>
            </div>
        </div>
    );
}

export default HeaderBar;