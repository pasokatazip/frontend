const mockBranchKeys = ["nishoku", "yonshoku", "shokushu"] as const;

export function getMockPetStageKey(stageId: number, mockIndex: number) {
  if (stageId === 0) {
    return "akago";
  }

  const branchKey = mockBranchKeys[mockIndex % mockBranchKeys.length];
  const stagePrefix = stageId === 1 ? "amae" : "bratty";

  return `${stagePrefix}_${branchKey}`;
}
