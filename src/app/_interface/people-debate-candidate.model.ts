export interface PeopleDebateCandidateItem {
    id: string,
    debateId: number;
    candidate:CandidateItem[];
  }

  export interface CandidateItem {
    id: string,
    debateId: number;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    candidatesPictureLink: string;
    candidatesPublicProfileLink: string;
    email1: string;
    comment: string;
    supports: OpinionItem[];
  }

  export interface OpinionItem {
      comment: string;
      day: string;
      email: string;
      factEvidenceOrOpinion: string;
      tags: string;
      url: string;
  }