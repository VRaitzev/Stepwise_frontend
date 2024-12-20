import { useState } from 'react';

export function NewBookCard({ title, description, numberOfChapters, editStatus, switchEditStatus, id, editHandler, progress, deleteResourceHandler, addRes }) {
    const [editName, setEditName] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    const [editNumberOfChapters, setEditNumberOfChapters] = useState(numberOfChapters);

    if (!editStatus) {
        return (
            <div className="resours-custom-card mb-4">
                <div className="card-body">
                <div className='row'>
                        <div className='col ms-5 mt-3'>
                        <button onClick={() => deleteResourceHandler(id)} className="custom-button custom-button--circle content-center fs-2 fw-light me-3 mb-3">-</button>
                        </div>
                        <div className='col mx-auto mt-3'>
                        <button onClick={() => switchEditStatus(id, 'course')} className="custom-button custom-button--circle content-center fs-2 fw-light me-3 mb-3">e</button>
                        </div>
                        <div className='col me-5 mt-3'>
                        <button onClick={addRes} className="custom-button custom-button--circle content-center fs-2 fw-light mb-3">+</button>
                        </div>
                    </div>
                    <h5 className="card-title px-2 fs-3 fw-normal">{title}</h5>
                    <div className="mt-1">
                        <svg
                            style={{
                                stroke: 'rgb(243, 245, 245))',                // Цвет обводки
                                strokeWidth: '0.2',             // Максимально тонкая линия
                                filter: 'drop-shadow(0px 0px 5px rgb(243, 245, 245))',  // Тень для SVG
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="200"
                            height="200"
                            fill="rgb(20, 254, 236)"
                            // rgb(20, 255, 236);
                            className="bi bi-book"
                            viewBox="0 0 16 16"
                        >
                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                        </svg>
                    </div>
                    <p className="card-text mt-1 px-2 fs-4 fw-light">{description}</p>
                    <div className="progress mb-3 progress--mental-plan-settings mx-auto" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                        <div style={{ width: progress * 2.8 }} className="progress-bar custom-progressbar"></div>
                    </div>
                    <p className="card-text mt-3 px-2 fs-4 fw-light mb-4">Число глав: <span className="custom-text">{numberOfChapters}</span></p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="resours-custom-card mb-4">
                <div className="card-body">
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Как называется книга?</p>
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="custom-edit-text custom-border custom-placeholder fs-4 fw-light text-center custom-edit-text--big"
                        placeholder="Введите название книги"
                    />
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Как вы можете её описать?</p>
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="custom-edit-text custom-placeholder fs-4 fw-light text-center custom-edit-text--big custom-border--half"
                        placeholder="Введите краткое описание книги"
                    />
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Сколько в ней глав?</p>
                    <input
                        type="number"
                        value={editNumberOfChapters}
                        onChange={(e) => setEditNumberOfChapters(e.target.value)}
                        className="custom-edit-text custom-border custom-placeholder fs-4 fw-light text-center custom-edit-text--big"
                        placeholder="Введите число глав"
                    />
                    <button
                        onClick={() => {
                            editHandler(id, 'book', { type: 'book', name: editName, description: editDescription, volume: editNumberOfChapters });
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

export function NewVideoCard({ title, description, duration, editStatus, switchEditStatus, id, editHandler, progress, deleteResourceHandler, addRes }) {
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    const [editDuration, setEditDuration] = useState(duration);

    if (!editStatus) {
        return (
            <div className="resours-custom-card mb-4">
                <div className="card-body">
                <div className='row'>
                        <div className='col ms-5 mt-3'>
                        <button onClick={() => deleteResourceHandler(id)} className="custom-button custom-button--circle content-center fs-2 fw-light me-3 mb-3">-</button>
                        </div>
                        <div className='col mx-auto mt-3'>
                        <button onClick={() => switchEditStatus(id, 'course')} className="custom-button custom-button--circle content-center fs-2 fw-light me-3 mb-3">e</button>
                        </div>
                        <div className='col me-5 mt-3'>
                        <button onClick={addRes} className="custom-button custom-button--circle content-center fs-2 fw-light mb-3">+</button>
                        </div>
                    </div>
                    <h5 className="card-title px-2 fs-3 fw-normal">{title}</h5>
                    <div className="mt-1">
                        <svg
                            style={{
                                stroke: 'rgb(243, 245, 245))',                // Цвет обводки
                                strokeWidth: '0.2',             // Максимально тонкая линия
                                filter: 'drop-shadow(0px 0px 3px rgb(243, 245, 245))',  // Тень для SVG
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="200"
                            height="200"
                            fill="rgb(20, 254, 236)"
                            // rgb(20, 255, 236);
                            className="bi bi-book"
                            viewBox="0 0 16 16"
                        >
                            <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
                        </svg>
                    </div>
                    <p className="card-text mt-1 px-2 fs-4 fw-light">{description}</p>
                    <div className="progress mb-3 progress--mental-plan-settings mx-auto" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                        <div style={{ width: progress * 2.8 }} className="progress-bar custom-progressbar"></div>
                    </div>
                    <p className="card-text mt-3 px-2 fs-4 fw-light mb-4">Длительность: <span className="custom-text">{duration} минут</span></p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="resours-custom-card mb-4">
                <div className="card-body">
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Как называется видео?</p>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="custom-edit-text custom-border custom-placeholder fs-4 fw-light text-center custom-edit-text--big"
                        placeholder="Введите название видео"
                    />
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Как вы можете его описать?</p>
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="custom-edit-text custom-placeholder fs-4 fw-light text-center custom-edit-text--big custom-border--half"
                        placeholder="Введите краткое описание видео"
                    />
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Какова длительность видео (в минутах)?</p>
                    <input
                        type="number"
                        value={editDuration}
                        onChange={(e) => setEditDuration(e.target.value)}
                        className="custom-edit-text custom-border custom-placeholder fs-4 fw-light text-center custom-edit-text--big"
                        placeholder="Введите длительность в минутах"
                    />
                    <button
                        onClick={() => {
                            editHandler(id, 'video', { type: 'video', name: editTitle, description: editDescription, volume: editDuration });
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

export function NewCourseCard({ title, description, numberOfLessons, editStatus, switchEditStatus, id, editHandler, progress, deleteResourceHandler, addRes }) {
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    const [editNumberOfLessons, setEditNumberOfLessons] = useState(numberOfLessons);

    if (!editStatus) {
        return (
            <div className="resours-custom-card mb-4">
                <div className="card-body">
                    <div className='row'>
                        <div className='col ms-5 mt-3'>
                        <button onClick={() => deleteResourceHandler(id)} className="custom-button custom-button--circle content-center fs-2 fw-light me-3 mb-3">-</button>
                        </div>
                        <div className='col mx-auto mt-3'>
                        <button onClick={() => switchEditStatus(id, 'course')} className="custom-button custom-button--circle content-center fs-2 fw-light me-3 mb-3">e</button>
                        </div>
                        <div className='col me-5 mt-3'>
                        <button onClick={addRes} className="custom-button custom-button--circle content-center fs-2 fw-light mb-3">+</button>
                        </div>
                    </div>
                    <h5 className="card-title px-2 fs-3 fw-normal">{title}</h5>
                    <div className="mt-1">
                        <svg
                            style={{
                                stroke: 'rgb(243, 245, 245))',                // Цвет обводки
                                strokeWidth: '0.2',             // Максимально тонкая линия
                                filter: 'drop-shadow(0px 0px 3px rgb(243, 245, 245))',  // Тень для SVG
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="200"
                            height="190"
                            fill="rgb(20, 254, 236)"
                            // rgb(20, 255, 236);
                            className="bi bi-book"
                            viewBox="0 0 16 16"
                        >
                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                        </svg>
                    </div>
                    <p className="card-text mt-3 px-2 fs-4 fw-light">{description}</p>
                    <div className="progress mb-3 progress--mental-plan-settings mx-auto" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                        <div style={{ width: progress * 2.8 }} className="progress-bar custom-progressbar"></div>
                    </div>
                    <p className="card-text mt-3 px-2 fs-4 fw-light mb-4">Число уроков: <span className="custom-text">{numberOfLessons}</span></p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="resours-custom-card mb-4">
                <div className="card-body">
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Как называется курс?</p>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="custom-edit-text custom-border custom-placeholder fs-4 fw-light text-center custom-edit-text--big"
                        placeholder="Введите название курса"
                    />
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Как вы можете его описать?</p>
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="custom-edit-text custom-placeholder fs-4 fw-light text-center custom-edit-text--big custom-border--half"
                        placeholder="Введите краткое описание курса"
                    />
                    <p className="card-text mt-3 px-2 fs-4 fw-light">Сколько в курсе уроков?</p>
                    <input
                        type="number"
                        value={editNumberOfLessons}
                        onChange={(e) => setEditNumberOfLessons(e.target.value)}
                        className="custom-edit-text custom-border custom-placeholder fs-4 fw-light text-center custom-edit-text--big"
                        placeholder="Введите число уроков"
                    />
                    <button
                        onClick={() => {
                            editHandler(id, 'course', { type: 'course', name: editTitle, description: editDescription, volume: editNumberOfLessons });
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
