import sqlite from 'sqlite3';

const CREATE_STATEMENT = `
CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    method TEXT NOT NULL,
    path TEXT NOT NULL,
    requestTime INTEGER NOT NULL,
    responseLatency INTEGER NOT NULL,
    replayLatency INTEGER NOT NULL,
    requestHeaders TEXT,
    requestBody TEXT,
    responseHeaders TEXT,
    responseBody TEXT,
    responseStatus INTEGER,
    replayHeaders TEXT,
    replayBody TEXT,
    replayStatus INTEGER
);
`;

export const INSERT_STATEMENT = `
    INSERT INTO responses(
        method, path, requestTime, responseLatency, replayLatency, requestHeaders, requestBody, responseHeaders, 
        responseBody, responseStatus, replayHeaders, replayBody, replayStatus)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const getDatabase = (path) => {
    const db = new sqlite.Database(path);
    db.run(CREATE_STATEMENT);
    return db;
};
