-- Verify kita-db:groups on mysql

BEGIN;

INSERT INTO groups (name, floor) VALUES ('Rotkehlchen','1');

SELECT sqitch.checkit(COUNT(*), 'Rotkehlchen does not exist!') FROM groups WHERE name='Rotkehlchen';

INSERT INTO groups (name, floor) VALUES ('Spatzen','1');

SELECT sqitch.checkit(COUNT(*), 'Should have exactly 2 groups on floor 1')
FROM
   (SELECT * FROM
         (SELECT COUNT(*) as count FROM groups WHERE floor='1') AS floor_one
   WHERE count=2) as result;

ROLLBACK;
