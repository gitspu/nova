import * as profile from './profile'

export const prototype =
{
    state:
    {
        init: false,
    },
    personal: 
    {
        firstName: "",
        middleName: "",
        lastName: "",
        pronoun: "",
        bio: "",
        birthday: "",
        location: ""
    },
    social:
    {
        website: "",
        facebook: "",
        youtube: "",
        twitter: "",
        reddit: "",
        discord: "",
    },
    job:
    {
        item:
        [{
            name: "",
            description: "",
            start: new Date(0),
            end: new Date(0),
        }]
    },
};

export const ERROR_NONE         = 0;
export const ERROR_UNKNOWN      = 1;
export const ERROR_INVALID_STATE = 3;
export const ERROR_INVALID_ID = 4;

export function init ()
{
    if (state.init)
    {
        return Promise.reject (ERROR_INVALID_STATE);
    }
    state.init = true;

    return Promise.resolve ();
}

export function getPersonal (identifier)
{
    if (state.init == false)
    {
        return Promise.reject (ERROR_INVALID_STATE);
    }
    if (identifier == 0)
    {
        return Promise.reject (ERROR_INVALID_ID);
    }
    if (Object.hasOwn (profile.stateServer.item, identifier) == false)
    {
        return Promise.reject (ERROR_INVALID_ID);
    }
    const data = profile.stateServer.item[identifier].personal;
    const template = prototype.personal;
    
    return Promise.resolve (Object.assign ({}, template, {
        firstName:  resolve (data.firstName),
        middleName: resolve (data.middleName),
        lastName: resolve (data.middleName),
        pronoun: resolve (data.pronoun),
        bio: resolve (data.bio),
        birthday: resolve (data.birthday),
        location: resolve (data.location),
    }));
}
export function getSocial (identifier)
{
    if (state.init == false)
    {
        return Promise.reject (ERROR_INVALID_STATE);
    }
    if (identifier == 0)
    {
        return Promise.reject (ERROR_INVALID_ID);
    }
    if (Object.hasOwn (profile.stateServer.item, identifier) == false)
    {
        return Promise.reject (ERROR_INVALID_ID);
    }
    const data = profile.stateServer.item[identifier].social;
    const template = prototype.social;
    
    return Promise.resolve (Object.assign ({}, template, {
        website:  resolve (data.website),
        facebook: resolve (data.facebook),
        youtube: resolve (data.youtube),
        twitter: resolve (data.twitter),
        reddit: resolve (data.reddit),
        discord: resolve (data.discord),
    }));
}
export function getJob (identifier)
{
    if (state.init == false)
    {
        return Promise.reject (ERROR_INVALID_STATE);
    }
    if (identifier == 0)
    {
        return Promise.reject (ERROR_INVALID_ID);
    }
    if (Object.hasOwn (profile.stateServer.item, identifier) == false)
    {
        return Promise.reject (ERROR_INVALID_ID);
    }
    const data = profile.stateServer.item[identifier].job;
    const template = prototype.job;
    const addonItem = [];

    for (const item of data.item)
    {
        if (item.visibility == 3)
            continue;

        addonItem.push ({
            name: item.name,
            description: item.description,
            start: item.start,
            end: item.end,
        });
    }
    
    return Promise.resolve (Object.assign ({}, template, {
        item: addonItem
    }));
}

//                                                                  //
// ################################################################ //
// ||                                                            || //
// ||                          INTERNAL                          || //
// ||                                                            || //
// ################################################################ //
//                                                                  //

let state = structuredClone (prototype.state);

function resolve (value)
{
    if (value == null) { return null; }
    if (value.visibility != 2) { return null; }

    return value.value;
}