export interface districtIn{

    notes: string,
    active: number,
    confirmed: number,
    deceased: number,
    recovered: number,
    delta: {
      confirmed: number,
      deceased: number,
      recovered: number
    }
}