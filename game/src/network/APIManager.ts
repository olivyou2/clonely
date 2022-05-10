import axios from 'axios';

export default class APIManager {
  static baseUrl: string = 'http://localhost';

  /**
   *
   * @param userId User Id
   * @param password Password
   * @returns user data
   */
  static async createUser(userId: string, password: string) {
    const res = await axios.put(`${APIManager.baseUrl}/user`, {
      userId,
      password,
    });

    if (res.status !== 201) {
      throw new Error(`createUser response is ${res.status}`);
    }

    return res.data;
  }

  /**
   *
   * @param userId
   * @param password
   * @returns accessToken
   */
  static async loginUser(userId: string, password: string) {
    const res = await axios.post(`${APIManager.baseUrl}/user`, {
      userId,
      password,
    });

    if (res.status !== 200) {
      throw new Error(`createUser response is ${res.status}`);
    }

    return res.data.data.token;
  }
}
