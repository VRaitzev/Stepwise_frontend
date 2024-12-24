import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetUsersPhysicalPlanQuery, useGetUsersMentalPlanQuery, useGetUsersOutherTasksQuery } from "../redux/RTK Query API/usersAPI";
import { useUpdatePhysicalPlanMutation } from "../redux/RTK Query API/physicalPlansAPI";
import { useAddResourceMutation, useUpdateResourceMutation } from '../redux/RTK Query API/ResourceAPI'
import { useUpdateMentalPlanMutation } from '../redux/RTK Query API/mentalPlanAPI'
import { useCreateOuterTaskMutation, useDeleteTaskByIdMutation } from '../redux/RTK Query API/outherTasksAPI'

function InterationWindow() {
    const navigate = useNavigate();

    const token = sessionStorage.getItem('access_token');
    const token_type = sessionStorage.getItem('token_type');
    const user_id = sessionStorage.getItem('user_id');
    const { data: physicalPlan, PhysicalPlanError, isLoadingPhysicalPlan } = useGetUsersPhysicalPlanQuery({ id: user_id, token: token });
    const { data: mentalPlan, MentalPlanError, isLoadingMentalPlan } = useGetUsersMentalPlanQuery({ id: user_id, token: token });
    const { data: OutherTasks, OutherTasksError, isLoadingOutherTasks, refetch } = useGetUsersOutherTasksQuery({ id: user_id, token: token });
    const [createOuterTask, { error: createOuterTaskError, isLoading: isCreateOuterTask }] = useCreateOuterTaskMutation();
    const [deleteOuterTask, { error: deleteOuterTaskError, isLoading: isDeleteOuterTask }] = useDeleteTaskByIdMutation();
    if (PhysicalPlanError || MentalPlanError) {
        let errorMessage = '';

        if (PhysicalPlanError) {
            if (PhysicalPlanError.status === 403) {
                navigate("/initiation/signIn");
            } else if (PhysicalPlanError.status === 400) {
                navigate("/initiation/signIn");
            } else if (PhysicalPlanError.status === 401) {
                navigate("/initiation/signIn");
            }
            else {
                errorMessage = `Unexpected error with Physical Plan: ${PhysicalPlanError.data?.detail || PhysicalPlanError.error}`;
            }
        }
        if (MentalPlanError) {
            if (MentalPlanError.status === 403) {
                navigate("/initiation/signIn");
            } else if (MentalPlanError.status === 400) {
                navigate("/initiation/signIn");
            } else if (MentalPlanError.status === 401) {
                navigate("/initiation/signIn");
            }
            else {
                errorMessage = `Unexpected error with Physical Plan: ${PhysicalPlanError.data?.detail || PhysicalPlanError.error}`;
            }
        }
    }
    const [updatePhysicalPlan, { error: updatePhysicalPlanError, isLoading: isUpdatingPhysicalPlan }] = useUpdatePhysicalPlanMutation();
    const [updateMentalPlan, { error: updateMentalPlanError, isLoading: isUpdatingMentalPlan }] = useUpdateMentalPlanMutation();
    const [updateResource, { error: updateResourceError, isLoading: isUpdatingResource }] = useUpdateResourceMutation();
    const [current_workout, set_current_workout] = useState()
    const [current_weight, set_current_weight] = useState()
    const [current_height, set_current_height] = useState()
    const [taskEditStatus, setTaskEditStatus] = useState(false)
    const [list_exercises, set_list_exercises] = useState([])
    const [list_mental_task, set_list_mental_task] = useState([])
    const [taskText, setTaskText] = useState()
    const [reloadStatus, setReloadStatus] = useState(2)



    const [allProgress, setAllProgress] = useState(0);
    const [mentalProgress, setMentalProgress] = useState(0);
    const [physicalProgress, setPhysicalProgress] = useState(0);

    // Функция для вычисления прогресса
    const calculateProgress = () => {
        const totalMentalProgress = list_mental_task.reduce((total, task) => total + (Number(task.progress) || 0), 0);
        const totalPhysicalProgress = list_exercises.reduce((total, exercise) => total + (exercise.status ? 1 : 0), 0);

        // Вычисление среднего прогресса для ментальных и физических задач
        const mentalProgressPercentage = list_mental_task.length > 0 ? (totalMentalProgress / (list_mental_task.length * 100)) * 100 : 0;
        const physicalProgressPercentage = list_exercises.length > 0 ? (totalPhysicalProgress / list_exercises.length) * 100 : 0;

        const allProgress = (mentalProgressPercentage + physicalProgressPercentage) / 2; // Средний прогресс
        setMentalProgress(Math.round(mentalProgressPercentage));
        setPhysicalProgress(physicalProgressPercentage);
        setAllProgress(allProgress); // Общий прогресс
    };


    const [current_nutrition_rec, set_current_nutrition_rec] = useState({})
    useEffect(() => {
        if (physicalPlan && mentalPlan) {
            const sortedWorkouts = physicalPlan.days.toSorted((a, b) => a.day_of_week - b.day_of_week);
            set_current_workout(sortedWorkouts[physicalPlan.data.day - 1]);
            set_current_weight(physicalPlan.data.weight)
            set_current_height(physicalPlan.data.height)

            const books = mentalPlan.resources.filter((item) => item.resource.type === "book").toSorted((a, b) => a.resource.id - b.resource.id)
            const videos = mentalPlan.resources.filter((item) => item.resource.type === "video").toSorted((a, b) => a.resource.id - b.resource.id)
            const courses = mentalPlan.resources.filter((item) => item.resource.type === "course").toSorted((a, b) => a.resource.id - b.resource.id)
            if (!Array.isArray(books)) {
                alert("Ошибка: books не массив", books);
                return;
            }
            
            let task1 = (books.reduce((total, resource) => total + resource.resource.volume - resource.progress, 0) / mentalPlan.data.progress)
            let task2 = (videos.reduce((total, resource) => total + resource.resource.volume - resource.progress, 0) / mentalPlan.data.progress)
            let task3 = (courses.reduce((total, resource) => total + resource.resource.volume - resource.progress, 0) / mentalPlan.data.progress)
            let current_book = books.find((item) => item.resource.volume > item.progress);
            let current_video = videos.find((item) => item.resource.volume > item.progress);
            let current_course = courses.find((item) => item.resource.volume > item.progress);

            if ((current_book.volume - current_book.progress) < task1) {
                task1 = { id: 1, message: `Прочитать книгу ${current_book.resource.name}`, resource: current_book, task: current_book.volume - current_book.resource }
            }
            else {
                task1 = { progress: 0, id: 1, message: `Прочитать ${task1} глав книги ${current_book.resource.name}`, resource: current_book, task: task1 }
            }
            if ((current_video.volume - current_video.progress) < task2) {
                task2 = { progress: 0, id: 2, message: `Посмотреть видео ${current_video.resource.name}`, resource: current_video, task: current_book.volume - current_book.resource }
            }
            else {
                task2 = { progress: 0, id: 2, message: `Посмотреть ${task2} минут видео ${current_video.resource.name}`, resource: current_video, task: task2 }
            }
            if ((current_course.volume - current_course.progress) < task3) {
                task3 = { progress: 0, id: 3, message: `Пройти курс ${current_course.resource.name}`, resource: current_course, task: current_book.volume - current_book.resource }
            }
            else {
                task3 = { progress: 0, id: 3, message: `Пройти ${task3} уроков курса ${current_course.resource.name}`, resource: current_course, task: task3 }
            }
            set_list_mental_task([task1, task2, task3])

            if (current_workout) {
                const exercise_list = current_workout.exercises.map(
                    (exercise) => {
                        return {
                            status: false,
                            exercise
                        }
                    })
                set_list_exercises(exercise_list)
            }
        }
    }, [physicalPlan, mentalPlan, current_workout, reloadStatus])

    useEffect(() => {
        if (list_exercises.length > 0) {
            calculateNutritionRec(); // вызываем функцию только после того, как стейт обновился
        }
    }, [list_exercises]); // следим за изменениями list_exercises

    const update = async () => {
        try {
            let day = physicalPlan.data.day + 1;
            if (day <= 7) {
                await updatePhysicalPlan({ data: { day }, id: physicalPlan.data.id }).unwrap();
            } else {
                day = 1;
                await updatePhysicalPlan({ data: { day, progress: physicalPlan.data.progress + 7 }, id: physicalPlan.data.id }).unwrap();
            }
        } catch (error) {
            alert(`Ошибка обновления ментального плана: ${error.message || error}`);
        }
        try {
            let book_progress = list_mental_task[0].resource.progress + list_mental_task[0].task / 100 * list_mental_task[0].progress;
            let video_progress = list_mental_task[1].resource.progress + list_mental_task[1].task / 100 * list_mental_task[1].progress;
            let course_progress = list_mental_task[2].resource.progress + list_mental_task[2].task / 100 * list_mental_task[2].progress;
            if (book_progress > list_mental_task[0].resource.resource.volume) { book_progress = list_mental_task[0].resource.resource.volume };
            if (video_progress > list_mental_task[1].resource.resource.volume) { video_progress = list_mental_task[1].resource.resource.volume };
            if (course_progress > list_mental_task[2].resource.resource.volume) { course_progress = list_mental_task[2].resource.resource.volume };
            let res = await updateResource({ token: token, id: list_mental_task[0].resource.resource.id, data: { ...list_mental_task[0].resource.resource, progress: book_progress } });
            res = await updateResource({ token: token, id: list_mental_task[1].resource.resource.id, data: { ...list_mental_task[1].resource.resource, progress: video_progress } });
            res = await updateResource({ token: token, id: list_mental_task[2].resource.resource.id, data: { ...list_mental_task[2].resource.resource, progress: course_progress } });
            let progress = mentalPlan.data.progress
            if (progress) {
                progress = progress - 1
                updateMentalPlan({ id: mentalPlan.data.id, data: { progress } })
            }

        } catch (error) {
            alert(`Ошибка обновления физического плана: ${error.message || error}`);
        }

        navigate(0)
    };

    const calculateNutritionRec = () => {
        let calories = 0;

        // Расчёт сжигаемых калорий
        const burned_calories = list_exercises.reduce((total, item) => {
            return total + (item.exercise.start_reps + (current_workout.day_of_week + physicalPlan.data.progress) * item.exercise.step) * item.exercise.calories_burned;
        }, 0);

        // Базовая формула расчёта калорий в зависимости от пола
        if (physicalPlan.data.gender === 'male') {
            calories = (88.36 + (13.4 * current_weight) + (4.8 * current_height) - (5.7 * physicalPlan.data.age)) * 1.2;
        } else {
            calories = (447.6 + (9.2 * current_weight) + (3.1 * current_height) - (4.3 * physicalPlan.data.age)) * 1.2;
        }

        // Учёт цели пользователя
        const goal = physicalPlan.data.goal;
        if (goal === "Похудеть") {
            calories -= 500; // Дефицит 500 калорий
        } else if (goal === "Набирать массу") {
            calories += 500; // Профицит 500 калорий
        }
        // Если цель - "Поддерживать вес", оставляем расчёт без изменений

        // Учитываем калории, сожжённые во время тренировок
        calories = Math.round(burned_calories + calories);

        // Расчёт макронутриентов
        const proteins = Math.round(current_weight * 1.8);
        const fats = Math.round(current_weight * 1);
        const carbohydrates = Math.round((calories - (proteins * 4 + fats * 9)) / 4);

        // Установка рекомендаций
        set_current_nutrition_rec({ calories, proteins, carbohydrates, fats });

    };


    const handleSwitchStatus = (e, id) => {
        const isChecked = e.target.checked;

        set_list_exercises(prevList =>
            prevList.map(item =>
                item.exercise.id === id
                    ? { ...item, status: isChecked }
                    : item
            )
            
        );
        calculateProgress()
        alert(physicalProgress)
    };


    const handleChangeMentalTaskProgress = (e, id) => {
        const value = e.target.value;
        set_list_mental_task(prevList =>
            prevList.map(item =>
                item.resource.resource.id === id
                    ? { ...item, progress: value }
                    : item
            )
        );
        calculateProgress()
    };
    const handleAddTask = async () => {
        try {
            const res = await createOuterTask({ user_id: user_id, title: taskText, status: false }).unwrap();
            refetch()
        }
        catch (error) {
            console.log("Произашла ошибка при добовлении задачи")
            alert("Произашла ошибка при добовлении задачи")

        }
    }

    const handleRemoveTask = async (id) => {
        try {
            const res = await deleteOuterTask(id).unwrap();
            setReloadStatus((prevStatus) => prevStatus + 1); 
            refetch();
        }
        catch (error) {
            console.log("Произашла ошибка при удалении задачи")
            alert("Произашла ошибка при удалении задачи")

        }
    }




    if (isLoadingPhysicalPlan) {
        return <div>Загрузка...</div>;
    }

    if (PhysicalPlanError || MentalPlanError) {
        return <div>Ошибка загрузки данных: {PhysicalPlanError.message}</div>;
    }

    if (!physicalPlan || !physicalPlan.days || !mentalPlan) {
        return <div>Нет данных для отображения.</div>;
    }
    return (
        <div>
            <div className="container fs-4 custom-container custom-container--main-page mb-5 fw-light mt-5 text-center">
                {/* <h4 className="fw-light fs-1 mt-3 mb-5">Рейтинг эффективности</h4>
                <div className="ring-progress-bar d-flex justify-content-center align-items-center mb-2  mx-auto">
                    <p className="fw-light fs-1 custom-text">75%</p>
                </div>
                <h5 className="fw-light fs-2 mb-1">Общий</h5>
                <div className="progress-container mt-4">
                    <h5 className="fw-light fs-2 mb-2">Ментальные задачи</h5>
                    <div className="progress mb-3" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                        <div style={{width: `${mentalProgress===99 ? 100: mentalProgress}%`}} className="progress-bar custom-progressbar"></div>
                    </div>
                </div>
                <div className="progress-container">
                    <h5 className="fw-light fs-2 mb-2">Физические задачи</h5>
                    <div className="progress mb-3" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                        <div style={{width: `${physicalProgress===99 ? 100: mentalProgress}%`}} className="progress-bar custom-progressbar"></div>
                    </div>
                </div> */}
                <div className='d-flex justify-content-center'>
                    <button onClick={update} className="custom-button custom-button--medium content-center fs-4 fw-light">Отправить!</button>
                </div>
            </div>

            <div className="container fs-4 custom-container custom-container--main-page mb-5 fw-light mt-5">
                <h4 className="fw-light fs-1 mt-3 mb-4  text-center">Твой фитнес-план на сегодня</h4>
                <h3 className="fw-light fs-2 mt-3 mb-3  text-center">Рекомендации по питанию</h3>
                <div className='fw-light fs-3 row text-center py-2'>
                    <div className="col">
                        <div className='custom-text'>Калории</div>
                        <div>{current_nutrition_rec.calories} ккал</div>
                    </div>
                    <div className="col">
                        <div className='custom-text'>Белки</div>
                        <div>{current_nutrition_rec.proteins} г</div>
                    </div>
                    <div className="col">
                        <div className='custom-text'>Жиры</div>
                        <div>{current_nutrition_rec.fats} г</div>
                    </div>
                    <div className="col">
                        <div className='custom-text'>Углеводы</div>
                        <div>{current_nutrition_rec.carbohydrates} г</div>
                    </div>
                </div>
                <h3 className="fw-light fs-2 mt-3 mb-3 text-center">План тренировок</h3>
                <div className='fw-light fs-3 row text-center custom-text py-2'>
                    <div className="col-3">
                        Статус
                    </div>
                    <div className="col-6">
                        Упражнение
                    </div>
                    <div className="col-3">
                        Повторения
                    </div>
                </div>
                {list_exercises.map((item) =>
                    <div key={item.exercise.id} className='fw-light fs-3 row py-2'>
                        <div onChange={(e) => handleSwitchStatus(e, item.exercise.id)} className="col-3 d-flex justify-content-center align-items-center">
                            <input type='checkbox' className='custom-checkbox'></input>
                        </div>
                        <div className="col-6">
                            {item.exercise.name}
                        </div>
                        <div className="col-3 text-center">
                            {item.exercise.start_reps + (current_workout.day_of_week + physicalPlan.data.progress) * item.exercise.step}
                        </div>
                    </div>
                )}
            </div>

            <div className="container fs-4 custom-container custom-container--main-page mb-5 fw-light mt-5">
                <h4 className="fw-light fs-1 mt-3 mb-4  text-center">Ментальные задачи</h4>
                <div className='fw-light fs-3 row text-center custom-text py-2'>
                    <div className="col-9">
                        Задача
                    </div>
                    <div className="col-3">
                        Прогресс
                    </div>
                </div>
                {list_mental_task.map((item) =>
                    <div className='fw-light fs-4 row text-center py-3' key={item.id}>
                        <div className="col-9 text-start">
                            {item.message}
                        </div>
                        <div className="col-3">
                            {/* Проверяем, определен ли resource и progress */}
                            {item.progress || 0}%
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className='custom-range--main-page'>
                                <input
                                    type="range"
                                    className="form-range mb-3 mt-4"
                                    id="weightRange"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={item.progress || 0}
                                    onChange={(e) => { handleChangeMentalTaskProgress(e, item.resource.resource?.id) }}
                                    disabled={!item.resource} // Если resource не определен, отключаем слайдер
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="container fs-4 custom-container custom-container--main-page mb-5 fw-light mt-5">
                <h4 className="fw-light fs-1 mt-3 mb-4 text-center">Разные задачи</h4>
                <div className="fw-light fs-3 row text-center custom-text py-3">
                    <div className="col-1">
                        <span className="d-flex justify-content-center">Статус</span>
                    </div>
                    <div className="col-9">
                        <span className="d-flex justify-content-center">Задачи</span>
                    </div>
                    <div className="col-1">
                        <span onClick={() => setTaskEditStatus(true)}  className="d-flex justify-content-center">+</span>
                    </div>
                    <div className="col-1">
                        <span className="d-flex justify-content-center">-</span>
                    </div>
                </div>
                {OutherTasks? OutherTasks.map((item) => (
                    <div key={item.id} className="fw-light fs-3 row py-2">
                        <div className="col-1 d-flex justify-content-center align-items-center fw-light  fs-4">
                            <input type="checkbox" className="custom-checkbox" />
                        </div>
                        <div className="col-9 d-flex align-items-center">
                            {item.title}
                        </div>
                        <div className="col-1 d-flex justify-content-center align-items-center">
                            <button onClick={() => setTaskEditStatus(true)} className="custom-button custom-button--circle fs-4 fw-light">+</button>
                        </div>
                        <div className="col-1 d-flex justify-content-center align-items-center">
                            <button onClick={() => {
                                const id = item.id;
                                handleRemoveTask(id);
                            }} className="custom-button custom-button--circle fs-4 fw-light">-</button>
                        </div>
                    </div>
                )): null}
                {taskEditStatus ?
                    <div className="fw-light fs-3 row py-2 fw-light  fs-4">
                        <div className="col-1 d-flex justify-content-center align-items-center">
                            <input type="checkbox" className="custom-checkbox" />
                        </div>
                        <div className="col-9 d-flex align-items-center">
                            <input
                                onChange={(e) => setTaskText(e.target.value)}
                                value={taskText}
                                type="text"
                                className="custom-edit-text custom-border custom-placeholder"
                                style={{
                                    width: "120%",
                                    borderRadius: "1%", 
                                  }}
                                placeholder="Введите текст задачи"
                                id="loginInput1"
                                aria-describedby="Введите текст задачи"
                            />
                        </div>
                        <div className="col-2 d-flex justify-content-center align-items-center">
                            <button onClick={() => {
                                handleAddTask();
                                setTaskEditStatus(false)
                            }} className="custom-button custom-button--medium fs-4 fw-light">Создать</button>
                        </div>
                    </div> : null
                }
            </div>
        </div>
    );
}

export { InterationWindow };
