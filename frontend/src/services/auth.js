export function login(username, password) {
  fetch('http://localhost:8000/rest-auth/login/', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(handleErrors)
  .then(({ token }) => { localStorage.setItem('token', token); })
  .catch( error => console.log(error) );
}

export function register(username, password, passwordConfirmation, email) {
  fetch('http://localhost:8000/rest-auth/register/', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      passwordConfirmation,
      email
    }),
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(handleErrors)
  .then(({ token }) => { localStorage.setItem('token', token); })
  .catch( error => console.log(error) );
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
