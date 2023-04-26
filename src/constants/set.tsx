// stateSet should be 'latest' if it's live or 'pbe' if it's the upcoming set
const stateSet = "latest";
export const currentSet = 8; // 8.5
export const setStage = 2;
export const apiURL = `https://raw.communitydragon.org/${stateSet}`;
export const fetchChampionsURL = apiURL + "/cdragon/tft/en_us.json";
export const championImageURL = apiURL + "/game/assets/ux/tft/championsplashes";
export const gameURL = apiURL + "/game";