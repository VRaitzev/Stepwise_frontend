import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookCard, VideoCard, CourseCard } from '../components/ResourseCards';
import { useAddMentalPlanMutation } from '../redux/RTK Query API/mentalPlanAPI';
import { useAddResourcesMutation } from '../redux/RTK Query API/ResourceAPI'
import { getAllByRole } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';


function MentalPlan() {
    const navigate = useNavigate();
    const [goal, setGoal] = useState("")
    const [books, setBooks] = useState([]);
    const [videos, setVideos] = useState([]);
    const [courses, setCourses] = useState([]);
    const [addMentalPlan, { error: addMentalPlanError, isLoading: isAddingMentalPlan }] = useAddMentalPlanMutation();
    const [addResources, { error: addResourcesError, isLoading: isAddingResourcesPlan }] = useAddResourcesMutation();
    const user_id =  sessionStorage.getItem('user_id');



    const validateResources = (resources) => {
        return resources.every(resource =>
            resource.name && resource.description && resource.volume
        );
    };

    const switchEditStatus = (id, resourceType) => {
        if (resourceType === 'book') {
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === id ? { ...book, editStatus: !book.editStatus } : book
                )
            );
        } else if (resourceType === 'video') {
            setVideos((prevVideos) =>
                prevVideos.map((video) =>
                    video.id === id ? { ...video, editStatus: !video.editStatus } : video
                )
            );
        } else if (resourceType === 'course') {
            setCourses((prevCourses) =>
                prevCourses.map((course) =>
                    course.id === id ? { ...course, editStatus: !course.editStatus } : course
                )
            );
        }
    };

    const handleAddBook = () => {
        setBooks((prevBooks) => [
            ...prevBooks,
            {
                id: uuidv4(),  // Создаем уникальный id на основе длины массива
                title: "Название книги",
                description: "Duis do cillum elit do. Lorem aliqua esse commodo nulla tempor ea fugiat velit Lorem.",
                numberOfChapters: 10,
                editStatus: true
            }
        ]);
    };

    const handleAddVideo = () => {
        setVideos((prevVideos) => [
            ...prevVideos,
            {
                id: uuidv4(),  // Генерация уникального id для видео
                title: "Название видео",
                description: "Duis do cillum elit do. Lorem aliqua esse commodo nulla tempor ea fugiat velit Lorem.",
                duration: 10,  // Продолжительность видео по умолчанию
                editStatus: true
            }
        ]);
    };

    const handleAddCourse = () => {
        setCourses((prevCourses) => [
            ...prevCourses,
            {
                id: uuidv4(),  // Генерация уникального id для курса
                title: "Название курса",
                description: "Duis do cillum elit do. Lorem aliqua esse commodo nulla tempor ea fugiat velit Lorem.",
                numberOfLessons: 10,  // Количество уроков по умолчанию
                editStatus: true
            }
        ]);
    };

    const handleEdit = (id, type, newParams) => {
        let resources;
        if (type === 'book') {
            resources = books;
        } else if (type === 'video') {
            resources = videos;
        } else if (type === 'course') {
            resources = courses;
        } else {
            console.error('Unknown type');
            return;
        }

        const index = resources.findIndex((e) => e.id === id);
        if (index !== -1) {
            resources[index] = { ...resources[index], ...newParams };
        } else {
            console.error('Resource not found');
        }
    };

    const handleAddMentalPlan = async () => {
        if (!goal) {
            alert("Цель обязательна!");
            return;
        }
        if ((books.length === 0 && videos.length === 0 && courses.length === 0)) {
            alert("Пожалуйста, укажите цель и добавьте хотя бы один ресурс!");
            return;
        }
        const resources = []
        for (const i of books) {
            const new_resource = {
                type: "book",
                name: i.title,
                description: i.description,
                volume: i.numberOfChapters,
            }
            resources.push(new_resource)
        }
        for (const i of videos) {
            const new_resource = {
                type: "video",
                name: i.title,
                description: i.description,
                volume: i.duration
            }
            resources.push(new_resource)
        }
        for (const i of courses) {
            const new_resource = {
                type: "course",
                name: i.title,
                description: i.description,
                volume: i.numberOfLessons,
            }
            resources.push(new_resource)
        }
        if (!validateResources(resources)) {
            alert(`Убедитесь, что все ресурсы заполнены корректно! ${resources.map((item) => `${item.name} ${item.description} ${item.volume}`)}`);
            return;
        }
        try {
            const resource_list = await addResources(resources).unwrap();
            console.log("Ресурсы успешно добавлены в базу данных!");
            alert("Ресурсы успешно добавлены в базу данных!");
            const response = await addMentalPlan({ user_id: user_id, name: goal, goal: goal, resource_list });
            console.log("Ментальный план успешно создан:", response);
            alert("Ментальный план успешно создан!");

            navigate('/main/interationWindow');
        } catch (err) {
            console.error("Ошибка при создании ментального плана:", err);
            alert("Ошибка при создании ментального плана!")
        }

    }

    return (
        <div className="vh-100">
            <div className="container-fluid mt-5 fs-4 fw-light custom-border custom-bg">
                <h5 className="fs-3 text-center mt-4">Добро пожаловать на страницу вашего ментального развития!</h5>
                <p className="mt-1 text-center">
                    Здесь вы можете определить свою цель, к которой хотите стремиться, и выбрать подходящие книги, курсы и видео для её достижения.
                    Мы поможем вам создать индивидуальный план, чтобы сделать ваш путь к знаниям и личностному росту эффективным и увлекательным.
                </p>
                <div className="mt-1 text-center ">
                    <input type="text"
                        onChange={(e) => setGoal(e.target.value)}
                        value={goal}
                        className="mb-3 custom-edit-text custom-border custom-placeholder"
                        placeholder="Итак, укажите цель!"
                        id="loginInput1"
                        aria-describedby="Введите логин" />
                </div>
                <div className="mt-1 text-center ">
                    <p className="mt-1 text-center">
                        Как только вы добавите книги, видео и курсы в свой ментальный план, вы можете нажать на кнопку "Сформировать план".
                        Это зафиксирует ваш выбор и поможет перейти к следующему шагу.
                    </p>
                    <button onClick={handleAddMentalPlan} className="custom-button custom-button--medium content-center fs-4 fw-light  mb-3">Сформировать план</button >
                </div>


            </div>

            <div className="container-fluid row custom-border mt-4 pb-4 custom-bg">
                <div className="col mt-3 contet-center text-center">
                    <button onClick={handleAddBook} className=" custom-button  fs-2 fw-light">+</button>
                    <h5 className="fs-3 fw-light text-center mb-3 mt-2 custom-text">Книги</h5>
                    {books.map((item) =>
                        <BookCard
                            editHandler={handleEdit}
                            id={item.id}
                            switchEditStatus={switchEditStatus}
                            key={item.id}
                            editStatus={item.editStatus}
                            title={item.title}
                            description={item.description}
                            numberOfChapters={item.numberOfChapters} />)}
                </div>
                <div className="col mt-3 contet-center text-center">
                    <button onClick={handleAddVideo} className=" custom-button  fs-2 fw-light">+</button>
                    <h5 className="fs-3 fw-light text-center mb-3 mt-2 custom-text">Видео</h5>
                    {videos.map((item) =>
                        <VideoCard
                            editHandler={handleEdit}
                            switchEditStatus={switchEditStatus}
                            editStatus={item.editStatus}
                            id={item.id}
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            duration={item.duration} />)}
                </div>
                <div className="col mt-3 contet-center text-center">
                    <button onClick={handleAddCourse} className="custom-button  fs-2 fw-light">+</button>
                    <h5 className="fs-3 fw-light text-center mb-3 mt-2 custom-text">Курсы</h5>
                    {courses.map((item) =>
                        <CourseCard
                            editHandler={handleEdit}
                            switchEditStatus={switchEditStatus}
                            editStatus={item.editStatus}
                            id={item.id}
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            numberOfLessons={item.numberOfLessons} />)}
                </div>
            </div>
        </div>
    );
}

export { MentalPlan };
