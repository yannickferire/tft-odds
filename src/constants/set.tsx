// stateSet should be 'latest' if it's live or 'pbe' if it's the upcoming set
export const stateSet: string = "pbe";
export const currentSet: number = 9;
export const setStage: number = 2;
export const patch: string = "13.18";
export const apiURL = `https://raw.communitydragon.org/${stateSet}`;
export const fetchChampionsURL = apiURL + "/cdragon/tft/en_us.json";
export const championImageURL = apiURL + "/game/assets/ux/tft/championsplashes";
export const gameURL = apiURL + "/game";