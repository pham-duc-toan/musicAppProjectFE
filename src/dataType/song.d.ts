export interface TSongDetail {
  listen: number;
  _id: string;
  title: string;
  avatar: string;
  description: string;
  singerId: {
    _id: string;
    fullName: string;
    [key: string]: any;
  };
  topicId: string;
  like: number;
  lyrics: string;
  audio: string;
  status: string;
  slug: string;
  isPlaying?: boolean;
  deleted: boolean;
}
export interface TSongFooter {
  _id: string;
  title: string;
  singerFullName: string;
  audio: string;
  slug: string;
  isPlaying: boolean;
  currentTime: number;
}
