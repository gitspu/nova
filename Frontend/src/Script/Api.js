import * as toAnalytics from './Api/Analytics'
import * as toAuth      from './Api/Auth';
import * as toProfile   from './Api/Profile'
import * as toProfileOf from './Api/ProfileOf'
import * as toFeed      from './Api/Feed'
import * as toUtil      from './Api/Util'
import * as toIcon      from './Icon';

export const analytics = toAnalytics;
export const auth = toAuth;
export const profile = toProfile;
export const profileOf = toProfileOf;
export const feed = toFeed;
export const util = toUtil;

export function init ()
{
    if (!analytics.isInit ()) analytics.init ();
    if (!auth.isInit()) auth.init ();
    if (!profile.isInit()) profile.init ();
    if (!profileOf.isInit()) profileOf.init ();
    if (!feed.isInit ()) feed.init ();
}

export function decodeContent (value)
{
    if (value == "" || value == null)
        return toIcon.transparent;

    const split = String (value).split (' ');

    if (split.length != 2) {
        return toIcon.transparent;
    }
    const mime = split[0];
    const content = split[1];

    return `data:${mime};base64,${content}`;
}
export function encodeContent (value)
{
    if (value == null) return ``;

    try 
    {
        const regex = /^data:([a-zA-Z0-9/+.-]+);base64,([a-zA-Z0-9+/=]+)$/;
        const group = String(value).match(regex);

        if (group == null) return ``;

        const mime = group[1];
        const content = group[2];

        return `${mime} ${content}`;
    }
    catch (ex)
    {
        console.error (ex);

        return '';
    }
}
export default
{
    analytics,
    auth,
    profile,
    profileOf,
    feed,
    util,

    init,
    decodeContent,
    encodeContent,
};