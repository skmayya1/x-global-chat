export function createUniqueId(userId, message) {
    const timestamp = Date.now();
    const hash = message.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0).toString(16); 
    // Combine timestamp, userId, and hash to create a unique ID
    const uniqueId = `${timestamp}-${userId}-${hash}`;
    return uniqueId;
}
