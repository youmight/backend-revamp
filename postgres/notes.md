## psql commands
One the psql terminal is open following commands can be used.

### To create a database
```
CREATE DATABASE database_name;
>> For example
postgres=# CREATE DATABASE testDb;
CREATE DATABASE
```

### To list all the databases
```
\l

>>> For example, above command gives below, other than testDb all are default creations
                                   List of databases
   Name    |  Owner   | Encoding | Locale Provider | Collate | Ctype | ICU Locale | ICU Rules |   Access privileges   
-----------+----------+----------+-----------------+---------+-------+------------+-----------+-----------------------
 postgres  | postgres | UTF8     | libc            | C       | C     |            |           | 
 template0 | postgres | UTF8     | libc            | C       | C     |            |           | =c/postgres          +
           |          |          |                 |         |       |            |           | postgres=CTc/postgres
 template1 | postgres | UTF8     | libc            | C       | C     |            |           | =c/postgres          +
           |          |          |                 |         |       |            |           | postgres=CTc/postgres
 testdb    | postgres | UTF8     | libc            | C       | C     |            |           | 
(4 rows)
```

### To connect to a database
```
\c database_name
>>> For example
\c testdb
postgres=# \c testdb
You are now connected to database "testdb" as user "postgres".
```

Once we have connected to a database, then we can use normal SQL commands.

### To create a table
```
CREATE TABLE profile(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password text,
    age int
);
```
### To see all the tables of the database to which you are connected to 
```
\dt
>>> Shows below 
testdb=# \dt
          List of relations
 Schema |  Name   | Type  |  Owner   
--------+---------+-------+----------
 public | profile | table | postgres
```

> Table names in postgres are preferred to be singular.

INSERT INTO profile (email, name, age, password) VALUES ('someone@email.com', 'Someone', 35, 'ueosnvnbefmx')