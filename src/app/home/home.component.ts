import { Component,OnInit } from '@angular/core';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  preguntas = [
    {no:1, pregunta:'¿Cuál es la capital de Francia?',categoria:"",correo:"",fecha:"",id:""},
  ]
  newP = {categoria:"",pregunta:""}
  constructor(private api:ApiRestService){}
  ngOnInit():void{
    this.consulta()
  }
  consulta(){
    this.api.getAllPreguntas().subscribe({
      next:datos=>{
        console.log(datos.documents[1].fields)
        let i =0
        this.preguntas = datos.documents.map((p:any) => ({
          no:i++,
          pregunta: p.fields && p.fields.hasOwnProperty('pregunta')? p.fields.pregunta.stringValue:"",
          categoria: p.fields && p.fields.hasOwnProperty('categoria')? p.fields.categoria.stringValue:"",
          correo: p.fields && p.fields.hasOwnProperty('correo')? p.fields.correo.stringValue:"",
          fecha: p.fields && p.fields.hasOwnProperty('fecha')? p.fields.fecha.timestamp:"",
          id: p.name.split("/").pop()
        }))
        console.log(this.preguntas)
      },
      error:errores=>{}
    }
    )
  }
  crearPregunta(){
    const correo = localStorage.getItem("correo")||""
    const fecha = new Date().toISOString();
    if(this.newP.categoria == "" || this.newP.pregunta ==""){
      alert("Debes escribir la pregunta y seleccionar la categoría")
      return;
    }
    this.api.createPregunta(this.newP.categoria,correo,this.newP.pregunta,fecha).subscribe({
      next: resp =>{this.consulta()},
      error: e =>{console.log(e)}
    })
  }
  borrarPregunta(id:string){
    this.api.deletePregunta(id).subscribe({
      next: resp => {this.consulta()},
      error: e => {console.log(e)}
    }) 

  }
}
