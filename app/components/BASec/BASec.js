import React from 'react';
import './BASec.css';
import Image from 'next/image'; // Добавляем импорт компонента Image

function BASec() {
    return (
        <div className="BasGeneral">
            <div className="BasTop">
                <div className="BasLeft">
                    Кейс «до»: неудовлетворительная эстетика и искусственный вид виниров, крупная форма зубов с неестественным цветом, с запросом на естественную, гармоничную улыбку.
                </div>
                <div className="BasRight">
                    <Image 
                        src="/doPosle/1do.jpeg" // Замените на путь к вашему изображению
                        alt="do" // Добавьте короткое описание изображения для доступности
                        width={230} // Установите желаемую ширину
                        height={350} // Установите желаемую высоту
                    />
                    <Image 
                        src="/doPosle/1Posle.jpeg" // Замените на путь к вашему изображению
                        alt="posle" // Добавьте короткое описание изображения для доступности
                        width={230} // Установите желаемую ширину
                        height={350} // Установите желаемую высоту
                    />
                </div>
            </div>
        </div>
    );
}

export default BASec;