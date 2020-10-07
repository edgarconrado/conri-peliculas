import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {

    //Preguntar si existe una imagen
    if ( !img ) {
      return '../../assets/no-image-banner.jpg';
    }

    const imgUrl = `${ URL }/${ size }${ img }`;
    //console.log(imgUrl);

    return imgUrl;
  }

}
