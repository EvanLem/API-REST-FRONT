import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

export function HttpErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const snackbar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      // Gestion des erreurs HTTP
      if (error.status === 404) {
        errorMessage = 'Ressource non trouvée (404).';
      } else if (error.status === 500) {
        errorMessage = 'Erreur serveur (500).';
      } else if (error.status === 403) {
        errorMessage = 'Accès interdit (403).';
      } else {
        errorMessage = 'Une erreur inattendue est survenue.';
      }

      alert(errorMessage);

      // Lever l'erreur pour qu'elle soit disponible ailleurs
      return throwError(() => new Error(errorMessage));
    })
  );
}
