import http from 'node:http';
import file from 'node:fs';

const hostname = '100.100.1.1'; // localhost
const port = 3000;

const TEMPLATE_AUTH = "./../Frontend/src/Script/ApiMock/Auth.json";
const TEMPLATE_PROFILE = "./../Frontend/src/Script/ApiMock/Profile.json";

const SAVE_AUTH = "./../Database/Auth.json";
const SAVE_PROFILE = "./../Database/Profile.json";

if (file.existsSync ("./../Database") == false)
    file.mkdirSync ("./../Database");

if (file.existsSync (SAVE_AUTH) == false) file.writeFileSync (SAVE_AUTH, file.readFileSync (TEMPLATE_AUTH));
if (file.existsSync (SAVE_PROFILE) == false) file.writeFileSync (SAVE_PROFILE, file.readFileSync (TEMPLATE_PROFILE));

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => 
{
    let body = "";

    request.on('data', (chunk: string) => 
    {
        body += chunk;
    })
    request.on('end', () => 
    {
        try
        {
            response.setHeader ("Access-Control-Allow-Origin", "*");

            const method = request.method;
            const path = request.url!;

            if (path == "/api/auth")
            {
                switch (method)
                {
                    case "GET": 
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        response.end (file.readFileSync (SAVE_AUTH));
                        return;
                    case "PUT":
                        file.writeFileSync (SAVE_AUTH, body);

                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        response.end ();
                        return;
                    case "OPTIONS":
                        
                        response.statusCode = 204;
                        response.setHeader('Allow', 'GET, PUT');
                        response.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
                        response.end ();
                        return;
                }
            }
            if (path == "/api/profile")
            {
                switch (method)
                {
                    case "GET": 
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        response.end (file.readFileSync (SAVE_PROFILE));
                        return;
                    case "PUT":
                        file.writeFileSync (SAVE_PROFILE, body);

                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        response.end ();
                        return;
                    case "OPTIONS":
                        
                        response.statusCode = 204;
                        response.setHeader('Allow', 'GET, PUT');
                        response.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
                        response.end ();
                        return;
                }
            }
            console.error (`Invalid access: [${method}] ${path}`);
            response.statusCode = 400;
            response.end ();
        }
        catch (ex)
        {
            console.error (ex);

            response.statusCode = 500;
            response.end ();
        }
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});