import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TokenStorageService);
  const token = tokenStorage. getToken();

  let authReq = req. clone({
    withCredentials: true  
  });

  if (token) {
    authReq = authReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  console.log('🔐 Auth Interceptor - Token:', token ?  'Present' : 'Missing');
  console.log('🔐 Request URL:', req.url);
  console.log('🔐 Headers:', authReq.headers. keys());

  return next(authReq);
};