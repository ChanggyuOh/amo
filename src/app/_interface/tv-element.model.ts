export interface TvElement {
    index: number;
    medianame: string;
    links: MediaLinks[];
}

export interface MediaLinks {
  link: string;
  title: string;
}