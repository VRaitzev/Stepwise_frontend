import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewBookCard, NewVideoCard, NewCourseCard } from '../components/MentalResourseCard';
import { useGetUsersMentalPlanQuery } from '../redux/RTK Query API/usersAPI';
import { useAddResourceMutation, useUpdateResourceMutation, useRemoveResourceMutation } from '../redux/RTK Query API/ResourceAPI'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCredentials } from '../redux/RTK Query API/authSlice';

function MentalPlanSettings() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('access_token');
    const token_type = sessionStorage.getItem('token_type');
    const user_id = sessionStorage.getItem('user_id');

    const { data: mentalPlan, error, isLoading, refetch } = useGetUsersMentalPlanQuery({ id: user_id, token: token });
    const [addResource, { error: addResourceError, isLoading: isAddingResource }] = useAddResourceMutation();
    const [updateResource, { error: updateResourceError, isLoading: isUpdatingResource }] = useUpdateResourceMutation();
    const [deleteResource, { error: deleteResourceError, isLoading: isDeleteResource }] = useRemoveResourceMutation();

    if (error) {
        if (error.status === 403) {
            navigate("/initiation/signIn");
        } else if (error.status === 400) {
            navigate("/initiation/signIn");
        } else if (error.status === 401) {
            navigate("/initiation/signIn");
        }
    }

    const [books, setBooks] = useState([]);
    const [videos, setVideos] = useState([]);
    const [courses, setCourses] = useState([]);
    const [sortedResources, setSortedResources] = useState([]);
    const [reloadStatus, setReloadStatus] = useState(false)

    const validateResources = (resources) => {
        return resources.every(resource =>
            resource.name && resource.description && resource.volume
        );
    };

    const switchEditStatus = (id, type) => {
        if (type === 'book') {
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === id ? { ...book, editStatus: !book.editStatus } : book
                )
            );
        } else if (type === 'video') {
            setVideos((prevVideos) =>
                prevVideos.map((video) =>
                    video.id === id ? { ...video, editStatus: !video.editStatus } : video
                )
            );
        } else if (type === 'course') {
            setCourses((prevCourses) =>
                prevCourses.map((course) =>
                    course.id === id ? { ...course, editStatus: !course.editStatus } : course
                )
            );
        }
    };

    const handleAddBook = async () => {
        const res = await addResource({
            user_id: user_id,
            type: "book",
            name: "temp",
            description: "temp",
            volume: 1,
        });
        setBooks((prevBooks) => [
            ...prevBooks,
            {
                id: res.data.data,  // Создаем уникальный id на основе длины массива
                title: "",
                description: "",
                numberOfChapters: 0,
                editStatus: true
            }
        ]);
    }


    const handleAddVideo = async () => {
        const res = await addResource({
            user_id: user_id,
            type: "video",
            name: "temp",
            description: "temp",
            volume: 1,
        });
        setVideos((prevVideos) => [
            ...prevVideos,
            {
                id: res.data.data,  // Генерация уникального id для видео
                title: "",
                description: "",
                duration: 0,  // Продолжительность видео по умолчанию
                editStatus: true
            }
        ]);
    };

    const handleAddCourse = async () => {
        const res = await addResource({
            user_id: user_id,
            type: "course",
            name: "temp",
            description: "temp",
            volume: 1,
        });
        setCourses((prevCourses) => [
            ...prevCourses,
            {
                id: res.data.data,  // Генерация уникального id для курса
                title: "Заполните название!",
                description: "",
                numberOfLessons: 0,  // Количество уроков по умолчанию
                editStatus: true
            }
        ]);
    };

    const handleRemoveResource = async (id, type) => {
        try {
            if (type === 'book') {
                if ((books.length === 1)) {
                    alert("В ментальном плане должна быть хотя бы одна книга!");
                    return;
                }
            }
            if (type === 'video') {
                if ((type = 'video' && videos.length === 1)) {
                    alert("В ментальном плане должна быть хотя бы одно видео!");
                    return;
                }
            }
            if (type === 'course') {
                if ((type = 'course' && courses.length === 1)) {
                    alert("В ментальном плане должна быть хотя бы один курс!");
                    return;
                }
            }
            const res = await deleteResource({ token: token, id: id }).unwrap();
            setReloadStatus((prevStatus) => !prevStatus);
        }
        catch (error) {
            console.log("Ошибка при удалении ресурса!")
            alert("Ошибка при удалении ресурса!")
        }
    }

    const handleEdit = async (id, type, newParams) => {
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
            const res = await updateResource({ token: token, id, data: newParams });
            resources[index] = { ...resources[index], ...newParams };
            setReloadStatus((prevStatus) => !prevStatus);

        } else {
            console.error('Resource not found');
        }
    };


    // Обновление ресурсов при загрузке mentalPlan
    useEffect(() => {
        refetch()
        if (mentalPlan?.resources) {
            const bookList = [];
            const videoList = [];
            const courseList = [];

            const sorted = (mentalPlan.resources.toSorted((a, b) => a.resource.id - b.resource.id))

            sorted.forEach((item) => {
                const resource = item.resource;
                if (resource.type === 'book') {
                    bookList.push({
                        id: resource.id,
                        editStatus: false,
                        title: resource.name,
                        description: resource.description,
                        numberOfChapters: resource.volume,
                        progress: item.progress,
                    });
                } else if (resource.type === 'video') {
                    videoList.push({
                        id: resource.id,
                        editStatus: false,
                        title: resource.name,
                        description: resource.description,
                        duration: resource.volume,
                        progress: item.progress,
                    });
                } else if (resource.type === 'course') {
                    courseList.push({
                        id: resource.id,
                        editStatus: false,
                        title: resource.name,
                        description: resource.description,
                        numberOfLessons: resource.volume,
                        progress: item.progress,
                    });
                }
            },);

            setBooks(bookList);
            setVideos(videoList);
            setCourses(courseList);
        }
    }, [mentalPlan, reloadStatus]);

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error.message}</div>;

    return (
        <div>
            <div className="container-fluid mt-5 fs-4 fw-light custom-border custom-bg">
                <h5 className="fs-3 text-center mt-4">
                    Добро пожаловать на страницу вашего ментального развития!
                </h5>
                <p className="mt-1 text-center">
                    Эта страница создана, чтобы помочь вам контролировать свой образовательный путь. 📚
                    Добавляйте интересные книги, полезные курсы и вдохновляющие видео. Хотите изменить описание
                    или удалить что-то старое? Это тоже можно сделать здесь. А еще вы сможете видеть, как
                    продвигаетесь к своим целям, и вдохновляться собственными результатами!
                </p>
                <div className="mt-1 text-center">
                <div className='mb-3'>Цель: {mentalPlan.data.goal}</div>
                    
                </div>
            </div>

            <div className="container-fluid row custom-border mt-4 pb-4 custom-bg mb-4">
                <div className="col mt-3 text-center">
                    <button onClick={handleAddBook} className="custom-button fs-2 fw-light">+</button>
                    <h5 className="fs-3 fw-light text-center mb-3 mt-2 custom-text">Книги</h5>
                    {books.map((item) => (
                        <NewBookCard
                            editHandler={handleEdit}
                            id={item.id}
                            switchEditStatus={(id) => switchEditStatus(id, 'book')}
                            key={item.id}
                            editStatus={item.editStatus}
                            title={item.title}
                            description={item.description}
                            numberOfChapters={item.numberOfChapters}
                            progress={item.progress / item.numberOfChapters * 100}
                            deleteResourceHandler={handleRemoveResource}
                            addRes={handleAddBook}
                        />
                    ))}
                </div>
                <div className="col mt-3 text-center">
                    <button onClick={handleAddVideo} className="custom-button fs-2 fw-light">+</button>
                    <h5 className="fs-3 fw-light text-center mb-3 mt-2 custom-text">Видео</h5>
                    {videos.map((item) => (
                        <NewVideoCard
                            editHandler={handleEdit}
                            id={item.id}
                            switchEditStatus={(id) => switchEditStatus(id, 'video')}
                            key={item.id}
                            editStatus={item.editStatus}
                            title={item.title}
                            description={item.description}
                            duration={item.duration}
                            progress={item.progress / item.duration * 100}
                            deleteResourceHandler={handleRemoveResource}
                            addRes={handleAddVideo}
                        />
                    ))}
                </div>
                <div className="col mt-3 text-center">
                    <button onClick={handleAddCourse} className="custom-button fs-2 fw-light">+</button>
                    <h5 className="fs-3 fw-light text-center mb-3 mt-2 custom-text">Курсы</h5>
                    {courses.map((item) => (
                        <NewCourseCard
                            editHandler={handleEdit}
                            id={item.id}
                            switchEditStatus={(id) => switchEditStatus(id, 'course')}
                            key={item.id}
                            editStatus={item.editStatus}
                            title={item.title}
                            description={item.description}
                            numberOfLessons={item.numberOfLessons}
                            progress={item.progress / item.numberOfLessons * 100}
                            deleteResourceHandler={handleRemoveResource}
                            addRes={handleAddCourse}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export { MentalPlanSettings };
