// stateSet should be 'latest' if it's live or 'pbe' if it's the upcoming set
export const stateSet: string = "latest";
export const currentSet: number = 11;
export const setStage: number = 1;
export const patch: string = "14.2";
export const apiURL = `https://raw.communitydragon.org/${stateSet}`;
export const fetchChampionsURL = apiURL + "/cdragon/tft/en_us.json";
export const championImageURL = apiURL + "/game/assets/ux/tft/championsplashes";
export const gameURL = apiURL + "/game";