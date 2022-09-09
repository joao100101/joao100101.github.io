import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Class } from './components/snackTypes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'bookstore-front';
}

function mensagem(str: String, classe: Class, _snack: MatSnackBar): void {
  _snack.open(`${str}`, 'OK', {
  horizontalPosition: 'end',
  verticalPosition: 'top',
  duration: 3000,
  panelClass: Class[classe]
});
}
export {mensagem}