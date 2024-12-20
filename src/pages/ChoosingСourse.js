import { useState } from "react";
import { useNavigate } from 'react-router-dom';
function ChoosingCourse() {
    const navigate = useNavigate();
    const [cardClasses, setCardClasses] = useState([
        'custom-card-left',
        'custom-card-center',
        'custom-card-right',
    ]);

    const rotateRight = () => {
        setCardClasses((prev) => {
            const newClasses = [...prev];
            newClasses.unshift(newClasses.pop());
            return newClasses;
        });
    };

    const rotateLeft = () => {
        setCardClasses((prev) => {
            const newClasses = [...prev];
            newClasses.push(newClasses.shift());
            return newClasses;
        });
    };

    return (
        <div className="vh-100 main-block-card-selection">
            <div className="position-relative">
                <div className={`custom-card ${cardClasses[0]}`}>
                    <img src="https://picsum.photos/300/200" class="card-img-top" alt="..."/>
                        <div class="card-body col text-center">
                            <h5 className="card-title text-center mt-2 custom-text fs-3">Физический план</h5>
                            <p className="card-text text-center mt-2 px-2 fs-4 fw-light">Создайте своё идеальное тело, следуя персонализированным тренировочным программам, которые помогут стать сильнее, выносливее и активнее.</p>
                            <button onClick={()=> navigate('/initiation/physicalPlan')} className="custom-button custom-button--medium content-center fs-4 fw-light">Выбрать!</button>
                        </div>
                </div>
                <div className={`custom-card ${cardClasses[1]}`}>
                    <img src="https://picsum.photos/300/200" class="card-img-top" alt="..."/>
                        <div className="card-body col text-center">
                            <h5 className="card-title text-center mt-2 custom-text fs-3" >Комплексный план</h5>
                            <p className="card-text text-center mt-2 px-2 fs-4 fw-light">Постройте здоровую и успешную жизнь, совмещая спорт, обучение и работу над личной эффективностью. Этот план раскрывает ваш потенциал.</p>
                            <button className="custom-button custom-button--medium content-center fs-4 fw-light">Выбрать!</button>
                        </div>
                </div>
                <div className={`custom-card ${cardClasses[2]}`}>
                    <img src="https://picsum.photos/300/200" class="card-img-top" alt="..."/>
                        <div className="card-body col text-center">
                            <h5 className="card-title text-center mt-2 custom-text fs-3">Ментальный план</h5>
                            <p className="card-text text-center mt-2 px-2 fs-4 fw-light">Освойте искусство умственного роста и превратите его в привычку. Этот план поможет вам достичь успеха через регулярное развитие себя.</p>
                            <button onClick={()=> navigate('/initiation/mentalPlan')} className="custom-button custom-button--medium content-center fs-4 fw-light">Выбрать!</button>
                        </div>
                </div>
            </div>
            <div className="signature-card-selection fs-4 fw-light">
                <p className="text-center fs-3">Ваш путь к успеху начинается здесь. Выберите план!</p>
            </div>

            <div>
                <button
                    onClick={rotateLeft}
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Предыдущий</span>
                </button>
                <button
                    onClick={rotateRight}
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Следующий</span>
                </button>
            </div>
        </div>
    );
}

export { ChoosingCourse };
