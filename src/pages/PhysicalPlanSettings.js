import { useNavigate } from "react-router-dom";
import { useGetUsersPhysicalPlanQuery } from "../redux/RTK Query API/usersAPI";

function PhysicalPlanSettings() {
    const navigate = useNavigate()

    const token = sessionStorage.getItem('access_token');
    const token_type = sessionStorage.getItem('token_type');
    const user_id =  sessionStorage.getItem('user_id');
    const { data: physicalPlan, error, isLoading } = useGetUsersPhysicalPlanQuery({id: user_id, token: token});
    

    if (isLoading) {
        return <div>Загрузка...</div>;
    }
    if (error) {
        if (error.status === 403) {
            navigate("/initiation/signIn");
        } else if (error.status === 400) {
            navigate("/initiation/signIn");
        } else if(error.status === 401){
            navigate("/initiation/signIn");
        }
    }

    if (error) {
        return <div>Ошибка при загрузке физического плана: {error.message}</div>;
    }

    if (!physicalPlan || !physicalPlan.days) {
        return <div>Физический план не найден</div>;
    }

    return (
        <div>
            <div className="container fs-4 custom-container custom-container--physical-plane-settings mb-5 fw-light mt-5 text-center">
                <h4 className="fw-light fs-1 mt-3 mb-5">План тренировок на неделю</h4>
                {physicalPlan.days.map((day) => (
                    <div key={day.workout_id} className="mb-5">
                        <h3 className="fw-light fs-2 mt-3 mb-3 text-center">День {day.day_of_week}</h3>

                        {/* Заголовок таблицы */}
                        <div className="row mb-3 fw-light custom-border--bottom">
                            <div className="col-2 custom-text">Название</div>
                            <div className="col-2 custom-text">Повторения</div>
                            <div className="col-8 custom-text">Описание</div>
                        </div>

                        {/* Упражнения */}
                        {day.exercises.map((exercise) => (
                            <div key={exercise.id} className="row align-items-center mb-2 custom-border--bottom">
                                <div className="col-2 text-start">{exercise.name}</div>
                                <div className="col-2">{exercise.start_reps + (day.day_of_week + + physicalPlan.data.progress) * exercise.step}</div>
                                <div className="col-8 text-start">{exercise.description}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export { PhysicalPlanSettings };
