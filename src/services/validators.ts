import type { Voting } from "@/types/types"; 

export const validateCreateVoting = (voting: Voting) => {
  return (
    CreateVoting.validateName(voting.name) &&
    CreateVoting.validateDescription(voting.description) &&
    CreateVoting.validateEndDateAfterStartDate(voting.startDate, voting.endDate) &&
    CreateVoting.validateIsFutureDate(voting.startDate)
  )
};

export const CreateVoting = {
  validateName: (name: string) => {
    console.log(name);
    if (name.length <= 2) return false;
    return true;
  },

  validateDescription: (description: string) => {
    if (description.length <= 2) return false;
    return true;
  },

  validateIsFutureDate: (startDate: Date) => {
    if (startDate < new Date(Date.now())) return false;
    return true;
  },

  validateEndDateAfterStartDate: (startDate: Date, endDate: Date) => {
    if (startDate > endDate) return false;
    return true;
  },
};
