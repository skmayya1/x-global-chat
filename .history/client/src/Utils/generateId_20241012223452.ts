function createUniqueId(userId, message) {
    // Get the current timestamp
    const timestamp = Date.now();

    // Create a simple hash of the message (you can use a more robust hashing function if needed)
    const hash = message.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0).toString(16); // Convert to hexadecimal string

    // Combine timestamp, userId, and hash to create a unique ID
    const uniqueId = `${timestamp}-${userId}-${hash}`;
    return uniqueId;
}
