import * as profile from './Profile'

export function init ()
{
    return;
}

export function getFeedHead ()
{
    return {
        chunk: 10
    };
}
export function getFeed (chunk = NaN)
{
    const item = 
    [{
        author: 0,
        id: 0    
    }];

    return item;
}