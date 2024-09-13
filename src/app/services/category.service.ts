import {Injectable} from "@angular/core";
import {ApiService} from "./api-service";
import {Observable} from "rxjs";
import {ApiHttpResponse} from "../app-util/api-response.util";
import {ApiResponse} from "../models/api-response.model";
import {URLS} from "../urls";

@Injectable({
  providedIn: 'root'
  })
export class CategoryService {
  constructor(private apiService: ApiService) {}

  getCategories() :Observable<ApiHttpResponse<ApiResponse>>{
    return this.apiService.get<ApiResponse>(URLS.API.V1.CATEGORY.GET_ALL)
  }
}
