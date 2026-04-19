# PostgreSQL Setup on Ubuntu VPS

Follow these steps to set up PostgreSQL on your Hostinger Ubuntu VPS:

## 1. Install PostgreSQL
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
```

## 2. Start and Enable PostgreSQL
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## 3. Create Database and User
Access the PostgreSQL prompt:
```bash
sudo -i -u postgres psql
```

Inside the PSQL prompt, run:
```sql
CREATE DATABASE starberatung_db;
CREATE USER postgres WITH PASSWORD '3434'; -- Match your .env
GRANT ALL PRIVILEGES ON DATABASE starberatung_db TO postgres;
\q
```

## 4. Test Local Connection
```bash
psql -h localhost -U postgres -d starberatung_db
```

## 5. Prisma Configuration
Once the database is ready, uncomment the migration line in `DEPLOYS.sh`:
```bash
# npx prisma migrate deploy
```
And run `./DEPLOYS.sh` again to apply the schema.
