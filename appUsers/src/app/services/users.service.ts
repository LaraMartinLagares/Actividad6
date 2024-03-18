import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IResponse } from '../interfaces/iresponse.interface';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient);
  private baseUrl : string = 'https://peticiones.online/api/users'


  getAll(): Promise<IResponse> {
    return lastValueFrom(this.httpClient.get<IResponse>(this.baseUrl));
  }

  getPage(numPage: number): Promise<IResponse> {
   return lastValueFrom(this.httpClient.get<IResponse>(`${this.baseUrl}?page=${numPage}`))
  }

  getById(id: string): Promise<IUser>{
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`))
  }

  insert(user: IUser): Promise<IUser>{
    return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl,user))
  }

  update(formValue: IUser): Promise<any>{
    return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${formValue._id}`, formValue))
  }

  delete(id: string): Promise<any>{
    return lastValueFrom(this.httpClient.delete<string>(`${this.baseUrl}/${id}`))
  }
}
