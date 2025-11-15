
export function serialize (target, prototype)
{
    if (target == null)     throw new Error ("Target argument is required");
    if (prototype == null)  throw new Error ("Prototype argument is required");

    serializeTraversal (target, prototype);

    return JSON.stringify (target);

}
export function deserialize (json, prototype)
{
    if (json == null)       throw new Error ("Target argument is required");
    if (prototype == null)  throw new Error ("Prototype argument is required");

    const root = JSON.parse (json);

    deserializeTraversal (root, prototype);

    return root;
}

// ------------------------------ //

function serializeTraversal (depthTarget, depthPrototype)
{
    for (const key of Object.keys (depthTarget))
    {
        if (Object.hasOwn (depthTarget, key) != Object.hasOwn (depthPrototype, key))
        {
            console.warn ("Serializer: Object contains property that prototype doesn't:", key, "=", depthTarget[key]);
        }
        
        if (depthTarget[key] instanceof Date && depthPrototype[key] instanceof Date)
        {
            depthTarget[key] = depthTarget[key].toUTCString ();
        }
        else if (typeof depthTarget[key] == "object" && typeof depthPrototype[key] == "object")
        {
            if (depthTarget[key] != null) 
                serializeTraversal (depthTarget[key], depthPrototype[key]);         
        }
        else
        {
            depthTarget[key] = depthPrototype[key];
        }
    }
}

function deserializeTraversal (depthTarget, depthPrototype)
{
    for (const key of Object.keys (depthTarget))
    {
        if (typeof depthTarget[key] == "string" && depthPrototype[key] instanceof Date)
        {
            depthTarget[key] = new Date (depthTarget[key]);
        }
        if (typeof depthTarget[key] == "object" && typeof depthPrototype[key] == "object")
        {
            if (depthTarget[key] == null) 
            {
                continue;
            }
            deserializeTraversal (depthTarget[key], depthPrototype[key]);
        }
        depthTarget[key] = depthPrototype[key];
    }
}