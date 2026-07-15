const db = require("../config/database");

// ==============================
// GET ALL ARTWORKS
// ==============================
exports.getAllArtworks = async () => {
    const [rows] = await db.query(`
        SELECT
            a.artwork_id AS id,
            a.title,
            a.medium,
            a.client_id,
            c.name AS client,
            a.dimensions,
            a.status,
            a.price,
            a.date_completed AS dateCompleted,
            a.notes,
            a.image,
            a.created_at,
            a.updated_at
        FROM artworks a
        LEFT JOIN clients c
            ON a.client_id = c.client_id
        ORDER BY a.artwork_id DESC
    `);
    return rows;
};

// ==============================
// GET ARTWORK BY ID
// ==============================
exports.getArtworkById = async (id) => {
    const [rows] = await db.query(`
        SELECT
            a.artwork_id AS id,
            a.title,
            a.medium,
            a.client_id,
            c.name AS client,
            a.dimensions,
            a.status,
            a.price,
            a.date_completed AS dateCompleted,
            a.notes,
            a.image,
            a.created_at,
            a.updated_at
        FROM artworks a
        LEFT JOIN clients c
            ON a.client_id = c.client_id
        WHERE a.artwork_id = ?
    `, [id]);
    return rows[0];
};

// ==============================
// CREATE ARTWORK
// ==============================
exports.createArtwork = async (artwork) => {
    const sql = `
        INSERT INTO artworks
        (title, medium, client_id, dimensions, status, price, date_completed, notes, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        artwork.title,
        artwork.medium,
        artwork.client_id || null,
        artwork.dimensions,
        artwork.status,
        artwork.price,
        artwork.dateCompleted,
        artwork.notes,
        artwork.image || null
    ];
    const [result] = await db.query(sql, values);
    return result;
};

// ==============================
// UPDATE ARTWORK
// ==============================
exports.updateArtwork = async (id, artwork) => {
    // Note: Ensure the 'artwork' object keys match the module definition in dashboard.html
    const sql = `
        UPDATE artworks
        SET
            title = ?,
            medium = ?,
            client_id = ?,
            dimensions = ?,
            status = ?,
            price = ?,
            date_completed = ?,
            notes = ?,
            image = ?
        WHERE artwork_id = ?
    `;

    const values = [
        artwork.title,
        artwork.medium,
        artwork.client_id || null,
        artwork.dimensions,
        artwork.status,
        artwork.price,
        artwork.dateCompleted,
        artwork.notes,
        artwork.image || null,
        id
    ];

    try {
        const [result] = await db.query(sql, values);
        return result;
    } catch (error) {
        console.error("Database Update Error:", error);
        throw error;
    }
};

// ==============================
// DELETE ARTWORK
// ==============================
exports.deleteArtwork = async (id) => {
    const [result] = await db.query(
        "DELETE FROM artworks WHERE artwork_id = ?",
        [id]
    );
    return result;
};