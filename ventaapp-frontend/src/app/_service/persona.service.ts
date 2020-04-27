import { Persona } from './../_model/persona';
import { GenericService } from './generic.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends GenericService<Persona>{

  personaCambio = new Subject<Persona[]>();
  mensajeCambio = new Subject<string>();

   constructor(protected http : HttpClient) { 
    super( http,`${environment.HOST}/personas`);
  }
}
