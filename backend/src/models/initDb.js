const db = require('../config/db');

const createTables = async () => {
    try {
        // Table Users
        await db.query(`
            CREATE TABLE IF NOT EXISTS "users" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                encrypted_access_token TEXT,
                refresh_token TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Table Post (liée à Users par une clé étrangère 1..*)
        await db.query(`
            CREATE TABLE IF NOT EXISTS "posts" (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES "users"(id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                media_url TEXT,
                status VARCHAR(50) DEFAULT 'DRAFT',
                scheduled_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Table ExecutionLog (liée à Post par une clé étrangère 1..*)
        await db.query(`
            CREATE TABLE IF NOT EXISTS "execution_logs" (
                id SERIAL PRIMARY KEY,
                post_id INTEGER REFERENCES "posts"(id) ON DELETE CASCADE,
                attempt_count INTEGER DEFAULT 1,
                error_message TEXT,
                logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("Tables PostgreSQL créées avec succès (Users, Posts, ExecutionLogs).");
    } catch (error) {
        console.error("Erreur lors de la création des tables :", error);
    }
};

module.exports = createTables;