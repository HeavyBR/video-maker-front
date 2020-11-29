import { TypeStatus } from './index';

export interface Semantic {
  semantic: 'The history of' | 'What is' | 'Who is';
}

export interface VideoParams extends Semantic {
  image?: string;
  name: string;
  sentence?: string;
  videoURL?: string;
}

export interface VideoState {
  videos: Video[];
  error: string;
  status: TypeStatus;
}

export interface Video {
  _id: string;
  name: string;
  sentence: string;
  semantic: string;
  thumbnail?: string;
  user: string;
  url: string;
}
