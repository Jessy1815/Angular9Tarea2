import { switchMap } from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { PersonaService } from 'src/app/_service/persona.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Persona } from 'src/app/_model/persona';

@Component({
  selector: 'app-persona-dialogo',
  templateUrl: './persona-dialogo.component.html',
  styleUrls: ['./persona-dialogo.component.css']
})

export class PersonaDialogoComponent implements OnInit {
  persona: Persona;
  constructor(
    private personaService : PersonaService,
    private dialogRef: MatDialogRef<PersonaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data : Persona
  ) { }

  ngOnInit(): void {
    this.persona = new Persona();
    this.persona.idPersona = this.data.idPersona;
    this.persona.nombres = this.data.nombres;
    this.persona.apellidos = this.data.apellidos;

  }

  operar(){
    if(this.persona != null && this.persona.idPersona > 0){
      //MODIFICAR PERSONA
      this.personaService.modificar(this.persona).pipe(switchMap( () => {
        return this.personaService.listar();
      })).subscribe(data => {
        this.personaService.personaCambio.next(data);
        this.personaService.mensajeCambio.next('SE MODIFICO');
      });
    }else{
      //REGISTRAR PERSONA
      this.personaService.registrar(this.persona).pipe(switchMap( () => {
        return this.personaService.listar();
      })).subscribe(data => {
        this.personaService.personaCambio.next(data);
        this.personaService.mensajeCambio.next('SE REGISTRO');
      });
    }
    this.dialogRef.close();
  }

  cancelar(){
    this.dialogRef.close();
  }

}
