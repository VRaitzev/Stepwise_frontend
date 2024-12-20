import { useState } from 'react';

export function BookCard({ title, description, numberOfChapters, editStatus, switchEditStatus, id, editHandler }) {
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editNumberOfChapters, setEditNumberOfChapters] = useState(0);

    if (!editStatus) {
        return (
            <div className="resours-custom-card mb-4">
                <div className="card-body">
                    <h5 className="card-title mt-3 px-2 fs-3 fw-normal">{title}</h5>
                    <p className="card-text mt-3 px-2 fs-4 fw-light">{description}</p>
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Число глав: <span className="custom-text">{numberOfChapters}</span></p>
                    <button onClick={() => switchEditStatus(id, 'book')} className="custom-button custom-button--medium content-center fs-4 fw-light mb-3">Редактировать</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="resours-custom-card mb-4">
                <div className="card-body">
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Как называется книга?</p>
                    <input
                        onChange={(e) => setEditName(e.target.value)}
                        value={editName}
                        type="text"
                        className="custom-edit-text custom-border custom-placeholder fs-4 fw-light text-center custom-edit-text--big"
                        placeholder="Введите название книги"
                    />
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Как вы можете её описать?</p>
                    <textarea
                        onChange={(e) => setEditDescription(e.target.value)}
                        value={editDescription}
                        className="custom-edit-text custom-placeholder fs-4 fw-light text-center custom-edit-text--big custom-border--half"
                        placeholder="Введите краткое описание книги"
                    />
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Сколько в ней глав?</p>
                    <input
                        onChange={(e) => setEditNumberOfChapters(e.target.value)}
                        value={editNumberOfChapters}
                        type="number"
                        className="custom-edit-text custom-border custom-placeholder fs-4 fw-light text-center custom-edit-text--big"
                        placeholder="Введите число глав в книге"
                    />
                    <button
                        onClick={() => {
                            editHandler(id, 'book', { title: editName, description: editDescription, numberOfChapters: editNumberOfChapters });
                            switchEditStatus(id, 'book');
                        }}
                        className="custom-button custom-button--medium content-center fs-4 fw-light mb-3 mt-3"
                    >
                        Готово
                    </button>
                </div>
            </div>
        );
    }
}

export function VideoCard({ title, description, duration, editStatus, switchEditStatus, id, editHandler }) {
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editDuration, setEditDuration] = useState(0);

    if (!editStatus) {
        return (
            <div className="resours-custom-card mb-4">
                <div className="card-body">
                    <h5 className="card-title mt-3 px-2 fs-3 fw-normal">{title}</h5>
                    <p className="card-text mt-3 px-2 fs-4 fw-light">{description}</p>
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Длительность: <span className="custom-text">{duration} минут</span></p>
                    <button onClick={() => switchEditStatus(id, 'video')} className="custom-button custom-button--medium content-center fs-4 fw-light mb-3">Редактировать</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="resours-custom-card mb-4">
                <div className="card-body">
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Как называется видео?</p>
                    <input
                        onChange={(e) => setEditTitle(e.target.value)}
                        value={editTitle}
                        type="text"
                        className="custom-edit-text custom-border custom-placeholder fs-4 fw-light text-center custom-edit-text--big"
                        placeholder="Введите название видео"
                    />
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Как вы можете его описать?</p>
                    <textarea
                        onChange={(e) => setEditDescription(e.target.value)}
                        value={editDescription}
                        className="custom-edit-text custom-placeholder fs-4 fw-light text-center custom-edit-text--big custom-border--half"
                        placeholder="Введите краткое описание видео"
                    />
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Какова длительность видео (в минутах)?</p>
                    <input
                        onChange={(e) => setEditDuration(e.target.value)}
                        value={editDuration}
                        type="number"
                        className="custom-edit-text custom-border custom-placeholder fs-4 fw-light text-center custom-edit-text--big"
                        placeholder="Введите длительность в минутах"
                    />
                    <button
                        onClick={() => {
                            editHandler(id, 'video', { title: editTitle, description: editDescription, duration: editDuration });
                            switchEditStatus(id, 'video');
                        }}
                        className="custom-button custom-button--medium content-center fs-4 fw-light mb-3 mt-3"
                    >
                        Готово
                    </button>
                </div>
            </div>
        );
    }
}

export function CourseCard({ title, description, numberOfLessons, editStatus, switchEditStatus, id, editHandler }) {
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editNumberOfLessons, setEditNumberOfLessons] = useState(0);

    if (!editStatus) {
        return (
            <div className="resours-custom-card mb-4">
                <div className="card-body">
                    <h5 className="card-title mt-3 px-2 fs-3 fw-normal">{title}</h5>
                    <p className="card-text mt-3 px-2 fs-4 fw-light">{description}</p>
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Число уроков: <span className="custom-text">{numberOfLessons}</span></p>
                    <button onClick={() => switchEditStatus(id, 'course')} className="custom-button custom-button--medium content-center fs-4 fw-light mb-3">Редактировать</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="resours-custom-card mb-4">
                <div className="card-body">
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Как называется курс?</p>
                    <input
                        onChange={(e) => setEditTitle(e.target.value)}
                        value={editTitle}
                        type="text"
                        className="custom-edit-text custom-border custom-placeholder fs-4 fw-light text-center custom-edit-text--big"
                        placeholder="Введите название курса"
                    />
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Как вы можете его описать?</p>
                    <textarea
                        onChange={(e) => setEditDescription(e.target.value)}
                        value={editDescription}
                        className="custom-edit-text custom-placeholder fs-4 fw-light text-center custom-edit-text--big custom-border--half"
                        placeholder="Введите краткое описание курса"
                    />
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Сколько в курсе уроков?</p>
                    <input
                        onChange={(e) => setEditNumberOfLessons(e.target.value)}
                        value={editNumberOfLessons}
                        type="number"
                        className="custom-edit-text custom-border custom-placeholder fs-4 fw-light text-center custom-edit-text--big"
                        placeholder="Введите число уроков"
                    />
                    <button
                        onClick={() => {
                            editHandler(id, 'course', { title: editTitle, description: editDescription, numberOfLessons: editNumberOfLessons });
                            switchEditStatus(id, 'course');
                        }}
                        className="custom-button custom-button--medium content-center fs-4 fw-light mb-3 mt-3"
                    >
                        Готово
                    </button>
                </div>
            </div>
        );
    }
}
