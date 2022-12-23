class Api {
  constructor(baseUrl, headers, corsHeaders) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._corsHeaders = corsHeaders;
  }

  _getResponseServer(res) {
    if(!res.ok) {
      return Promise.reject (`Ошибка ${res.status}`); 
    }
    return res.json();
  }

  _getFetch(pathUrl) {
    return fetch(`${this._baseUrl}${pathUrl}`, {
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseServer(res));
  }

  changeProfile = (data) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name: data.name, about: data.about}),
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseServer(res));
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: data.name, link: data.link,}),
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseServer(res));
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: data,}),
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseServer(res));
  }

  getUserInfo() {
    return this._getFetch('/users/me');
  }

  getCards() {
    return this._getFetch('/cards')
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseServer(res));
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseServer(res));
  }

  deleteLikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseServer(res));
  }

  _putFetch(pathUrl) {
    return fetch(`${this._baseUrl}${pathUrl}`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseServer(res));
  }

  _deleteFetch(pathUrl) {
    return fetch(`${this._baseUrl}${pathUrl}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
      mode: 'cors',
    }).then((res) => this._getResponseServer(res));
  }

  changeLikeStatus(id, isLike) {
    return isLike ? this._putFetch(`/cards/${id}/likes`) : this._deleteFetch(`/cards/${id}/likes`);
  }
}

export const api = new Api('https://domainname.studentegor.nomoredomains.icu', {
  'Content-Type': 'application/json',
});