import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  /**
   * Stores user json object at local storage
   * @param user
   */
  create(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Destroy user object from local storage and redirects to login
   */
  destroy() {
    localStorage.removeItem('user');
  }

  /**
   * Fetch user information from local storage
   * @returns {string|any|null}
   */
  getUser() {
    return localStorage.getItem('user') || null;
  }

  /**
   * Get user object from session
   */
  getUserClient() {
    let data = localStorage.getItem('user');
    if (!data) return null;
    var user = JSON.parse(data);
    return user.client;
  }

  /**
   * Get logged user email
   */
  getEmail() {
    let data = localStorage.getItem('user');
    if (!data) return null;
    var user = JSON.parse(data);
    return user.client.email;
  }

  /**
   * Fetch token from local storage
   * @returns {string}
   */
  getSessionToken() {
    let data = localStorage.getItem('user');
    if (!data) return null;
    let session = JSON.parse(data);

    return (session && session.token) ? session.token : null;
  }

  getUserId() {
    let data = localStorage.getItem('user');
    if (!data) return null;
    var user = JSON.parse(data);
    return (user) ? user.client._id : "";
  }

  isAuth(): boolean {
    let data = localStorage.getItem('user');
    if (!data) return false;
    var session = JSON.parse(data);
    if (session && session.token) return true;
    else return false;
  }
}
