import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAddUserMutation, useGetUsersQuery, useRemoveUserMutation } from '../redux/RTK Query API/usersAPI';

function RegistrationPage() {
    const navigate = useNavigate();

    const [addUser, { error: addUserError, isLoading: isAddingUser }] = useAddUserMutation();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSingInUser = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Валидация
        if (!login || !password) {
            alert("Пожалуйста, заполните все поля!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }
        if (password.length < 8) {
            alert("Ваш пароль должен включать больше 8 символов!");
            return;
        }
        if (!emailRegex.test(login)) {
            alert("Ваша электроннная почта записана не корректно!");
            return;
        }
    
        try {
            // Выполняем добавление пользователя
            const response = await addUser({ login, password }).unwrap();
            if (response.access_token && response.token_type) {
                sessionStorage.setItem('access_token', response.access_token);
                sessionStorage.setItem('token_type', response.token_type);
                sessionStorage.setItem('user_id', response.user_id);
            }
            // Если успешный результат
            console.log("Пользователь добавлен:", response);
            alert("Регистрация успешна!");
    
            // Навигация на следующую страницу
            navigate('/initiation/physicalPlan');
        } catch (err) {
            // Если произошла ошибка
            if (err.data?.detail === "User with this login already exists") {
                alert("Пользователь с таким логином уже зарегистрирован");
            } else {
                alert("Произошла ошибка при регистрации. Попробуйте снова.");
            }
            console.error("Ошибка добавления пользователя:", err);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="container fs-4 custom-container mb-5 fw-light">
                <form>
                    <p className="text-center fs-4">Расскажите о себе !</p>
                        <div className="mb-3">
                            <label htmlFor="loginInput" className="form-label">
                                <i className="bi bi-person fs-4 custom-text"></i> Какая у вас электронная почта ?
                            </label>
                            <div className="input-group">
                                <input 
                                type="email"
                                className="form-control"
                                placeholder="Введите логин"
                                id="loginInput1" 
                                aria-describedby="Введите логин"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <i className="bi bi-key fs-4 custom-text"></i> Придумайте пароль
                            </label>
                            <div className="input-group">
                                <input type="password" 
                                className="form-control me-3" 
                                placeholder="Введите пароль" 
                                id="exampleInputPassword1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                                <span>
                                    <i className="bi bi-eye fs-4 custom-text"></i>
                                </span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword2" className="form-label">
                                <i className="bi bi-key fs-4 custom-text"></i> Повторите пароль
                            </label>
                            <div className="input-group">
                                <input 
                                type="password" 
                                className="form-control me-3" 
                                placeholder="Повторите пароль" 
                                id="exampleInputPassword2" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}/>
                                <span>
                                    <i className="bi bi-eye fs-4 custom-text"></i>
                                </span>
                            </div>
                        </div>
                        <div className="d-flex flex-row-reverse mt-4">
                            <button onClick={(e)=> handleSingInUser(e)} type="submit" className="custom-button custom-button--medium fw-light fs-5">Готово</button>
                        </div>
                </form>
            </div>
        </div>
    );

}
export { RegistrationPage };