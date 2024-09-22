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
export type Voting={
    id: number,
    name: string,
    description: string,
    votersGroups: Array<VotersGroup> | Array<number>
    votesFor: number,
    votesAgainst: number,
    votesLeft: number,
    active: boolean,
    startingDate: Date,
    endingDate: Date
}