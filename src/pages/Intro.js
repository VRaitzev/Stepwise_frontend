import { useNavigate } from 'react-router-dom';
function Intro() {
  const navigate = useNavigate();
  return (
    <div className="vh-100">
      <div className="container-fluid text-center">
        <p className="fs-1 fw-normal py-1 mt-5">Добро пожаловать в <span className="custom-text">Stepwise</span>!</p>
        <p className="fs-2 fw-light py-1">Начните свой путь к новым вершинам!
          Соберите в одном месте всё, что нужно для вашего развития — от курсов и книг до фитнес-целей.
          Отслеживайте свой прогресс и наблюдайте, как упорство превращается в результаты.</p>
      </div>
      <div className="container text-center fs-3 fw-light py-3">
        <div className="row ">
          <div className="col">
            <i class="bi bi-calendar fs-1 custom-text"></i><br /> Получайте ежедневный план задач, составляйте и добавляйте свои
          </div>
          <div className="col">
            <i class="bi bi-fire fs-1 custom-text"></i><br />Создавайте собственный тренировочный план и следите за прогрессом
          </div>
          <div className="col">
            <i class="bi bi-book fs-1 custom-text"></i><br />Удобный журнал для книг и курсов, который помогает организовать чтение
          </div>
          <div className="col">
            <i class="bi bi-camera-reels fs-1 custom-text"></i><br />Отслеживайте просмотренные видеоуроки и курсы, оставаясь в курсе
          </div>
          <div className="col">
            <i class="bi bi-pen fs-1 custom-text"></i><br />Внесите все свои задачи для целостного планирования дня
          </div>
        </div>
      </div>
      <div className='d-flex flex-row-reverse'>
      <button onClick={() => navigate('/initiation/registartionPage')} className='custom-button custom-button--big custom-button--intro fw-light fs-4 ms-5'>Попробовать!</button>
      <button onClick={() => navigate('/initiation/signIn')} className='custom-button custom-button--big custom-button--intro fw-light fs-4'>Войти!</button>
      </div>
    </div>
  );
}

export { Intro }