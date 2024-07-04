import type { Voter } from "@/types/types"
import SUElectionsAPI from "@services/axios"

export const getVoters = async () => { 
    const voters = await SUElectionsAPI.get("voters")
    return voters.data
  }

export const getExtendedVotersGroups = async () => {
    const extendedVotersGroups = await SUElectionsAPI.get("voters-groups/extended")
    return extendedVotersGroups.data
}

export const getVotings = async () => {
    const votings = await SUElectionsAPI.get("votings")
    return votings.data
}