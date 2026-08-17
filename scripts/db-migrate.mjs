/**
 * Aplică fișiere SQL pe baza de date Supabase.
 *
 * Supabase nu expune DDL prin API-ul REST, deci migrațiile au nevoie de o
 * conexiune Postgres directă. Șirul de conectare se ia din Supabase -> Connect
 * -> Session pooler și se pune în `.env.local`, ca `SUPABASE_DB_URL`. Nu e
 * folosit de aplicație, doar de acest script.
 *
 * Fiecare fișier rulează într-o singură tranzacție: dacă o comandă eșuează, nu
 * rămâne o schemă pe jumătate aplicată.
 *
 * Rulare:
 *   node --env-file=.env.local scripts/db-migrate.mjs supabase/migrations/0002_admin.sql
 */
import { readFile } from "node:fs/promises";
import pg from "pg";

const files = process.argv.slice(2);

if (files.length === 0) {
  console.error("Folosire: node --env-file=.env.local scripts/db-migrate.mjs <fișier.sql> [...]");
  process.exit(1);
}

const connectionString = process.env.SUPABASE_DB_URL;
if (!connectionString) {
  console.error(
    "Lipsește SUPABASE_DB_URL din .env.local (Supabase -> Connect -> Session pooler).",
  );
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  // Poolerul Supabase servește un certificat care nu e în lanțul implicit al
  // Node; conexiunea rămâne criptată.
  ssl: { rejectUnauthorized: false },
  statement_timeout: 120_000,
});

await client.connect();

let failed = false;

for (const file of files) {
  const sql = await readFile(file, "utf8");
  process.stdout.write(`\n${file}\n`);

  try {
    await client.query("begin");
    await client.query(sql);
    await client.query("commit");
    console.log("  aplicat.");
  } catch (err) {
    await client.query("rollback").catch(() => {});
    failed = true;
    console.error(`  EȘEC: ${err.message}`);
    if (err.position) {
      // Arătăm linia vinovată, altfel poziția din caractere nu ajută la nimic.
      const upto = sql.slice(0, Number(err.position));
      const line = upto.split("\n").length;
      console.error(`  la linia ${line}: ${sql.split("\n")[line - 1]?.trim()}`);
    }
    break;
  }
}

await client.end();
process.exitCode = failed ? 1 : 0;
