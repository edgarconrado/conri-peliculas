import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  peliculasPupulares: Pelicula[] = [];
  
  constructor( private movieServices: MoviesService) {}

  ngOnInit(): void {
    this.movieServices.getFeature()
      .subscribe( resp => {
        this.peliculasRecientes = resp.results;
      });

    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }


  private getPopulares() {
    this.movieServices.getPopulares()
    .subscribe( resp => {

      const arrTemp = [ ...this.peliculasPupulares, ...resp.results];

      // console.log(arrTemp);

      this.peliculasPupulares = arrTemp;
      // this.peliculasPupulares = resp.results;
    });
  }

}
