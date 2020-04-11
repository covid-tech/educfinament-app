import { Injectable } from '@angular/core';
import { EducfinamentAPIClient } from 'services/EducfinamentAPIClient';
import { environment } from 'environments/environment';
import { Activitat } from 'models/models';
import { Observable } from 'rxjs';

@Injectable()
export class ActivitatManagerAPIClient extends EducfinamentAPIClient {

  obtenirActivitat(id: number) {

    let url = environment.SERVER_API_URL + "/activitats/" + id;

    return Observable.create(observer => {
        this.getContentFromURL(url).subscribe(
            (res: Activitat) => {
                observer.next(res);
                observer.complete();
            }, err => {
                observer.error(err);
            }
        );
    });
      
  }

  creaActivitat(activitat: Activitat) {
    let url = environment.SERVER_API_URL + '/activitats';

    return Observable.create(observer => {
      this.postContentToURL(url, JSON.stringify(activitat)).subscribe(
        (res: Activitat) => {
          observer.next(res);
          observer.complete();
        }, err => {
          observer.error(err);
        }
      )
      
    });

  }

}
