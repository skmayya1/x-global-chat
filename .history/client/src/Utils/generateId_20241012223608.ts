export function createUniqueId(userId: string, message: string): string {
    // Get the current timestamp
    const timestamp: number = Date.now();

    // Create a simple hash of the message (you can use a more robust hashing function if needed)
    const hash: string = message
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0)
        .toString(16); // Convert to hexadecimal string

    // Combine timestamp, userId, and hash to create a unique ID
    const uniqueId: string = `${timestamp}-${userId}-${hash}`;
    return uniqueId;
}
