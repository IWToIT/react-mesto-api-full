import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Register = ({ onRegister, setLoggedForm }) => {
  const [userData, setUserData] = useState({
    password: '',
    email: '',
  });

  useEffect(() => {
    setLoggedForm(false)
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData((old) => ({
      ...old,
      [name]: value,
    }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    const { password, email } = userData;

    onRegister(password, email).catch((err) => {
      console.log(err);

      setUserData((old) => ({
        ...old,
        message: 'Что-то пошло не так!',
      }));
    });
  }

  return (
    <form className="form form_for_register" onSubmit={handleSubmit}>
      <p className="form__title">Регистрация</p>
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
        Зарегистрироваться
      </button>
      <p className="form__sign-in">
        Уже зарегистрированы?&nbsp;
        <Link className="form__login-link" to="/signin">
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;