import AuthService from '../utils/AuthService';
const auth = new AuthService('7iR3YcDoRL33tQ8OBI4HGlAJwMcXwYWw', 'tchaffee.auth0.com');

export function toggleUserGoing (venueId) {

  return auth.fetch(`/api/${venueId}/going/`,
    {
      method: 'POST'
    }
  )
  .then(response => {
    return response.json();
  })
};

export function getUsersGoingCount (venueId) {

  return fetch(`/api/${venueId}/going/`,
    {
      method: 'GET'
    }
  )
  .then(response => {
    return response.json();
  });
};
