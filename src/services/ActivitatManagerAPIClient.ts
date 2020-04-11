import { Injectable } from '@angular/core';
import { EducfinamentAPIClient } from 'services/EducfinamentAPIClient';
import { environment } from 'environments/environment';
import { Activitat, User, AcceptaActivitatRequest } from 'models/models';
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

  modificaActivitat(activitat: Activitat) {
    let url = environment.SERVER_API_URL + '/activitats/' + activitat.id;

    return Observable.create(observer => {
      this.putContentToURL(url, JSON.stringify(activitat)).subscribe(
        (res: Activitat) => {
          observer.next(res);
          observer.complete();
        }, err => {
          observer.error(err);
        }
      );
    });

  }

  acceptaActivitatAmbCodi(usuari: User, codi: string) {
    let url = environment.SERVER_API_URL + '/activitats/apuntaActivitat';

    let req : AcceptaActivitatRequest = {
      codiInvitacio: codi,
      usuari: usuari.id
    };

    return Observable.create(observer => {
      this.postContentToURL(url, JSON.stringify(req))
        .subscribe(
          res => { 
            observer.next(res);
            observer.complete();
          },
          err => { 
            observer.error(err);
          }
        );
    })

  }

}
