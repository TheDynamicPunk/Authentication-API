# Authentication-API
Authentication API utilizing JSON Web Tokens to authenticate user having MongoDB as the database and NodeJS providing the backend.

## Running the API
You need to have npm installed in your system and a code editor (like VSCode)
1. Open the command prompt and navigate to the project directory
2. Run the following command in the terminal
```bash
npm install
```
3. Create .env file and copy-paste the contents of the .env-sample file in it
4. Create a database in Mlab and paste the link of your DB in front of `DB_URL =` in .env file
5. Now assign any random value to `TOKEN_SECRET` upto 128 bits
6. Now run the server by running the following command in terminal
```bash
npm start
```
7. Simulate API calls using either [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).
## API Endpoints

### Public Routes
1. `/api/user/login` - POST
##### Body
```json
{
	"email": "",
	"password": "",
	"date": ""
}
```
>**Date -** parameter is optional

2. `/api/user/register` - POST
##### Body
```json
{
	"name": "",
	"email": "",
	"password": "",
	"date": ""	//Optional
}
```
>**Date -** parameter is optional
### Private Route
`/api/user/login` - GET
##### Headers
```json
{
	"auth-token": ""
}
```
>`auth-token` paste the token value you get while logging in or registering
