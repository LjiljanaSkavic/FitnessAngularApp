import { MatSnackBarConfig } from "@angular/material/snack-bar";

export const MESSAGE_SUCCESS = 'Message successfully sent.';
export const ERROR_HAS_OCCURRED_MESSAGE = 'An error has occurred.';

export const snackBarConfig: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: 'center',
  verticalPosition: 'top',
}
