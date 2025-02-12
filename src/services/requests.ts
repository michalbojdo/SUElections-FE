import type { Voter } from "@/types/types"
import SUElectionsAPI from "@services/axios"
import { validateCreateVoting } from './validators'

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

export const createVoting = async (voting) => {
    if(validateCreateVoting(voting))
        await SUElectionsAPI.post("votings", voting)
}

export const deleteVoting = async (id) =>{
    await SUElectionsAPI.delete(`/votings/${id}`)
}

export const deleteVotersGroup = async (id) =>{
    await SUElectionsAPI.delete(`/voters-groups/${id}`)
}

export const deleteVoter = async (id) =>{
    await SUElectionsAPI.delete(`/voters/${id}`)
}