import { Component, OnInit } from '@angular/core';
import { VideoItem } from 'src/app/models/video-item';
import { User } from 'src/app/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  videoProfessor: VideoItem = {
    author: "Professor",
    description: "Descripció de l'activitat. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
    validated: false,
    videoType: "video/mp4",
    videoURL: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-video.mp4",
    thumbnailURL: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-thumbnail.jpg",
    isAnswer: false
  }

  videoProfessor2: VideoItem = {
    author: "Professor",
    description: "Com ha anat l'activitat? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been...",
    validated: true,
    videoType: "video/mp4",
    videoURL: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-video.mp4",
    thumbnailURL: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-thumbnail.jpg",
    isAnswer: false
  }

  videoAlumneValidat: VideoItem = {
    author: "Alumne 1",
    description: "",
    validated: false,
    videoType: "video/mp4",
    videoURL: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-video.mp4",
    thumbnailURL: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-thumbnail.jpg",
    isAnswer: true
  }

  videoAlumneNoValidat: VideoItem = {
    author: "Alumne 2",
    description: "",
    validated: false,
    videoType: "video/mp4",
    videoURL: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-video.mp4",
    thumbnailURL: "https://educfinament.s3-us-west-2.amazonaws.com/videos/1586106774699-thumbnail.jpg",
    isAnswer: true
  }

  usuaris: Array<User> = [
    {
      nom: "Pepet",
      cognoms: "Canals",
      profileImg: "https://randomuser.me/api/portraits/med/women/94.jpg",
      sent: true,
      validated: false
    },
    {
      nom: "Ricard",
      cognoms: "Gonzalez",
      profileImg: null,
      sent: true,
      validated: false
    },
    {
      nom: "Judit",
      cognoms: "Ramirez",
      profileImg: null,
      sent: true,
      validated: true
    },
    {
      nom: "Pepet",
      cognoms: "Canals",
      profileImg: "https://randomuser.me/api/portraits/med/men/95.jpg",
      sent: true,
      validated: true
    },

    {
      nom: "Pepet",
      cognoms: "Canals",
      profileImg: null,
      sent: false,
      validated: false
    },
    {
      nom: "Pepet",
      cognoms: "Canals",
      profileImg: "https://randomuser.me/api/portraits/med/women/96.jpg",
      sent: false,
      validated: false
    }
  ];
  

  constructor() { }

  ngOnInit() {
  }

}