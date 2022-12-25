export const BASE_URL = 'http://domainback.studentegor.nomoredomains.club';

function request({ url, method = 'POST', data }) {
  return fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

export const authorize = (password, email) => {
  return request({
    url: '/signin',
    data: { password, email },
  });
};

export const register = (password, email) => {
  return request({
    url: '/signup',
    data: { password, email },
  });
};

export const logout = () => {
  return request({
    url: '/users/signout',
    method: 'DELETE',
  });
}

export const validateToken = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token: token,
  });
};