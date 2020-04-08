import { Component, OnInit } from '@angular/core';
import { VideoItem } from 'src/app/models/video-item';

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

  constructor() { }

  ngOnInit() {
  }

}