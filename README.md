# url-shortener

URL shortening app back-end repository. For the front-end, please refer to [url-shortener-fe repository](https://github.com/sametweb/url-shortener-fe).

The application is deployed on https://ou.tc

| Endpoint | Method | Description                                                                                          |
| -------- | ------ | ---------------------------------------------------------------------------------------------------- |
| /:id     | GET    | Redirects to the related link, or redirects to omiturl.com if the id does not exist in the database. |
| /        | POST   | Creates a new link with unique ID in the database. Request Body: `{ "url": "https://yoururl.com" }`  |

API Key feature for authentication purposes will be added later.

Environment Variables:

| Key            | Value                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| `FRONT_END`    | The url for the deployed deployed-end app                                                                |
| `DATABASE_URL` | On Heroku, no need to create one. On other platforms, this is the variable that points to your database. |
| `DB_ENV`       | Default 'development' if not set. Set it to 'production' when deployed.                                  |
