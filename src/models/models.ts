export interface User {
  id: string,
  username: string,
  email: string,
  provider: string,
  password: string,
  resetPasswordToken: string,
  confirmed: boolean,
  blocked: boolean,
  role: any, // TODO: Crear model role
  nom: string,
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
  grups: Array<Grup>,
  socProfessor: boolean,
}

export interface Activitat {
  id: string,
  titol: string,
  descripcio: string,
  objectius: string,
  videos: Array<Video>,
  videoInici: Video,
  dataPublicacio: Date,
  dataFinalitzacio: Date,
  publicada: boolean,
  color: string,
  grup: Grup,
  socProfessor: boolean,
  imatgeVideoInici: string,
  materials: string,
  criteriAvaluacioMoltBe: string,
  criteriAvaluacioBe: string,
  criteriAvaluacioFluix: string,
  criteriAvaluacioNoAssolit: string,
  imatgeVideoFi: string,
  observacionsFi: string,
  calValidacio: boolean,
  copsVista: number,
  visitants: Array<User>,
  videoFi: Video,
  codiInvitacioProfessor: string,
  codiInvitacioAlumne: string,
  esPrivada: boolean,
  professors: User[]
}

export interface Video {
  id: number,
  descripcio: string,
  urlVideo: string,
  urlThumbnail: string,
  validat: boolean,
  enviatPer: any,
  dataPublicacio: Date,
  activitat: number,
  copsVist: number,
  visitants: string,
  avaluacio: number
}

export interface Grup {
  id: string,
  nom: string,
  activitats: Array<Activitat>,
  participants: Array<User>,
  organitzacio: Organitzacio,
  professors: User[],
  socProfessor?: boolean,
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
  user: User
  // nom: string;
  // cognoms: string;
  // imatgePerfil: string;
}

export interface AcceptaActivitatRequest {
  usuari: string,
  codiInvitacio: string
}

export interface SignUpRequest {
  username: string,
  password: string,
  email: string,
  nom: string,
  cognoms: string,
  imatgePerfil: string
}

export interface SignUpResponse {
  id: number,
  username: string,
  email: string,
  nom: string,
  cognoms: string
}
