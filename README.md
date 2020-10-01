# url-shortener
URL shortening app back-end repository

The application is deployed on https://ou.tc

| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| /:id     | GET    | Redirects to the related link, or redirects to omiturl.com if the id does not exist in the database. |
| /        | POST   | Creates a new link with unique ID in the database. Request Body: `{ "url": "https://yoururl.com" }` |

API Key feature for authentication purposes will be added later.
