export namespace Utils {
    export function delay(delayMs = 5000): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => resolve(), delayMs);
        });
    }
}