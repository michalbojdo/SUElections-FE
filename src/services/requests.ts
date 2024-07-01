import type { Voter } from "@/types/types"
import SUElectionsAPI from "@services/axios"

export const getVoters = async () => { 
    const voters = await SUElectionsAPI.get("voters")
    return voters.data
  }

export const getVotersGroups = async () => {
    const votersGroups = await SUElectionsAPI.get("votersGroups")
    return votersGroups.data
}