import { NextResponse } from "next/server"
import mysql from 'mysql2';

let pool = null;
export function connect() {
   return mysql.createPool({
        host: process.env.TIDB_HOST,
        port: process.env.TIDB_PORT || 4000,
        user: process.env.TIDB_USER,
        password: process.env.TIDB_PASSWORD,
        database: process.env.TIDB_DATABASE || 'test',
        ssl: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true,
        },
        connectionLimit: 1,
        maxIdle: 1,
        enableKeepAlive: true,
    });
}
export function getPool() {
    if (!pool) {
        pool = connect();
    }
    return pool;
}


export async function GET(request) {
    let myQuery = "SELECT * FROM test.todos LIMIT 100;"
    let pool = await getPool()
    let rows = await new Promise((resolve, reject) => {
        pool.query({ sql: myQuery, rowsAsArray: true }, function (err, results, fields) {
            resolve(results)
        });
    })
    return NextResponse.json({ "rows": rows });
}

export async function HEAD(request) { }

export async function POST(req) {
    const data = await req.json();
    let pool = getPool()
    pool.query("CREATE TABLE `todos` (`title` varchar(100), `desc` varchar(100));");
    const rsh = pool.query('INSERT INTO `todos` (`title`, `desc`) VALUES (?, ?);', [data.title, data.desc]);
    return NextResponse.json({ "a": rsh })
}

export async function PUT(request) { }

export async function DELETE(request) { }

export async function PATCH(request) { }

export async function OPTIONS(request) { }