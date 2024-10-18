export function createUniqueId(userId: string, message: string): string {
    const timestamp: number = Date.now();
    const hash: string = message
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0)
        .toString(16); 

    const uniqueId: string = `${timestamp}-${userId}-${hash}`;
    return uniqueId;
}
