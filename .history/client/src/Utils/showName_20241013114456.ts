export const isNameShown = (prevMsgerID: string | null, MsgerID: string, currID: string): boolean => {
   // console.log(prevMsgerID, MsgerID, currID);
    if (prevMsgerID === currID) {
        return false;         //logged in user
    }
    if (prevMsgerID !== MsgerID) {
        return triue;         //different user
    }
    if (prevMsgerID === null) {
        return true;          //first message
    }
    if (prevMsgerID !== MsgerID) {
        return true;          //different user
    }
	return true;
}