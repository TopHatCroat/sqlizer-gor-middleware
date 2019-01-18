import gor from 'goreplay_middleware';
import { getDatabase, INSERT_STATEMENT } from './db';

const dbPath = process.argv[2];
if (dbPath === undefined) {
    console.error('First argument must be specify DB path');
    process.exit(1);
}
const db = getDatabase(dbPath);

gor.init();

gor.on("request", function(req) {
    gor.on("response", req.ID, function(resp) {
        gor.on("replay", req.ID, function(repl) {
            const method = gor.httpMethod(req.http);
            const path = gor.httpPath(req.http);
            const requestTime = req.meta[2];
            const respLatency = resp.meta[3];
            const replLatency = repl.meta[3];
            const reqHeaders = req.http.slice(0, req.http.indexOf("\r\n\r\n") + 4).toString();
            const reqBody = gor.httpBody(req.http);

            const respHeaders = resp.http.slice(0, resp.http.indexOf("\r\n\r\n") + 4).toString();
            const respBody = gor.httpBody(resp.http);
            const respStatus = gor.httpStatus(resp.http);

            const replHeaders = repl.http.slice(0, repl.http.indexOf("\r\n\r\n") + 4).toString();
            const replBody = gor.httpBody(repl.http);
            const replStatus = gor.httpStatus(repl.http);

            db.run(INSERT_STATEMENT, [
                method,
                path,
                requestTime,
                respLatency,
                replLatency,
                reqHeaders,
                reqBody,
                respHeaders,
                respBody,
                respStatus,
                replHeaders,
                replBody,
                replStatus
            ]);
            return repl;
        });
        return resp;
    });
    return req
});