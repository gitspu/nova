import * as response from './Server/Response'

const TRACE_GET     = true;
const TRACE_POST    = true;
const TRACE_PUT     = true;
const URL           = "http://localhost:5173"

const DEFAULT_HEADER    = new Headers ({});
const DEFAULT_MODE      = "same-origin";
const DEFAULT_REFERER   = "no-referrer";

export function get (path)
{
    const req = new Request (`${URL}${path}`, 
    { 
        method: 'GET', 
        headers: DEFAULT_HEADER, 
        mode: DEFAULT_MODE, 
        referrerPolicy: DEFAULT_REFERER
    });
    const res = response.process (req);

    return Promise.resolve (res);
}

export function post (path, body)
{
    const req = new Request (`${URL}${path}`, 
    { 
        method: 'POST', 
        headers: DEFAULT_HEADER, 
        mode: DEFAULT_MODE, 
        referrerPolicy: DEFAULT_REFERER,
        body: body
    });
    const res = response.process (req);

    return Promise.resolve (res);
}
export function put (path, body)
{
    const req = new Request (`${URL}${path}`,
    { 
        method: 'PUT', 
        headers: DEFAULT_HEADER, 
        mode: DEFAULT_MODE, 
        referrerPolicy: DEFAULT_REFERER,
        body: body
    });
    const res = response.process (req);

    return Promise.resolve (res);
}

//                                                                  //
// ################################################################ //
// ||                                                            || //
// ||                          INTERNAL                          || //
// ||                                                            || //
// ################################################################ //
//                                                                  //

