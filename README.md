# Minty

## General Information
This project will allow users to link their institutional bank accounts using the Plaid API and gain access to their transactional data in a searchable and filterable table. Users will also be able to add, update, and delete individual cash transactions. This app will have a complete Node.js authentication API with Register, Login, Logout, Email Verification, and Password Reset using JWT, Passport.js, and Sendgrid.    

## Technologies
This project uses the following technologies:
* ***React*** and ***React Router*** for the frontend
* ***Express*** and ***Node*** for the backend
* ***MongoDB*** and ***Mongoose*** for the database
* ***Redux*** for state management
* ***Plaid*** for bank account linkage and transaction data
* ***Jsonwebtoken*** and ***Passport*** for authentication
* ***Sendgrid*** for emails
* ***Axios*** for HTTP client requests to backend 
* ***Express-validator*** for server side validation and sanitization
* ***Bcryptjs*** for hashing of passwords
* ***Material-table*** for data table
* ***Styled Components*** for component level styles 
* ***Webpack*** for module bundling of JS and CSS files
* ***Babel*** for JS transpiler to convert ES6+ code to ES5
* ***Postman*** for testing API routes 

## Visual Studio Code Plugins
* ES7 React/Redux/JS snippets
* Bracket Pair Colorizer
* Prettier formatter for Visual Studio Code
* Live Server
* Node.js Modules Intellisense

## Chrome Extensions
* React Developer Tools
* Redux Developer Tools
* Allow-Control-Allow-Origin

## Postman Environment Setup
1. Create a new enironment, "Minty API" and an environment variable, `url` and set its' initial value to "localhost:1200". This way, `url` can now be used in all of our requests. 
<img src="/public/images/postman/ManageEnvironmentVariables.png?raw=true" alt="ManageEnvironmentVariables" width="700">

2. Create the following test script within the *`POST`* `/users/login` and *`POST`* `/auth/google` routes (the routes that will generate the "authToken" and hence authenticate the user) in order to set the `authToken` as an environment variable
<img src="/public/images/postman/TestScriptToSetAuthToken.png?raw=true" alt="TestScriptToSetAuthToken" width="700">

3. Set the authorization type to "Bearer Token" and the token to the new `authToken` environment variable 
<img src="/public/images/postman/SetBearerTokenToAuthToken.png?raw=true" alt="SetBearerTokenToAuthToken" width="700">

4. For all requests that require authentication, set the Authorization Type to "Inherit auth from parent"
<img src="/public/images/postman/InheritAuthFromParent.png?raw=true" alt="InheritAuthFromParent" width="700">

5. For all request that do not require authentication, set the Authorization Type to "No Auth"
<img src="/public/images/postman/NoAuthRequired.png?raw=true" alt="NoAuthRequired" width="700">

## Configuration
### Mongo
Add your own `MONGOURI` from your mLab database in `configs/keys.js`

### JWT
Add your `JWT_SECRET` in `configs/keys.js`

### Plaid
Add your Plaid API keys (`PLAID_CLIENT_ID`, `PLAID_SECRET`, `PLAID_PUBLIC_KEY`, and `PLAID_REDIRECT_URI`) in `configs/keys.js`

### Google API
Add your `GOOGLE_API_KEY`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET` in `configs/keys.js`

### Send Grid
Add your `SENDGRID_API_KEY_ID`, `SENDGRID_API_KEY`, and `from_email` in `configs/keys.js`

## Quick Start
To run this project, install dependencies for server and client
`npm install`

Run Webpack
`npm run build:dev`

Run Server
`npm run start`

## API Documentation
### Authentication Routes
* **Route**:    *`POST`* `/users`
* **Description**:  Signup user and create new user profile
* **Access**:   Public
* **Request Body**:
```javascript
    {
        email: string,
        password: string,
        firstName: string,
        lastName: string
    }
```
* **Response Body**:
```javascript
    {
        message: string
    }
```
<img src="/public/images/postman/createUser.png?raw=true" alt="createUser" width="700">

* **Route**:   *`POST`* `/users/login`
* **Description**:    Login user
* **Access**:  Public
* **Request Body**: 
```javascript
    {
        email: string,
        password: string
    }
```
* **Response Body**:
```javascript
    {
        user: {
            isVerified,
            _id: string,
            firstName: string,
            lastName: string,
            email: string,
            createdAt: date,
            updatedAt: date
        },
        token: string
    }
