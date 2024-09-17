import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service'; // Servicio para obtener los pacientes
import { Paciente } from '../../models/paciente.model'; // Modelo del paciente
import { ListarRegistrosComponent } from '../listar-registros/listar-registros.component'; // Importa el componente listar-registros

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListarRegistrosComponent], // Importa el componente listar-registros
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corregido: styleUrls, no styleUrl
})
export class HomeComponent implements OnInit {

  public ultimosRegistros: Paciente[] = []; // Array para almacenar los últimos 5 registros

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    // Llama al método que carga los registros al inicializar el componente
    this.cargarUltimosRegistros();
  }

  cargarUltimosRegistros(): void {
    // Llama al servicio para obtener todos los registros
    this.pacienteService.getPacientes().subscribe(
      (registros: Paciente[]) => {
        // Filtra los últimos 5 registros
        this.ultimosRegistros = registros.slice(-5); // Toma los últimos 5 elementos
      },
      error => {
        console.error('Error al cargar los registros:', error);
      }
    );
  }
}
