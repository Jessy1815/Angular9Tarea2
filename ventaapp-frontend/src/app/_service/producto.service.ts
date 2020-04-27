import { GenericService } from './generic.service';
import { Producto } from './../_model/producto';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto> {

  productoCambio = new Subject<Producto[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected http : HttpClient) { 
    super( http,`${environment.HOST}/productos`);
  }

}