```
<img src="/public/images/postman/loginUser.png?raw=true" alt="loginUser" width="700">

* **Route**:   *`POST`* `/auth/google`
* **Description**:    Authenicate with Google 
* **Access**:  Private
* **Request Body**: 
```javascript
    {
        googleTokenId: string
    }
```
* **Response Body**:
```javascript
    {
        user: {
            isVerified,
            _id: string,
            firstName: string,
            lastName: string,
            email: string,
            createdAt: date,
            updatedAt: date
        },
        token: string
    }
```

* **Route**:   *`POST`* `/users/logout`
* **Description**:    Logout currently authenticated user of current session
* **Access**:  Private
* **Request Body**: 
    `null`
* **Response Body**:
```javascript
    {
        success: true
    }  
```
<img src="/public/images/postman/logoutUser.png?raw=true" alt="logoutUser" width="700">

* **Route**:   *`POST`* `/auth/remove`
* **Description**:    Logout a specific user of a specific session
* **Access**:  Public
* **Request Body**: 
```javascript
    {
        id_token: string, 
        auth_token: string
    }
```
* **Response Body**:
```javascript
    {
        success: true
    }
```
<img src="/public/images/postman/unAuthenticateUser.png?raw=true" alt="unAuthenticateUser" width="700">

* **Route**:   *`POST`* `/users/logoutAll`
* **Description**:    Logout currently authenticated user of all sessions
* **Access**:  Private
* **Request Body**: 
    `null`
* **Response Body**:
```javascript
    {
        success: true
    }
```
<img src="/public/images/postman/logoutAll.png?raw=true" alt="logoutAll" width="700">

## Email Verification Routes
* **Route**:    *`GET`* `/verify/:token`
* **Description**:     Verify user
* **Access**:   Public
* **Params**:   `token=[string]`
* **Response Body**:
```javascript
    {
        message: string
    }
```
<img src="/public/images/postman/verifyUser.png?raw=true" alt="verifyUser" width="700">

* **Route**:    *`POST`* `/resend`
* **Description**:     Resend Verification Email
* **Access**:   Public
* **Request Body**: 
```javascript
    {
        email: string
    }
```
* **Response Body**:
```javascript
    {
        message: string
    }
```
<img src="/public/images/postman/resendVerificationEmail.png?raw=true" alt="resendVerificationEmail" width="700">

### User Routes
* **Route**:   *`GET`* `/users/me`
* **Description**:    Read profile of currently authenticated user
* **Access**:  Private
* **Request Body**:
    `null` 
* **Response Body**: 
```javascript
    {
        user: {
            isVerified,
            _id: string,
            firstName: string,
            lastName: string,
            email: string,
            createdAt: date,
            updatedAt: date
        },
        token: string
    }
```
<img src="/public/images/postman/readProfile.png?raw=true" alt="readProfile" width="700">

* **Route**:   *`PATCH`* `/users/me`
* **Description**:    Update profile of currently authenticated user
* **Access**:  Private
* **Request Body**:
```javascript
    {
        email: string,
        password: string,
        firstName: string,
        lastName: string
    }
```
* **Response Body**:
```javascript
    {
        user: {
            isVerified,
            _id: string,
            firstName: string,
            lastName: string,
            email: string,
            createdAt: date,
            updatedAt: date
        },
        token: string
    }
```
<img src="/public/images/postman/updateUser.png?raw=true" alt="updateUser" width="700">

* **Route**:   *`DELETE`* `/users/me`
* **Description**:    Delete profile of currently authenticated user
* **Access**:  Private
* **Request Body**: 
    `null`
* **Response Body**:
```javascript
    {
        user: {
            isVerified,
            _id: string,
            firstName: string,
            lastName: string,
            email: string,
            createdAt: date,
            updatedAt: date
        },
        token: string
    }
```
<img src="/public/images/postman/deleteUser.png?raw=true" alt="deleteUser" width="700">

### Password Reset Routes
* **Route**:    *`POST`* `/auth/recover`
* **Description**:     Recover Password - Generate password reset token and send password reset email
* **Access**:   Public
* **Request Body**:
```javascript
    {
        email: string
    }
```
* **Response Body**:
```javascript
    {
        message: string
    }
