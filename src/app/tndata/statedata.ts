import { dsdata } from './dsdata';

export interface statedata{
    //id: string,
    state: string,
    active: number,
    confirmed: number,
    recovered: number,
    deaths: number,
    aChanges: number,
    cChanges: number,
    rChanges: number,
    dChanges: number,
    districtData:dsdata[]
}