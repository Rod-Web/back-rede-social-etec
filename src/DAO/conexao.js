import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function conexao() {
    const pool = mysql2.createPool({
        host: process.env.HOST_DATABASE, 
        port: process.env.PORTA_BD,
        user: process.env.USER, 
        password: process.env.PASSWORD,
        database: process.env.DATA_BASE

    });
    return pool;
};

export async function testarConexao() {
    let conn;
    try {
        const pool = await conexao();
        conn = await pool.getConnection();
        await conn.ping();
        console.log("✅ Conexão com o MySQL bem-sucedida!");
    } catch (erro) {
        console.error("❌ Falha ao conectar com o MySQL:", erro.message);
    } finally {
        if (conn) conn.release();
    }
}