```
<img src="/public/images/postman/recoverPassword.png?raw=true" alt="recoverPassword" width="700">

* **Route**:    *`GET`* `/auth/reset/:token`
* **Description**:     Validate password reset token and show the password reset view
* **Access**:   Public
* **Params**:   `token=[string]`
* **Response Body**:
    `null`   

<img src="/public/images/postman/getPasswordResetView.png?raw=true" alt="getPasswordResetView" width="700">

* **Route**:    *`POST`* `/auth/reset/:token`
* **Description**:     Confirm and reset password
* **Access**:   Public
* **Params**:   `token=[string]`
* **Request Body**: 
```javascript
    {
        password: string
    }
```
* **Response Body**:
```javascript
    {
        message: string
    }
```
<img src="/public/images/postman/confirmPassword.png?raw=true" alt="confirmPassword" width="700">

### Plaid API Routes
* **Route**:    *`POST`* `/link/token/create`
* **Description**:     Create link token and send back to client 
* **Access**:   Private
* **Request Body**: 
    `null`
* **Response Body**:
```javascript
    {
        link_token: string
    }
```
<img src="/public/images/postman/createLinkToken.png?raw=true" alt="createLinkToken" width="700">

* **Route**:    *`POST`* `/item/public_token/exchange`
* **Description**:     Trade public token for access token, add institution to db to store access token, use the access token to fetch the institution's accounts, and add the accounts to db
* **Access**:   Private
* **Request Body**:
```javascript
    {
        institution: {
            name: string,
            institution_id: string
        },
        account_id: string,
        account: {
            id: string,
            name: string,
            type: string,
            subtype: string,
            mask: string
        },
        accounts: [
            {
                id: string,
                mask: string,
                name: string,
                subtype: string,
                type: string 
            }
        ],
        link_session_id: string,
        public_token: string
    }
``` 
* **Response Body**:
```javascript
    {
        _id: string,
        ownerId: string,
        accountId: string,
        accessToken: string,
        balances: {
            available: number,
            current: number,
            iso_currency_code: string,
            limit: number,
            unofficial_currency_code: string
        },
        mask: number,
        name: string,
        officialName: string,
        accountType: string,
        accountSubtype: string,
        institutionId: string,
        institutionName: string,
        itemId: string
    }
```

* **Route**:    *`POST`* `/transactions/get`
* **Description**:     Fetch transactions from past 30 days from all linked financial institution bank accounts using Plaid API
* **Access**:   Private
* **Request Body**:
```javascript
    [
        {
            ownerId: string,
            accessToken: string,
            itemId: string,
            institutionId: string,
            institutionName: string
        }
    ]
```
* **Response Body**:
```javascript
    [
        {
            accountName: string,
            transactions: [
                {
                    account_id: string,
                    account_owner: string,
                    amount: number,
                    authorized_date: date,
                    authorized_datetime: date,
                    category: [ string ],
                    category_id: number,
                    date: date,
                    datetime: time,
                    iso_currency_code: USD,
                    location: {
                        address: string,
                        city: string,
                        country: string,
                        lat: string,
                        lon: string,
                        postal_code: number,
                        region: number,
                        store_number: number
                    },
                    merchant_name: string,
                    name: string,
                    payment_channel: string,
                    payment_meta: {
                        by_order_of: string,
                        payee: string,
                        payer: string,
                        payment_method: string,
                        payment_processor: string,
                        ppd_id: string,
                        reason: string,
                        reference_number: number
                    },
                    pending: boolean,
                    pending_transaction_id: string,
                    transaction_code: number,
                    transaction_id: string,
                    transaction_type: string,
                    unofficial_currency_code: string
                }
            ]
        }
    ]
```
<img src="/public/images/postman/getPlaidTransactions.png?raw=true" alt="getPlaidTransactions" width="700">

* **Route**:    *`GET`* `/acounts/balance/get`
* **Description**:     Get real-time balance of all linked bank accounts using Plaid API
* **Access**:   Private
* **Request Body**:
```javascript
    [
        {
            _id: string,
            ownerId: string,
            plaidInstitutionId: string,
            name: string,
            accessToken: string
            itemId: string
        }
    ]

```
* **Response Body**:
```javascript
    [
        {
            _id: string,
            ownerId: string,
            accountId: string,
            accessToken: string,
            balances: {
                available: number,
                current: number,
                iso_currency_code: string,
                limit: number,
                unofficial_currency_code: string
            },
            mask: number,
            name: string,
            officialName: string,
            accountType: string,
            accountSubtype: string,
            institutionId: string,
            institutionName: string,
            itemId: string
        }
    ]
