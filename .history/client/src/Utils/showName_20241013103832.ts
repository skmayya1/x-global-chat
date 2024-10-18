export const isNameShown = (prevMsgerID: string | null, MsgerID: string, currID: string): boolean => {
    if (prevMsgerID === currID) {
        return false;         //logged in user
    }
    if (prevMsgerID === MsgerID) {
        return false;         //same user
    }
    if
	return true;
}