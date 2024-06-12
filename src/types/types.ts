export interface Voter{
    id: number,
    name: string,
    lastName: string,
    email: string
}
export interface VotersGroup{
    id: number,
    name: string,
    voters: Array<number>
}