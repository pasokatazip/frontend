export type PetSnapshot = {
  petId: string;
  petName: string;
  currentStageKey: string;
  currentStageNo: number;
  nextStageKey: string;
  stageId: number;
  canEvolve: boolean;
  color?: string;
};
