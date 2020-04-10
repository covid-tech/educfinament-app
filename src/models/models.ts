export interface User {
  id: string,
  username: string,
  email: string,
  provider: string,
  password: string,
  resetPasswordToken: string,
  confirmed: boolean,
  blocked: boolean,
  role: string,
  nom: string,
  cognoms: string,
  imatgePerfil: ImatgePerfil,
  organitzacions: Array<Organitzacio>
}


export interface VideoItem {
  author: string;
  description: string;
  videoURL: string;
  thumbnailURL: string;
  videoType: string; // example: video/mp4
  validated: boolean;
  isAnswer: boolean;
}

export interface Organitzacio {
  id: number,
  nom: string,
  created_at: Date,
  updated_at: Date,
  grups: Array<Grup>
}

export interface Activitat {
  id: string,
  titol: string,
  objectius: string,
  videos: Array<Video>,
  videoInici: Video,
  dataPublicacio: Date,
  dataFinalitzacio: Date,
  publicada: boolean,
  color: string,
  grup: Grup,
  imatgeVideoInici: string,
  materials: string,
  criterisAvaluacio: string,
  imatgeVideoFi: string,
  observacionsFi: string,
  calValidacio: boolean,
  copsVista: number,
  visitants: Array<User>,
  participants: Array<User>,
  videoFi: Video,
  codiInvitacioProfessor: string,
  codiInvitacioAlumne: string
}


export interface Video {
  id: string,
  descripcio: string,
  urlVideo: string,
  urlThumbnail: string,
  validat: boolean,
  enviatPer: string,
  dataPublicacio: Date,
  activitat: string,
  copsVist: number,
  visitants: string
}

export interface Grup {
  id: string,
  nom: string,
  activitats: Array<Activitat>,
  participants: Array<User>
}

export interface Role {
  id: number,
  name: string,
  description: string,
  type: string
}

export interface ImatgePerfil {
  id: 5,
  name: string,
  hash: string,
  sha256: string,
  ext: string,
  mime: string,
  size: number,
  url: string,
  provider: string,
  provider_metadata: any,
  created_at: Date,
  updated_at: Date
}

export interface AuthenticateRequest {
  user: string;
  pass: string;
}

export interface AuthenticateResponse {
  jwt: string;
  usuari: User
  // nom: string;
  // cognoms: string;
  // imatgePerfil: string;
}

export interface SignUpRequest {
  username: string,
  password: string,
  email: string,
  nom: string,
  cognoms: string
}

export interface SignUpResponse {
  id: number,
  username: string,
  email: string,
  nom: string,
  cognoms: string
}