use rusqlite::Connection;
use rusqlite::{params, OptionalExtension};
use std::sync::{Mutex, OnceLock};

// Usamos Mutex porque SQLite síncrono no puede ser accedido
// por dos hilos al mismo tiempo sin protección.
static DB_CONN: OnceLock<Mutex<Connection>> = OnceLock::new();

pub fn init(path: &str) -> Result<(), rusqlite::Error> {
    let conn = Connection::open(path)?;

    DB_CONN.set(Mutex::new(conn)).map_err(|_| {
        rusqlite::Error::SqliteFailure(
            rusqlite::ffi::Error::new(1), // Código de error genérico
            Some("La base de datos ya fue inicializada".to_string()),
        )
    })?;

    Ok(())
}

// Helper para ejecutar querys sin retorno (INSERT, UPDATE)
pub fn execute(query: &str, params: &[&dyn rusqlite::ToSql]) -> Result<usize, rusqlite::Error> {
    let lock = DB_CONN.get().unwrap().lock().unwrap();
    lock.execute(query, params)
}

pub fn fetch_one<F, T>(
    query: &str,
    params: &[&dyn rusqlite::ToSql],
    mapper: F,
) -> Result<Option<T>, rusqlite::Error>
where
    F: FnOnce(&rusqlite::Row) -> Result<T, rusqlite::Error>,
{
    let lock = DB_CONN.get().unwrap().lock().unwrap(); // Tu Mutex global

    // query_row intenta buscar 1 fila
    let result = lock.query_row(query, params, mapper);

    // .optional() convierte el error "QueryReturnedNoRows" en un Ok(None)
    result.optional()
}
pub fn fetch_all<F, T>(
    query: &str,
    params: &[&dyn rusqlite::ToSql],
    mut mapper: F,
) -> Result<Vec<T>, rusqlite::Error>
where
    F: FnMut(&rusqlite::Row) -> Result<T, rusqlite::Error>,
{
    let lock = DB_CONN.get().unwrap().lock().unwrap(); // Mutex global

    let mut stmt = lock.prepare(query)?;
    let rows = stmt.query_map(params, |row| mapper(row))?;

    let mut results = Vec::new();
    for row in rows {
        results.push(row?);
    }

    Ok(results)
}

// Si necesitas acceso directo a la conexión para selects complejos
pub fn access_db<F, T>(f: F) -> T
where
    F: FnOnce(&Connection) -> T,
{
    let lock = DB_CONN.get().unwrap().lock().unwrap();
    f(&lock)
}
