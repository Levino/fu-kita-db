-- Revert kita-db:groups from mysql

BEGIN;

DROP TABLE groups;

COMMIT;
