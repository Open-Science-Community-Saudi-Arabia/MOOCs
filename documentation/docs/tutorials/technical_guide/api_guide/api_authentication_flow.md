
### Authentication Flow
This tutorial explains the authentication flow of our MOOCs platform API. We use `basicAuth` middleware to check if a user is logged in, and the permission handler to implement role-based access control. This tutorial also includes other useful information relating to authentication flow.

Authentication is a crucial aspect of any web application, and it is especially important for APIs. In this section, we will explain the authentication flow for this API and how to use the basicAuth middleware to check if a user is logged in.

### JWT Tokens
This API uses JSON Web Tokens (JWTs) for authentication. JWTs are a stateless way to authenticate users, which means that the server does not need to store any user data in memory or a database. Instead, the server sends the user a token upon successful authentication, and the user includes that token in subsequent requests to the server. The server then verifies the token to ensure that the user is authorized to access the requested resource.

There are two types of JWT tokens used in this API: access tokens and refresh tokens. Access tokens are short-lived tokens that are used to authenticate a user and grant access to protected resources. Refresh tokens are long-lived tokens that are used to request new access tokens when the original access token expires.

### Middleware
Middleware is a way to add functionality to the server's request/response pipeline. In this API, we use middleware to authenticate users and check their permissions to access protected resources.

### BasicAuth Middleware
The basicAuth middleware is used to check if a user is logged in. It takes an optional token_type parameter, which specifies the type of JWT token to expect. The available token types are access and refresh. If no token type is specified, the middleware assumes that the token is an access token.

Here's an example of how to use the basicAuth middleware in a route:

Here's an example of how the basicAuth middleware is used in our API:

```javascript
const { basicAuth } = require("../middlewares/auth")

router.get("/:id", basicAuth('access'), getCourseData)
```

In this example, we're protecting the /courses/:id route with the basicAuth middleware. We're also specifying the type of JWT token to expect ('access'), which determines which secret will be used to verify the JWT token. The basicAuth middleware is used to authenticate a user before they can access the getCourseData function. The middleware is passed the access token type as an argument, which tells the middleware which secret to use to verify the token.

If the user is not authenticated, the middleware throws an UnauthenticatedError error. If the token type is optional, by default the middleware will the access token type. If the token type is not optional, the middleware throws an InvalidTokenError error.


### Permission Handler
Permission handlers are a type of middleware that implement role-based access control (RBAC) for routes. RBAC is a security model that restricts access to resources based on the user's role.

In our API, we use permission handlers to protect routes that require specific access permissions. The permission handler checks if the user's JWT token contains the required access permission before allowing the request to proceed.

The permission handler is used to check if a user has the correct permissions to access a protected resource. It takes an array of permissions as an argument, and checks if the user has at least one of the permissions in the array. If the user has at least one of the permissions, the handler calls the next function in the request/response pipeline. If the user does not have any of the permissions, the handler throws a `ForbiddenError` error.

```javascript
const { hasAccess } = require("../middlewares/permissions")

router.get("/:id", basicAuth('access'), hasAccess('admin'), getCourseData)
```

In this example, we're using the hasAccess middleware to check if the user has the 'admin' access permission before allowing the request to proceed.

### Authentication Flow
This is a sample authentication flow for a user who wants to access the course data. The user must be logged in and have the 'admin' access permission to access the course data.

1. The user sends a POST request to the /auth/login route with their email and password.
2. The server checks if the user exists in the database and if the password is correct.
3. If the user exists and the password is correct, the server generates an access token and a refresh token and sends them to the user.
4. The user sends a GET request to the /courses route with the access token in the Authorization header.
5. The server verifies the access token and checks if the user has the 'admin' access permission.
6. If the user has the 'admin' access permission, the server sends the user the course data. If the user does not have the 'admin' access permission, the server throws a ForbiddenError error.
7. If the access token is expired, the user sends a GET request to the `/authtoken `route with the refresh token in the Authorization header.
8. The server verifies the refresh token and generates a new access token.

### Conclusion
In this tutorial, we explained the authentication flow of our MOOCs platform API. We also explained how to use the basicAuth middleware to check if a user is logged in and the permission handler to implement role-based access control. This tutorial also included other useful information relating to authentication flow.

[//]: # (End of Path: documentation\docs\tutorials\technical_guide\api_guide\api_authentication_flow.md)

[//]: # (Start of Path: documentation\docs\tutorials\technical_guide\api_guide\api_error_handling.md)