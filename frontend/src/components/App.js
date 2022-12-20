import '../index.css';
import {useState, useEffect} from 'react';
import {Switch, Route, useHistory, Redirect} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import PopupWithState from './PopupWithState';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {PopupAddPlace} from './PopupAddPlace';
import {PopupEditAvatar} from './PopupEditAvatar';
import {PopupEditProfile} from './PopupEditProfile';
import {CurrentUserContext} from '../context/CurrentUserContext';
import {api} from '../utils/Api';
import * as MestoAuth from '../MestoAuth';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isStatePopupOpen, setIsStatePopupOpen] = useState(false);
  const [menuActivity, setMenuActivity] = useState(false);
  const [resStatus, setResStatus] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedForm, setLoggedForm] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [mestoAuthMessage, setMestoAuthMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    if(!loggedIn) return;
    api
      .getUserInfo()
      .then((info) => {
        setCurrentUser(info);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
    setMenuActivity(false);
  }, [loggedIn]);

  useEffect(() => {
    getContent();
  }, []);

  function handleLikeCard(card) {
    const isLike = card.likes.includes(currentUser._id);
    
    api 
      .changeLikeStatus(card._id, !isLike)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteCard(deletedCard) {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deletedCard._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsStatePopupOpen(false);
  }

  function handleUpdateUser(data) {
    api
      .changeProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddCard(card) {
    api
      .addCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(password, email) {
    return MestoAuth
      .authorize(password, email)
      .then((data) => {
        if (!data.token) return;
        setUserEmail(email);
        setLoggedIn(true);
        setMestoAuthMessage('Вход выполнен успешно!');
        setResStatus(true);
        setIsStatePopupOpen(true);
        history.push('/');
        if (history.location.pathname === '/') {
          setMenuActivity(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsStatePopupOpen(true);
        setResStatus(false);
        setMestoAuthMessage('Что-то пошло не так, попробуйте ещё раз');
      })
  }

  function handleRegister(password, email) {
    return MestoAuth
      .register(password, email)
      .then((res) => {
        if(res) {
          setResStatus(true);
          history.push('/signin');
          setIsStatePopupOpen(true);
          setMestoAuthMessage('Регистрация выполнена успешно!')
        }
      })
      .catch(() => {
        setIsStatePopupOpen(true);
        setResStatus(false);
        setMestoAuthMessage('Что-то пошло не так, попробуйте ещё раз');
      });
  }

  function handleLogout() {
    return MestoAuth
      .logout()
      .then(() => {
        setUserEmail('');
        setLoggedIn(false);
        history.push('/signin');
        setMenuActivity(false);
      })
      .catch((err) => console.log(err));
  }

  function getContent() {
    return MestoAuth
      .validateToken()
      .then((res) => {
        if (res) {
          setUserEmail(res.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  }

  function handleAuthorization() {
    if(loggedForm) {
      history.push('/signup');
    } else {
      history.push('/signin');
    }
  }

  function handleMenuToggle() {
    setMenuActivity((active) => !active);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          loggedIn={loggedIn}
          onLogout={handleLogout}
          onAuthorization={handleAuthorization}
          onMenuToggle={handleMenuToggle}
          menuActivity={menuActivity}
          history={history}
        />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main 
              onEditProfile={() => setIsEditProfilePopupOpen(true)}
              onAddPlace={() => setIsAddPlacePopupOpen(true)}
              onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
              onCard={handleCardClick}
              cards={cards}
              onCardLike={handleLikeCard}
              onCardDelete={handleDeleteCard}
            />
          </ProtectedRoute>
          <Route exact path="/signup">
            <Register onRegister={handleRegister} setLoggedForm={setLoggedForm} />
          </Route>
          <Route exact path="/signin">
            <Login onLogin={handleLogin} loggedIn={loggedIn} setLoggedForm={setLoggedForm} />
          </Route>
          <Route path="*">{loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}</Route>
        </Switch>
        <Footer />
        <PopupEditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onChangeUser={handleUpdateUser}
        />
        <PopupAddPlace
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />
        <PopupEditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onChangeAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          popupName="remove-card"
          title="Вы уверены?"
          buttonText="Да"
        />
        <ImagePopup
          popupName="scale-image"
          selectedCard={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <PopupWithState mestoAuthMessage={mestoAuthMessage} onClose={closeAllPopups} isOpen={isStatePopupOpen} resStatus={resStatus} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
