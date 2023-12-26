// Assuming this is in a file named random.ts
export function randomString(length: number): string {
    try {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    } catch (error) {
        console.error(error);
        return ''; // You might want to handle errors more gracefully, returning an empty string as an example
    }
}
