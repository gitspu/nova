import http from 'node:http';
import fs   from 'node:fs';

const NET_HOSTNAME      = '100.100.1.1';
const NET_PORT          = 3000;

const SAMPLE_ANALYTICS  = './../Frontend/src/Script/Sample/Analytics.json';
const SAMPLE_ADS        = './../Frontend/src/Script/Sample/Ads.json';
const SAMPLE_AUTH       = './../Frontend/src/Script/Sample/Auth.json';
const SAMPLE_PROFILE    = './../Frontend/src/Script/Sample/Profile.json';

const SAVE_DIR          = './../Database';
const SAVE_ANALYTICS    = "./../Database/Analytics.json";
const SAVE_ADS          = "./../Database/Ads.json";
const SAVE_AUTH         = "./../Database/Auth.json";
const SAVE_PROFILE      = "./../Database/Profile.json";

const URL_ANALYTICS     = '/api/analytics';
const URL_ADS           = '/api/ads';
const URL_AUTH          = '/api/auth';
const URL_PROFILE       = '/api/profile';

const connection = http.createServer ();

const mkdir = (path: string) =>
{
    if (fs.existsSync (path) == false)
        fs.mkdirSync (path);
}
const callbackGet = (path: string, body: string, res: http.ServerResponse) =>
{
    if (path == URL_ADS) 
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        mkdir (SAVE_DIR);

        if (fs.existsSync (SAVE_ADS) == false)
            fs.writeFileSync (SAVE_ADS, fs.readFileSync (SAMPLE_ADS));

        res.end (fs.readFileSync (SAVE_ADS));
        return;
    }
    if (path == URL_AUTH) 
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        mkdir (SAVE_DIR);

        if (fs.existsSync (SAVE_AUTH) == false)
            fs.writeFileSync (SAVE_AUTH, fs.readFileSync (SAMPLE_AUTH));

        res.end (fs.readFileSync (SAVE_AUTH));
        return;
    }
    if (path == URL_PROFILE) 
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        mkdir (SAVE_DIR);

        if (fs.existsSync (SAVE_PROFILE) == false)
            fs.writeFileSync (SAVE_PROFILE, fs.readFileSync (SAMPLE_PROFILE));

        res.end (fs.readFileSync (SAVE_PROFILE));
        return;
    }
    if (path == URL_ANALYTICS) 
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        mkdir (SAVE_DIR);

        if (fs.existsSync (SAVE_ANALYTICS) == false)
            fs.writeFileSync (SAVE_ANALYTICS, fs.readFileSync (SAMPLE_ANALYTICS));

        res.end (fs.readFileSync (SAVE_ANALYTICS));
        return;
    }
}
const callbackPut = (path: string, body: string, res: http.ServerResponse) =>
{
    if (path == URL_ADS)
    {
        fs.writeFileSync (SAVE_ADS, body);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end ();
    }
    if (path == URL_AUTH)
    {
        fs.writeFileSync (SAVE_AUTH, body);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end ();
    }
    if (path == URL_PROFILE)
    {
        fs.writeFileSync (SAVE_PROFILE, body);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end ();
    }
    if (path == URL_ANALYTICS)
    {
        fs.writeFileSync (SAVE_ANALYTICS, body);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end ();
    }
}
const callbackDelete = (path: string, body: string, res: http.ServerResponse) =>
{
    if (path == URL_ADS)
    {
        fs.rmSync (SAVE_ADS);

        res.statusCode = 200;
        res.end ();
        return;
    }
    if (path == URL_AUTH)
    {
        fs.rmSync (SAVE_AUTH);
        
        res.statusCode = 200;
        res.end ();
        return;
    }
    if (path == URL_PROFILE)
    {
        fs.rmSync (SAVE_PROFILE);
        
        res.statusCode = 200;
        res.end ();
        return;
    }
    if (path == URL_ANALYTICS)
    {
        fs.rmSync (SAVE_ANALYTICS);
        
        res.statusCode = 200;
        res.end ();
        return;
    }
}
const callbackOption = (path: string, body: string, res: http.ServerResponse) =>
{
    res.statusCode = 204;
    res.setHeader('Allow', 'GET, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
    res.end ();
}

connection.on ('request', (income: http.IncomingMessage, res: http.ServerResponse) => 
{
    let body = '';

    income.on ('data', (chunk: string) => body += chunk);
    income.on ('end', () =>
    {
        res.setHeader ("Access-Control-Allow-Origin", "*");

        try
        {
            switch (income.method!)
            {
                case 'GET': return callbackGet (income.url!, body!, res!);
                case 'PUT': return callbackPut (income.url!, body!, res!);
                case 'DELETE': return callbackDelete (income.url!, body!, res!);
                case 'OPTIONS': return callbackOption (income.url!, body!, res!);
                default:
                    console.error (`Invalid access: [${income.method!}] ${income.url!}`);
                    res.statusCode = 400;
                    res.end ();
                    break;
            }
            if (res.writable == false)
            {
                return;
            }
            res.statusCode = 400;
            res.end ();
        }
        catch (ex)
        {
            console.error (ex);

            res.statusCode = 500;
            res.end ();
        }    
    });
});
connection.listen(NET_PORT, NET_HOSTNAME, () => 
{
    console.log(`Server running at http://${NET_HOSTNAME}:${NET_PORT}/`);
});