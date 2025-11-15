import * as test from './TestConfig'

export class DataHead
{
    division = 10;
};
export class DataChunk
{
    item = [{
        type: TYPE_UNKNOWN,
        profile: 0,
        post: 0
    }]
};

export class ErrorState extends Error {};
export class ErrorArgument extends Error {};

export function init ()
{
    if (state.init)
        throw new ErrorState ("Feed System is already been initialized");

    state.generation.splice (0, 1);

    const json = loadJson ();
    const profileBlock = json["item"];

    if (profileBlock != null)
    {
        for (const profileKey of shuffle (Object.keys (profileBlock)))
        {
            const profile = profileBlock[profileKey];
            const post = profile["post"];

            if (post == null)
                continue;

            const postItem = shuffle (post["item"]);

            if (postItem == null)
                continue;

            for (let index = 0; index < postItem.length; index ++)
            {
                state.generation.push ({
                    type: TYPE_NORMAL,
                    profile: profileKey,
                    post: index
                });
            }
        }
        shuffle (state.generation);
    }
    state.init = true;
    return;
}

export function get ()
{
    const result = new DataChunk ();

    result.item.splice (0, 1);

    for (const item of state.generation)
    {
        result.item.push ({
            type: item.type,
            profile: item.profile,
            post: item.post,
        });
    }
    return result;
}

export const TYPE_UNKNOWN = 0;
export const TYPE_NORMAL = 1;
export const TYPE_SPONSORED = 2;

//                                                                  //
// ################################################################ //
// ||                                                            || //
// ||                          INTERNAL                          || //
// ||                                                            || //
// ################################################################ //
//                                                                  //

export const state =
{
    init: false,
    generation: [{
        type: TYPE_UNKNOWN,
        profile: 0,
        post: 0
    }]
};
const key = "DbProfile";

function shuffle (array)
{
    if (array == null)
    {
        return null;
    }
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) 
    {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
}

function loadJson ()
{
    if (test.remote)
    {
        const request = new XMLHttpRequest ();

        request.open ('GET', 'http://100.100.1.1:3000/api/profile', false);
        request.send ();

        if (request.status != 200)
        {
            console.error (request.statusText);
            return {};
        }
        return JSON.parse (request.responseText);
    }
    let raw = localStorage.getItem (key);

    if (raw == null) 
        return {};

    return JSON.parse (raw);
}
