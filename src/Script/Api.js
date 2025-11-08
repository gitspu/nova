import * as toAuth from './Api/Authentication';
import * as toProfile from './Api/Profile'
import * as toProfileOf from './Api/ProfileOf'

export const auth = toAuth;
export const profile = toProfile;
export const profileOf = toProfileOf;

export function init ()
{
    auth.init ();
    profile.init ();

    try
    {
        profile.setContact (profile.getContact ());
        profile.setEducation (profile.getEducation ());
        profile.setInterest (profile.getInterest ());
        profile.setJob (profile.getJob ());
        profile.setPersonal (profile.getPersonal ());
        profile.setSkill (profile.getSkill ());
        profile.setSocial (profile.getSocial ());
    }
    catch (ex)
    {
        console.error (ex);
    }
}