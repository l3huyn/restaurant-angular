import { LoginDTO } from './../dtos/user/login.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { RegisterDTO } from '../dtos/user/register.dto';
import { environment } from '../environments/environment';
import { RegisterDTO } from '../dtos/user/register.dto';
import { UserResponse } from '../responses/user/user.response';
import { UserDTO } from '../dtos/user/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
  private apiUser = `${environment.apiBaseUrl}/users`;
  private apiConfig = {
    headers: this.createHeaders(),
  };

  //hàm xây dựng
  constructor(private http: HttpClient) {}

  //hàm tạo headers -> dùng chung -> lấy ra phần header trong http
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  //   //hàm đăng ký
  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  //hàm đăng nhập
  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }

  getAllUsers(page: number, limit: number): Observable<UserResponse[]> {
    debugger;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(this.apiUser, { params });
  }

  getUserById(id: number) {
    debugger;
    return this.http.get(`${environment.apiBaseUrl}/users/${id}`);
  }

  createUser(userData: UserDTO): Observable<any> {
    debugger;
    return this.http.post(
      `${environment.apiBaseUrl}/users/register`,
      userData,
      {
        responseType: 'text',
      }
    );
  }

  updateUser(userId: number, userData: UserDTO): Observable<any> {
    debugger;
    return this.http.put(`${environment.apiBaseUrl}/users/${userId}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    debugger;
    const url = `${environment.apiBaseUrl}/users/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  getUserDetail(token: string) {
    return this.http.post(this.apiUserDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger;
      if (userResponse == null || !userResponse) {
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJSON = JSON.stringify(userResponse);
      // Save the JSON string to local storage with a key (e.g., "userResponse")
      localStorage.setItem('user', userResponseJSON);
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage: ', error);
    }
  }

  getUserResponseFromLocalStorage(): UserResponse | null {
    try {
      // Retrieve the JSON string from local storage using the key
      const userResponseJSON = localStorage.getItem('user');
      if (userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      // Parse the JSON string back to an object
      const userResponse = JSON.parse(userResponseJSON!);
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error(
        'Error retrieving user response from local storage:',
        error
      );
      return null; // Return null or handle the error as needed
    }
  }

  removeUserFromLocalStorage(): void {
    try {
      // Remove the user data from local storage using the key
      localStorage.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
      // Handle the error as needed
    }
  }
}
