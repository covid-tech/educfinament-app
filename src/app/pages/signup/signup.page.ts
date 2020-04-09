import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { Activity } from 'src/app/activity';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public user: User = {
    nom: "Pepet",
    cognoms: "Canals",
    profileImg: "https://randomuser.me/api/portraits/med/women/94.jpg",
    sent: true,
    validated: false
  };

  public activity: Activity = {
    title: "Fem de constructors",
    description: "Utilitza objectes que tinguin les formes que es veuen al vídeo i fes una construcció",
    dataFi: null,
    dataInici: null,
    thumbnail: "https://www.consalud.es/estetic/uploads/s1/10/82/42/4/las-frutas-nos-aportan-vitaminas-fibra-minerales-y-agua-foto-freepik.jpeg",
    users: [
      {
        nom: "Pepet",
        cognoms: "Canals",
        profileImg: "https://randomuser.me/api/portraits/med/women/94.jpg",
        sent: true,
        validated: false
      },
      {
        nom: "Pepet",
        cognoms: "Canals",
        profileImg: "https://randomuser.me/api/portraits/med/women/94.jpg",
        sent: true,
        validated: false
      },
      {
        nom: "Pepet",
        cognoms: "Canals",
        profileImg: "https://randomuser.me/api/portraits/med/women/94.jpg",
        sent: true,
        validated: false
      },
      {
        nom: "Pepet",
        cognoms: "Canals",
        profileImg: "https://randomuser.me/api/portraits/med/women/94.jpg",
        sent: true,
        validated: false
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
