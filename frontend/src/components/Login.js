import { useEffect, useState } from 'react';
import '../index.css';

const Login = ({onLogin, setLoggedForm}) => {
  const cleanUserData = {
    password: '',
    email: '',
  };

  useEffect(() => {
    setLoggedForm(true);
  }, []);

  const [userData, setUserData] = useState(cleanUserData);

  const handleChange = e => {
    const {name, value} = e.target;
    setUserData(old => ({
      ...old,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {password, email} = userData;
    if(!email || !password) return;
    onLogin(password, email)
      .catch(err => {
        console.log(err);
        setUserData(old => ({
          ...old,
          message: 'Что-то пошло не так!',
      }));
    })
  }

  return (
    <form className="form form_for_register" onSubmit={handleSubmit}>
      <p className="form__title">Вход</p>
      <input
        className="form__input form__input_for_register"
        required
        id="email"
        placeholder="Email"
        name="email"
        type="email"
        value={userData.email}
        onChange={handleChange}
      />
      <input
        className="form__input form__input_for_register"
        required
        id="password"
        placeholder="Пароль"
        name="password"
        type="password"
        value={userData.password}
        onChange={handleChange}
      />
      <button className="form__btn-save form__btn-save_for_register" type="submit" onSubmit={handleSubmit}>
        Войти
      </button>
    </form>
  );
}

export default Login;