``` 
<img src="/public/images/postman/getRealtimeAccountBalances.png?raw=true" alt="getRealtimeAccountBalances" width="700">

### Account Routes
* **Route**:    *`GET`* `/institutions`
* **Description**:     Get all of the currently authenticated user's linked institutions
* **Access**:   Private
* **Request Body**:
    `null`
* **Response Body**:
```javascript
    [
        {
            _id: string,
            ownerId: string,
            institutionId: string,
            name: string,
            accessToken: string
            itemId: string
        }
    ]
``` 
<img src="/public/images/postman/getLinkedInstitutions.png?raw=true" alt="getLinkedInstitutions" width="700">

* **Route**:    *`DELETE` `/institution/:id`
* **Description**:     Delete a specific linked institution and all of its' accounts
* **Access**:   Private
* **Params**: `id={string}`
* **Request Body**:
    `null`
* **Response Body**:
```javascript
    {
        success: boolean
    }
```
<img src="/public/images/postman/deleteLinkedInstitution.png?raw=true" alt="deleteLinkedInstitution" width="700">

* **Route**:    *`GET`* `/accounts` 
* **Description**:     Get all of the currently authenticated user's linked accounts
* **Access**:   Private
* **Request Body**:
    `null`
* **Response Body**:
```javascript
    [
        {
            _id: string,
            ownerId: string,
            accountId: string,
            accessToken: string,
            balances: {
                available: number,
                current: number,
                iso_currency_code: string,
                limit: number,
                unofficial_currency_code: string
            },
            mask: number,
            name: string,
            officialName: string,
            accountType: string,
            accountSubtype: string,
            institutionId: string,
            institutionName: string,
            itemId: string
        }
    ]
``` 
<img src="/public/images/postman/getAccounts.png?raw=true" alt="getAccounts" width="700">

* **Route**:    *`DELETE`* `/accounts/:id`
* **Description**:     Delete a specific account
* **Access**:   Private
* **Params**:   `id = [string]`
* **Response Body**:
```javascript
    {
        success: true
    }
```
<img src="/public/images/postman/deleteAccount.png?raw=true" alt="deleteAccount" width="700">

### Cash Transaction Routes
* **Route**:   *`POST`* `/transactions`
* **Description**:    Create transaction for currently authenticated user
* **Access**:  Private
* **Request Body**:  
```javascript
    {
        description: string,
        amount: number,
        date: date,
        type: string
    }
```
* **Response Body**:
```javascript
    {
        ownerId: string,
        description: string,
        amount: number,
        date: date,
        type: string
    }
```
<img src="/public/images/postman/createCashTransaction.png?raw=true" alt="createCashTransaction" width="700">

* **Route**:   *`GET`* `/transactions`
* **Description**:    Retrieve transactions for currently authenticated user
* **Access**:  Private
* **Query**:   
```javascript
    {
        category: string,
        text: string,
        limit: number,
        sortBy: string,
    }
```
* **Response Body**:
```javascript
    [
        {
            ownerId: string,
            description: string,
            amount: number,
            date: date,
            type: string
        }
    ]
```
<img src="/public/images/postman/getCashTransactions1.png?raw=true" alt="getCashTransactions1" width="700">

<img src="/public/images/postman/getCashTransactions2.png?raw=true" alt="getCashTransactions2" width="700">

* **Route**:   *`GET`* `/transactions/:id`
* **Description**:    Retrieve transaction if transaction belongs to currently authenticated user
* **Access**:  Private
* **Params**:   `id = [string]`
* **Response Body**:
```javascript
    {
        ownerId: string,
        description: string,
        amount: number,
        date: date,
        type: string
    }
```
<img src="/public/images/postman/getCashTransaction.png?raw=true" alt="getCashTransaction" width="700">

* **Route**:   *`PATCH`* `/transactions/:id`
* **Description**:    Update transaction if transaction belongs to currently authenticated user
* **Access**:  Private
* **Params**:   `id = [string]`
* **Response Body**:
```javascript
    {
        ownerId: string,
        description: string,
        amount: number,
        date: date,
        type: string
    }
```
<img src="/public/images/postman/updateCashTransaction.png?raw=true" alt="updateCashTransaction" width="700">

* **Route**:   *`DELETE`* `/transactions/:id`
* **Description**:    Delete transaction if transaction belongs to currently authenticated user
* **Access**:  Private
* **Params**:   `id = [string]`
* **Response Body**:
```javascript
    {
        ownerId: string,
        description: string,
        amount: number,
        date: date,
        type: string
    }
```
<img src="/public/images/postman/deleteCashTransaction.png?raw=true" alt="deleteCashTransaction" width="700">