export type Voter={
    id: number,
    name: string,
    lastName: string,
    email: string
}
export type VotersGroup={
    id: number,
    name: string,
    voters: Array<Voter> | Array<number>
}