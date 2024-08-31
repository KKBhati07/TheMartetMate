import {map, Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

export interface ApiHttpResponse<T> extends HttpResponse<T> {
  isSuccessful(): boolean;
}

export function apiResponse<T>(response$: Observable<HttpResponse<T>>): Observable<ApiHttpResponse<T>> {
  return response$.pipe(
    map((response: HttpResponse<T>) => {
      const res: ApiHttpResponse<T> = Object.assign(response.clone(), {
        isSuccessful: () => response.status >= 200 && response.status < 300
      });
      return res;
    })
  );
}
