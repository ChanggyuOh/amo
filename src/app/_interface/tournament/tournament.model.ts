import { Data } from "@angular/router";

export enum TournamentTreeType {

}
export enum TournamentZoneType {

}
export enum CompetitionType {

}

export interface IChampionship {
    id: number;
    tournamentId: number;
    categoryid: number;
    created_at: Date;
    updated_at:Date;

    getCompetitors(): ICompetitor[];
    getTeams(): ITeam[];
    getCompetitions(): ICompetition[];
    getCategory(): IChampionshipCategory;
    getTournament(): ITournament;
    getUsers(): ITournamentUser[];
    getSettings(): IChapionshipSettings;
    getCompetitionsGroups(): ICompetitionsGroup[];
    getGroupsByRound(numRound:number): ICompetitionsGroup[]; // Get groups for a specific round
    getGroupsFromRound(numRound:number): ICompetitionsGroup[]; // Get groups from a specific round
    getFirstRoundCompetitions(): ICompetition[]; // Get competitions for the first round
    getCompetitions(numRound:number): ICompetition[]; // Get competitions for a specific round
    getGroupSize():number;
    isPlayoffCompetitor():boolean;
    isPlayoffTeam():boolean;
    isSingleEliminationCompetior(): boolean;
    isSingleEliminationTeam(): boolean;
    hasPreliminary():boolean;
    isPlayOffType():boolean;
    isSingleEliminationType():boolean;
}

export interface IChapionshipSettings {
    id: number;
    alias: string;
    championshipid: number;
    treeType:TournamentTreeType;
    zones: TournamentZoneType;
    limitByEntity: number;
    hasPreliminary: boolean;
    preliminaryGroupSize: number;
    preliminaryWinner: number;
    teamSize: number;
    teamReserve: number;
    created_at:Date;
    updated_at:Date;
    deleted_at:Date;
}

export interface IChampionshipCategory {
    id: number;
    name: string;
    gender: string;
    isTeam: boolean;
    ageCategory: number;
    ageMin: number;
    ageMax: number;
    gradeCateory: number;
    gradeMin: number;
    gradeMax: number;
    cretedAt:Date;
    updatedAt: Date;
}

export interface ITournament {
    id:number;
    userId:string;
    name:string;
    slug:string;
    type:number;
    levelId:number;
    ownerId: string;
    venue: string;
    isOpen(): boolean;
    needsInvitation():boolean;
    isInternational(): boolean;
    isNational():boolean;
    isRegional():boolean;
    isEstate():boolean;
    isMunicipal():boolean;
    isDistrictal():boolean;
    isLocal():boolean;
    hasNoLevel():boolean;
    createdAt:Date;
    updatedAt:Date;
    deletedAt:Date;
}

export interface ITournamentUser {
    userId: string;     // letspq userid:uuid
    id: number;         // tournament userid
    firstname:string;
    lastname:string;
    email:string,
    password:string;
    rememberToken:string;
    createdAt:Date;
    updatedAt:Date;
    tornamentId: number;// user has a tournament
}

export interface ICompetitor {
    id: number;
    shortId: number;
    championshipId: number;
    userId: number; // TournamentUser.id not TournamentUser.userid
    createdAt:Date;
    updatedAt:Date;
    deletedAt:Date;
    getUser(): ITournamentUser;
}

export interface ICompetitorTeam {
    id: number;
    teamId: number;
    competitorId: number;
    order: number;
    createdAt:Date;
    updatedAt:Date;
    create(championshipId:number):void;
    addCompetitor(competitorId):void;
    removeCompetitor(competitorId):void;
}

export interface ITeam {
    id: number;
    shortId: number;
    name: string;
    championshipId: number;
    picture: string;
    entityType: string;
    entityId: number;
    createdAt:Date;
    updatedAt:Date;
}

export interface ICompetitionsGroupTeam {
    id: number;
    teamId: number;
    fightersGroupId: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICompetitionsGroup {
    id: number;
    shortId: number;
    championshipId: number;
    round: number;
    zone: TournamentZoneType;
    order: number;
    _lft: number;
    _rgt: number;
    parentId: number;
    createdAt: Date;
    updatedAt: Date;
    getChampionship(): IChampionship;
    getCompetitions(): ICompetition[];
    getCompetitors(): ICompetitor[];
    getTeams():ICompetitorTeam[];
    getUsers(): ITournamentUser[];
    getCompetitionType(): CompetitionType;
}

export interface ICompetitionsGroupCompetitor {
    id: number;
    competitorId: number;
    candidatesGroupId: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICompetition {
    id: number;
    shortId: number;
    competitionsGroupId: number;
    competitor1: number;
    competitor2: number;
    winnerId: number;
    zone: TournamentZoneType;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    getGroup(): ICompetitionsGroup;
    getCompetitor1():ICompetitor;
    getCompetitor1():ICompetitor;
    getTeam1(): ICompetitorTeam;
    getTeam2(): ICompetitorTeam;
}