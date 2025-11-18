
export function generateId (space)
{
    while (true)
    {
        const min = 1;
        const max = Number.MAX_SAFE_INTEGER;
        const id = Math.floor (Math.random () * (max - min + 1)) + min;

        if (space != null && space[id] != null) {
            continue;
        }
        return id;
    }
}
export function generateUUID (space)
{
    while (true)
    {
        const uuid = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );

        if (space != null && space[uuid] != null) {
            continue;
        }
        return uuid;
    }
}