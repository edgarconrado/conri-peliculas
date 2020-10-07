import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>( query: string ) {

    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;

    return this.http.get<T>( query );
  }

  getFeature() {

    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = this.getMesString(hoy.getMonth() + 1);

    const inicio = `${ hoy.getFullYear() }-${ mes }-01`;
    const fin    = `${ hoy.getFullYear() }-${ mes }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  getPopulares() {

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;

    return this.ejecutarQuery<RespuestaMDB>(query);

  }

  getPeliculaDetalle( id: string ) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  getActoresPelicula( id: string ) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
  }

  getBuscarPeliculas( texto: string ) {

    return this.ejecutarQuery(`/search/movie?query=${ texto }`);
  }

  getGeneros(): Promise<Genre[]> {

    return new Promise( resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`)
      .subscribe( resp => {
          this.generos = resp['genres']
          console.log( this.generos );
          resolve(this.generos);
      });
    });

  }

  private getMesString( mes: number): string {

    if ( mes < 10 ) {
      return '0' + mes;
    } else {
      return  mes.toString();
    }
  }
}
