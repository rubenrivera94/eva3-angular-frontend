import { Component } from '@angular/core';
import { BusquedaRegistroComponent } from '../busqueda-registro/busqueda-registro.component'; // Importar el componente

@Component({
  selector: 'app-buscar-registro',
  standalone: true,
  imports: [BusquedaRegistroComponent],
  templateUrl: './buscar-registro.component.html',
  styleUrl: './buscar-registro.component.css'
})
export class BuscarRegistroComponent {

}
