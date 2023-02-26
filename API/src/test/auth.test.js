// require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const { default: mongoose } = require('mongoose')
const expect = require('chai').expect

const server = require('../app')
const request = require('supertest'),
    app = request.agent(server)

// const TestToken = require('../models/test_token.models')
const { User, Status } = require('../models/user.models')
const { AuthCode, TestAuthToken } = require('../models/token.models')


describe('User Authentication for Signup, Email verification, login and password reset', () => {
    // Clear the test database before running tests
    before(async () => {
        await mongoose.connection.dropDatabase()
    })

    beforeEach(async () => {
        signup_data = {
            firstname: "testfirstname",
            lastname: "testlastname",
            email: "testemail@gmail.com",
            phonenumber: "132434432324",
            password: "testpassword",
            passwordConfirm: "testpassword",
            role: "EndUser"
        }

        login_data = {
            email: "testemail@gmail.com",
            password: "testpassword"
        }
    })

    describe('POST /signup', () => {
        const url = '/api/v1/auth/signup'
        beforeEach(() => {
        })

        it('should return status code 400 for missing parameter in request body', async () => {
            /*
             Should return BadRequestError (400) for request 
             without complete required fields in request body
             */

            signup_data.firstname = null

            // Send signup request to API
            const res = await app.post(url).send(signup_data)

            // Response status code should match BadRequest (400)
            const response_statuscode = res.statusCode
            expect(response_statuscode).to.equal(400)

            // message property should exist in request body
            // message should include 'Path is required, Try again'
            const request_message = res.body.message
            expect(request_message).to.be.a('string').to.include("Path")
            expect(request_message).to.be.a('string').to.include("is required")
            expect(request_message).to.be.a('string').to.include("Try again")
        })

        it('should return status code 400 for invalid email format', async () => {
            /*
             Should test for format for email in request body
             */

            signup_data.email = 'testemail@'

            // Send signup request
            const res = await app.post(url).send(signup_data)

            // Response status code should equal 400 for BadRequest
            const response_statuscode = res.statusCode
            expect(response_statuscode).to.equal(400)

            // Response body should have a message property
            const response_body = res.body
            expect(response_body).to.have.property('message')

            // message should equal - Please provide a valid email, Try again
            const message = res.body.message
            expect(message).to.be.a('string').to.equal('Please Provide a valid Email, Try again')
        })

        it('should return statuscode 200 for successful signup', async () => {
            /*
             Should test for successuful signup request

             - check statuscode
             - check response body and it's properties
             - ensure necessary user data are present in response body
             */

            const res = await app.post(url).send(signup_data)
            expect(res.statusCode).to.equal(200)

            const request_body = res.body
            expect(request_body).to.be.a('object')
            expect(request_body).to.have.property('success').to.equal(true)
            expect(request_body).to.have.property('data').to.be.a('object')

            const data = res.body.data
            expect(data).to.have.property('user').to.be.a('object')

            const user_data = data.user
            expect(user_data).to.have.property('firstname').to.be.a('string').to.equal(signup_data.firstname)
            expect(user_data).to.have.property('lastname').to.be.a('string').to.equal(signup_data.lastname)
            expect(user_data).to.have.property('email').to.be.a('string').to.equal(signup_data.email)
            expect(user_data).to.have.property('role').to.be.a('string').to.equal(signup_data.role)

        })

        it('should return status code 400 for duplicate signup', async () => {
            /*
             Should return BadRequestError (400) for duplicate signup request
             without complete required fields in request body

             - check statusCode, should be equal to 400
             - check response message
             */

            const res = await app.post(url).send(signup_data)
            expect(res.statusCode).to.equal(400)
            expect(res.body).to.be.a('object')

            expect(res.body.message).to.be.a('string').to.include('User account exists already, verification mail sent to user')
        })
    })

    describe('POST /login', () => {
        const url = '/api/v1/auth/login'
        let user;

        it('should return status code 400 for missing parameter in request body', async () => {
            /*
             Should return BadRequestError (400) for request 
             without complete required fields in request body
             */

            // Send login request
            const res = await app.post(url).send({ email: login_data.email })

            // Status code for api resposne should be 400 for BadRequest
            const response_statuscode = res.statusCode
            expect(response_statuscode).to.equal(400)

            // Request body should have a message property
            const response_body = res.body
            expect(response_body).to.have.a.property('message')

            // Message should equal 'Please provide email and
            const message = response_body.message
            expect(message).to.be.a('string').to.equal("Please provide email and password")
        })

        it('should return status code 400 for invalid login credentials', async () => {
            /*
             Should return BadRequestError (400) for request 
             login request with invalid credentials

             - check status code
             - check messgae property in response body
             */
            const res = await app.post(url).send(
                {
                    email: login_data.email,
                    password: 'thisisnotthecorrectpassword'
                })

            expect(res.statusCode).to.equal(400)
            expect(res.body.message).to.be.a('string').to.equal('Incorrect email or password')
        })

        it('should return status code 400 for unverified user', async () => {
            /*
             Should return BadRequestError (400) for login request
             from an unverified user
             
             - check statuscode
             - check message property in response body
             */
            await app.post('/api/v1/auth/signup').send(signup_data)
            const res = await app.post(url).send(login_data)

            expect(res.statusCode).to.equal(400)
            expect(res.body).to.have.a.property('message').to.be.a('string').to.equal('Please verify your email')
        })

        it('should return status code 200 for successful login', async () => {
            /*
             Should return 200 for successful login request
             
             - check statuscode
             - check message property in response body
             - check for JWT authentication tokens in response body
             - check for users data in response body
             */
            const user_data = await User.findOne({ email: login_data.email }).populate('status')
            user_data.status.isVerified = true
            await user_data.status.save()

            const res = await app.post(url).send(login_data)

            expect(res.body).to.have.a.property('success').to.be.a('boolean').to.equal(true)
            expect(res.statusCode).to.equal(200)

            expect(res.body).to.have.a.property('data').to.be.a('object')
            expect(res.body.data).to.have.a.property('access_token').to.be.a('string')
            expect(res.body.data).to.have.a.property('refresh_token').to.be.a('string')
            expect(res.body.data).to.have.a.property('user').to.be.a('object')
            expect(res.body.data.user).to.have.a.property('firstname').to.be.a('string').to.equal(signup_data.firstname)
            expect(res.body.data.user).to.have.a.property('lastname').to.be.a('string').to.equal(signup_data.lastname)
            expect(res.body.data.user).to.have.a.property('email').to.be.a('string').to.equal(signup_data.email)
            expect(res.body.data.user).to.have.a.property('role').to.be.a('string').to.equal(signup_data.role)
        })

    })

    let JWT_password_reset;
    describe('POST /forgotPassword', () => {
        const url = '/api/v1/auth/forgotPassword'
        let user;

        it('should return status code 400 for none matching user email', async () => {
            /*
             Should return BadRequestError (400) for request 
             made with non existing users email
             
             - check statuscode
             - check message property in response body
             */
            const res = await app.post(url).send({ email: "thisisthewrongemail" })

            expect(res.statusCode).to.equal(400)
            expect(res.body.message).to.be.a('string').to.equal("User does not exist")
        })

        it('should return status code 200 for successful forgot password request', async () => {
            /*
             Should return 200 for successful forgot password request
             
             - check statuscode
             - check message property in response body
             */
            const res = await app.post(url).send(login_data)

            expect(res.statusCode).to.equal(200)
            expect(res.body.data.message).to.be.a('string').to.equal("Successful, Password reset code sent to users email")
            expect(res.body.data).to.have.property('access_token').to.be.a('string')

            JWT_password_reset = res.body.data.access_token
        })
    })

    describe('PATCH /resetpassword', async () => {
        let url;
        before(() => {
            new_password = 'thisisthenewpassword'
        })

        it("should return status 400 invalid or missing password reset code", async () => {
            /*
             Should return 400 for missing required field in request body
             
             - check statuscode
             - check message property in response body
             */
            url = '/api/v1/auth/resetpassword/'
            const res = await app.patch(url)
                .send(
                    {
                        password_reset_code: '000000000',
                        new_password: 'newpassword'
                    })
                .set('Authorization', `Bearer ${JWT_password_reset}`)

            expect(res.statusCode).to.equal(400)
            expect(res.body).to.have.property('message').to.equal('Invalid password reset code')
        })

        it("should return status 200 for successful password reset", async () => {
            /*
             Should return 200 for successful password request
             
             - check statuscode
             - check message property in response body
             */
            const user = await User.findOne({ email: login_data.email }).populate('auth_codes')
            expect(user).to.have.property('auth_codes').to.be.a('object')

            const password_reset_code = user.auth_codes.password_reset_code
            expect(password_reset_code).to.be.a('string')


            url = '/api/v1/auth/resetpassword'
            const res = await app.patch(url)
                .send(
                    {
                        password_reset_code,
                        new_password
                    })
                .set('Authorization', `Bearer ${JWT_password_reset}`)

            expect(res.statusCode).to.equal(200)
            expect(res.body).to.have.property('success').to.equal(true)
        })

        it('should return status code 200 for successful login with new password', async () => {
            /*
             Should return 200 for successful login request
             
             - check statuscode
             - check if new password works
             - check message property in response body
             - check for JWT authentication tokens in response body
             - check for users data in response body
             */

            const res = await app.post('/api/v1/auth/login').send({ email: login_data.email, password: new_password })

            expect(res.body).to.have.a.property('success').to.be.a('boolean').to.equal(true)
            expect(res.statusCode).to.equal(200)

            expect(res.body).to.have.a.property('data').to.be.a('object')
            expect(res.body.data).to.have.a.property('access_token').to.be.a('string')
            expect(res.body.data).to.have.a.property('refresh_token').to.be.a('string')

            expect(res.body.data).to.have.a.property('user').to.be.a('object')
            expect(res.body.data.user).to.have.a.property('firstname').to.be.a('string').to.equal(signup_data.firstname)
            expect(res.body.data.user).to.have.a.property('lastname').to.be.a('string').to.equal(signup_data.lastname)
            expect(res.body.data.user).to.have.a.property('email').to.be.a('string').to.equal(signup_data.email)
            expect(res.body.data.user).to.have.a.property('role').to.be.a('string').to.equal(signup_data.role)
        })
    })

    describe('Auth Middleware', () => {
        let url = '/api/v1/course';
        let token;

        before(async () => {
            end_user_signup_data = {
                firstname: 'End',
                lastname: 'User',
                email: 'endusertestemail@moocs.com',
                password: 'thisisthepassword',
                passwordConfirm: 'thisisthepassword',
                role: 'EndUser'
            }

            admin_signup_data = {
                firstname: 'Admin',
                lastname: 'User',
                email: 'admintestemail@moocs.com',
                password: 'thisisthepassword',
                passwordConfirm: 'thisisthepassword',
                role: 'Admin'
            }

            // Create End User
            const end_user = await app.post('/api/v1/auth/signup').send(end_user_signup_data)
            expect(end_user.statusCode).to.equal(200)

            // Create Admin User
            const admin = await app.post('/api/v1/auth/signup').send(admin_signup_data)
            expect(admin.statusCode).to.equal(200)

            // Verify accounts
            const end_user_doc = await User.findOne({ email: end_user_signup_data.email }).populate('status')
            await end_user_doc.status.update({ isVerified: true, isActive: true })

            const admin_doc = await User.findOne({ email: admin_signup_data.email }).populate('status')
            await admin_doc.status.update({ isVerified: true, isActive: true })

            // Login End User
            const end_user_login = await app.post('/api/v1/auth/login').send(end_user_signup_data)
            expect(end_user_login.statusCode).to.equal(200)
            expect(end_user_login.body.data).to.have.a.property('access_token').to.be.a('string')
            expect(end_user_login.body).to.have.a.property('success').to.be.a('boolean').to.equal(true)

            // Login Admin User
            const admin_login = await app.post('/api/v1/auth/login').send(admin_signup_data)
            expect(admin_login.statusCode).to.equal(200)
            expect(admin_login.body.data).to.have.a.property('access_token').to.be.a('string')
            expect(admin_login.body).to.have.a.property('success').to.be.a('boolean').to.equal(true)

            // Set End User Token
            end_user_token = end_user_login.body.data.access_token

            // Set Admin User Token
            admin_token = admin_login.body.data.access_token

            expect(end_user_token).to.be.a('string')
            expect(admin_token).to.be.a('string')
        })

        it('should return status code 401 for no access token', async () => {
            const res = await app.delete('/api/v1/course/delete/null')

            expect(res.statusCode).to.equal(401)
            expect(res.body).to.have.a.property('message').to.be.a('string').to.equal('Invalid authorization header')
        })

    })

    describe('GET /verify', async () => {
        let url = '/api/v1/auth/verifyemail/'
        let user, bearer_token, ver_token;

        beforeEach(() => {
            user_email = 'testemail@gmail.com'
            signup_data = {
                firstname: "testfirstname",
                lastname: "testlastname",
                email: "testemail@gmail.com",
                phonenumber: "132434432324",
                password: "testpassword",
                role: "EndUser"
            }
        })

        it('should return status code 400 for wrong auth token in request params', async () => {
            /*
             Should return 400 for wrong auth token in request params
             
             - check statuscode
             - check message property in response body
             */
            const wrong_url = url + 'sdfasdf'
            const res = await app.get(wrong_url)

            expect(res.statusCode).to.equal(401)
            expect(res.body.message).to.be.a('string').to.equal("Invalid authentication token")
        })

        it('should return status code 200 for successful email verification', async () => {
            /*
             Should return 200 for successful email verification request
             
             - check statuscode
             - check message property in response body
             */
            user = await User.findOne({ email: user_email })
            let user_token = await TestAuthToken.findOne({ user: user._id })
            url += `${user_token.access_token}`

            const res = await app.get(url)

            expect(res.statusCode).to.equal(200)
            expect(res.body.message).to.be.a('string').to.equal("Email verified")

        })

        it('should return status code 401 for already used access token', async () => {
            /*
             Should return 401 for  already used access token
             
             - check statuscode
             - check message property in response body
             */
            const res = await app.get(url)

            expect(res.statusCode).to.equal(401)
            expect(res.body.message).to.be.a('string').to.equal("Token Invalid or Token Expired, Request for a new verification token")
        })
    })
})
