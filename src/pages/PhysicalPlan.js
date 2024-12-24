import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAddPhysicalPlanMutation } from '../redux/RTK Query API/physicalPlansAPI';
function PhysicalPlan() {
    const navigate = useNavigate();
    const [addPhysicalPlan, { error: addPhysicalPlanError, isLoading: isAddingPhysicalPlan }] = useAddPhysicalPlanMutation();

    const [infoWindowStatus, setinfoWindowStatus] = useState(false);
    const [age, setAge] = useState(18);
    const [height, setHeight] = useState(140);
    const [gender, setGender] = useState("male");
    const [weight, setWeight] = useState(40);
    const [physicalIndicators, setPhysicalIndicators] = useState({
        bmi: 20.41,
        condition: "Норма",
        normalWeight: { min: 36.3, max: 48.8 },
        goal: "Поддерживать вес"
    });
    const user_id =  sessionStorage.getItem('user_id');

    const handleAddPhysicalPlan = async (e) => {
        e.preventDefault();
        const newPhysicalPlan = {
            user_id: user_id,
            age,
            height,
            gender,
            weight,
            bmi: physicalIndicators.bmi,
            goal: physicalIndicators.goal
        }
        try {
            // Выполняем добавление пользователя
            const response = await addPhysicalPlan(newPhysicalPlan).unwrap();

            console.log("Физический план создан:", response);
            alert("Создание физического плана прошло успешно!");

            navigate('/initiation/mentalPlan');
        } catch (err) {
            console.error("Ошибка при создании физического плана:", err);
        }
    }
    const calculatePhysicalIndicators = () => {
        const bmi = weight / (height / 100) ** 2;

        setPhysicalIndicators({
            bmi: bmi.toFixed(2),
            bfi: bmi.toFixed(2),
            condition: getCondition(bmi),
            normalWeight: getNormalWeight(bmi),
            goal: getGoal(bmi)
        });
    };

    const getCondition = (bmi) => {
        if (bmi < 18) return "Недостаток жира (нужно набрать массу)";
        if (bmi >= 18 && bmi <= 25) return "Норма";
        return "Избыточный жир (нужно похудеть)";
    };

    const getNormalWeight = (bmi) => {
        const minWeight = 18.5 * (height / 100) ** 2;
        const maxWeight = 24.9 * (height / 100) ** 2;
        return { min: minWeight.toFixed(1), max: maxWeight.toFixed(1) };
    };

    const getGoal = (bmi) => {
        if (bmi < 18) return "Набирать массу";
        if (bmi >= 18 && bmi <= 25) return "Поддерживать вес";
        return "Похудеть";
    };

    return (
        <div className="vh-100 d-flex justify-content-around">
            <div className="container fs-4 custom-container custom-container-physical mt-5 fw-light">
                <p className="text-center fs-4">Расскажите о себе что бы мы подобрали для вас идеальный план!</p>
                <form>
                    <div className="row">
                        <div className="col form-check ms-5">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="male"
                                value="male" // Используем строки для гендера
                                checked={gender === "male"}
                                onChange={(e) => setGender(e.target.value)} // Только обновляем состояние
                            />
                            <label className="form-check-label" for="male">
                                <i className="bi bi-gender-male fs-4 custom-text"></i> Мужской
                            </label>
                        </div>
                        <div className="col form-check ms-5">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="female"
                                value="female"
                                checked={gender === "female"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label" for="female">
                                <i className="bi bi-gender-female fs-4 custom-text"></i> Женский
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="weightRange" class="form-label">
                            <i className="bi bi-2-circle fs-4 custom-text"></i> Сколько вы весите ?</label>
                        <input
                            type="range"
                            class="form-range"
                            id="weightRange"
                            min="40"
                            max="150"
                            step="1"
                            onChange={(e) => {
                                setWeight(e.target.value);
                                calculatePhysicalIndicators();
                            }}
                            value={weight} />
                        <p class=" text-center">Ваш вес: <span id="weightValue">{weight}</span> кг</p>
                    </div>
                    <div className="mb-3">
                        <label for="weightRange" class="form-label">
                            <i className="bi bi-3-circle fs-4 custom-text"></i> Какого вы роста ?</label>
                        <input
                            type="range"
                            class="form-range"
                            id="weightRange"
                            min="140"
                            max="210"
                            step="1"
                            onChange={(e) => {
                                setHeight(e.target.value);
                                calculatePhysicalIndicators();
                            }}
                            value={height} />
                        <p class=" text-center">Ваш рост: <span id="weightValue">{height}</span> см</p>
                    </div>
                    <div className="mb-3">
                        <label for="weightRange" class="form-label">
                            <i className="bi bi-4-circle fs-4 custom-text"></i> Сколько вам лет ?</label>
                        <input
                            type="range"
                            class="form-range"
                            id="weightRange"
                            min="18"
                            max="100"
                            step="1"
                            onChange={(e) => {
                                setAge(e.target.value);
                                calculatePhysicalIndicators();
                            }}
                            value={age} />
                        <p class=" text-center">Ваш возраст: <span id="weightValue">{age}</span> лет</p>
                    </div>
                    <div className="d-flex flex-row-reverse mt-4">
                        <button onClick={() => setinfoWindowStatus(true)} type="button" className="custom-button custom-button--medium fw-light fs-5">Готово</button>
                    </div>
                </form>
            </div>

            <div className={`container fs-4 custom-container custom-container-physical mt-5 fw-light ms-5 ${infoWindowStatus ? 'fade-in-visible' : 'fade-in'}`}>
                <p className="fs-4 text-center">Анализ завершён. Теперь мы можем рассказать вам о вашем физическом состоянии!</p>
                <form>
                    <div className="mt-4">
                        <label for="weightRange" class="form-label">
                            <i className="bi bi-1-circle fs-4 custom-text"></i> Ваш ИМТ (индекс массы тела): {physicalIndicators.bmi}</label>
                    </div>
                    <div className="mt-4">
                        <label for="weightRange" class="form-label">
                            <i className="bi bi-2-circle fs-4 custom-text"></i> Ваше состояние: {physicalIndicators.condition}</label>
                    </div>
                    <div className="mt-4">
                        <label for="weightRange" class="form-label">
                            <i className="bi bi-3-circle fs-4 custom-text"></i>  Ваш оптимальный вес: {`${physicalIndicators.normalWeight.min} – ${physicalIndicators.normalWeight.max}`}</label>
                    </div>
                    <div className="mt-4">
                        <label for="weightRange" class="form-label">
                            <i className="bi bi-4-circle fs-4 custom-text"></i> Рекомендованная цель: {physicalIndicators.goal}</label>
                    </div>
                    <p className="fs-4 mt-4"> Эти показатели помогут вам лучше понять себя и сформулировать план действий. Мы уже подготовили индивидуальные рекомендации, чтобы вы достигли своих целей быстро и эффективно. Давайте начинать вместе!</p>
                    <div className="d-flex flex-row-reverse mt-4">
                        <button onClick={(e) => handleAddPhysicalPlan(e)} type="submit" className="custom-button custom-button--medium fw-light fs-5">Готово</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { PhysicalPlan };