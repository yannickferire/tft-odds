// stateSet should be 'latest' if it's live or 'pbe' if it's the upcoming set
export const stateSet: string = "latest";
export const currentSet: number = 16;
export const setStage: number = 1;
export const patch: string = "16.1b";
export const apiURL = `https://raw.communitydragon.org/${stateSet}`;
export const fetchChampionsURL = apiURL + "/cdragon/tft/en_us.json";
export const gameURL = apiURL + "/game";

