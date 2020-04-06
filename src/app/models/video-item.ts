export interface VideoItem {
    author: string;
    description: string;
    videoURL: string;
    thumbnailURL: string;
    videoType: string; // example: video/mp4
    validated: boolean;
    isAnswer: boolean;
}
