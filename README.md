# Current status

```diff
- Hello random pybasser!

- Trygve is currently at alpha testing phase. You use it. Something breaks? You fix it.

- In case you're interested in development. We heavily recommend you to contact @jarnras

```

Current development is being held on `develop` branch.


# Trygve

Trygve is Trygve. Visit the site on https://trygve.herokuapp.com

## Requirements

- Node.js `^14.13.1`
- npm `^6.14.8`
- MySQL `^8.0`

## MYSQL Setup
### Mac
1. Install `mysql` (8.x) with Homebrew (https://gist.github.com/nrollr/3f57fc15ded7dddddcc4e82fe137b58e)
2. Start the mysql service with `brew services start mysql`
3. Open the mysql terminal with `mysql -u root`
4. In the mysql terminal, create a new user e.g. `CREATE USER 'sissijuuso'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`
5. Fix permissions (this is probably too permissive, but it works): `GRANT ALL PRIVILEGES ON *.* TO 'sissijuuso'@'localhost' WITH GRANT OPTION;`
6. Type `exit` to exit the mysql terminal, and sign in with your new user e.g. `mysql -u sissijuuso -p password`
7. Create the `trygve` database with `CREATE DATABASE trygve;`

### Ubuntu
1. Install mysql with `sudo apt install mysql-server`
2. Service should start automatically
3. Same as with Mac, but use `sudo mysql -u root`
4. Follow Mac instructions
5. Fix permissions (this is probably too permissive, but it works): `GRANT ALL PRIVILEGES ON *.* TO 'sissijuuso'@'localhost' WITH GRANT OPTION;`
6. Exit with `exit` and sign in with your new user e. g. `mysql -u sissijuuso -p` (don't use `mysql -u sissijuuso -p password`)
7. Follow Mac instructions step 6

## Getting started

1. Create an `.env` file at the root of the project. For the contents of the .env file, check [ENV.MD](./ENV.MD)
2. `npm install`
3. `npm start`

**Optional**: You can create mockup data for development by running `npm run create-fake-data`. During development, database can be resetted with `npm run reset-db`.

### Troubleshooting (Ubuntu)
If `npm start` gives error `Error: You must provide a 'secret' in your authentication configuration`, it probably means that the `.env` file is not loaded correctly. A quick fix for this is to either use `export VARIABLE=value` for all the variables.

## Mailgun setup

Mailgun provides 10 000 free messages per month which is suitable for small projects. With minor changes sending mail could be also done via Sendgrid. Using your own mail server gets you labelled as spam pretty fast.

Add mailgun credentials to .env configuration.

### Create first admin user

Add this line to .env configuration.

```
ADMIN_REGISTRATION_ALLOWED=true
```

Create new user with POST request.

```
curl 'http://localhost:3000/api/users' -H 'Content-Type: application/json' --data-binary '{ "email": "admin", "password": "admin" }'
```

**Important**: Disallow admin user creation by removing the line.

By default, only logged in admin users can create new admin users (via `/admin`).

## Production

**Important**: Trygve is currently on alpha stage. Use it at your own risk.

Example of `.htaccess` config:

```
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^ilmo$ ilmo/ [NC,R=301,L]
    RewriteRule ^ilmo/$ http://0.0.0.0:2011/ [P,L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ilmo/(.*)$ http://0.0.0.0:2011/$1 [P,L]
</IfModule>
```

Example of relevant lines in .env file

```
BASE_URL=https://athene.fi
PREFIX_URL=/ilmo
PORT=2011
```

With some hosting providers (such as Otax) you might need to request the access to the port.
Running production version within pm2 is recommended

## Updating production
The develop branch is automatically updated to heroku.

## Documentation

See docs folder.

## Contributing

All help is appreciated. Please contact a fellow committer first.
