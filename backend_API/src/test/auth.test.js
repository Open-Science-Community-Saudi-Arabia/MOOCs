require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const { default: mongoose } = require('mongoose')
const expect = require('chai').expect

const server = require('../app')
const request = require('supertest'),
    app = request.agent(server)

const TestToken = require('../models/test_token.models')
const User = require('../models/user.models')



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
            signup_data.firstname = null
            const res = await app.post(url).send(signup_data)
            expect(res.statusCode).to.equal(400)
            expect(res.body.message).to.be.a('string').to.include("Path")
            expect(res.body.message).to.be.a('string').to.include("is required")
            expect(res.body.message).to.be.a('string').to.include("Try again")
        })

        it('should return status code 400 for invalid email format', async () => {
            signup_data.email = 'testemail@'
            const res = await app.post(url).send(signup_data)

            expect(res.statusCode).to.equal(400)
            expect(res.body.message).to.be.a('string').to.equal('Please Provide a valid Email, Try again')
        })

        it('should return statuscode 200 for successful signup', async () => {
            const res = await app.post(url).send(signup_data)
            expect(res.statusCode).to.equal(200)
            expect(res.body).to.be.a('object')
            expect(res.body).to.have.property('token').to.be.a('string')

            expect(res.body).to.have.property('data').to.be.a('object')
            const data = res.body.data

            expect(data).to.have.property('user').to.be.a('object')
            expect(data.user).to.have.property('firstname').to.be.a('string').to.equal(signup_data.firstname)
            expect(data.user).to.have.property('lastname').to.be.a('string').to.equal(signup_data.lastname)
            expect(data.user).to.have.property('email').to.be.a('string').to.equal(signup_data.email)
            expect(data.user).to.have.property('role').to.be.a('string').to.equal(signup_data.role)
            expect(res.body.status).to.be.a('string').to.equal('success')
        })

        it('should return status code 400 for duplicate signup', async () => {
            const res = await app.post(url).send(signup_data)
            expect(res.statusCode).to.equal(400)
            expect(res.body).to.be.a('object')

            expect(res.body.message).to.be.a('string').to.include('already exists please user another email')
        })
    })

    describe('POST /login', () => {
        const url = '/api/v1/auth/login'
        let user;

        it('should return status code 400 for missing parameter in request body', async () => {
            const res = await app.post(url).send({ email: login_data.email })

            expect(res.statusCode).to.equal(400)
            expect(res.body.message).to.be.a('string').to.equal("Please Provide Email and Password")
        })

        it('should return status code 400 for invalid login credentials', async () => {
            const res = await app.post(url).send({ email: login_data.email, password: 'thisisnotthecorrectpassword' })

            expect(res.statusCode).to.equal(400)
            expect(res.body.message).to.be.a('string').to.equal('Incorrect Email or Password')
        })


        it('should return status code 200 for successful login', async () => {
            await app.post('/api/v1/auth/signup').send(signup_data)
            const res = await app.post(url).send(login_data)

            expect(res.body).to.have.a.property('token').to.be.a('string')
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('success')
            expect(res.statusCode).to.equal(200)

            expect(res.body).to.have.a.property('data').to.be.a('object')
            expect(res.body.data).to.have.a.property('user').to.be.a('object')
            expect(res.body.data.user).to.have.a.property('firstname').to.be.a('string').to.equal(signup_data.firstname)
            expect(res.body.data.user).to.have.a.property('lastname').to.be.a('string').to.equal(signup_data.lastname)
            expect(res.body.data.user).to.have.a.property('email').to.be.a('string').to.equal(signup_data.email)
            expect(res.body.data.user).to.have.a.property('role').to.be.a('string').to.equal(signup_data.role)
        })

    })

    describe('POST /forgotPassword', () => {
        const url = '/api/v1/auth/forgotPassword'
        let user;

        it('should return status code 404 for none matching user email', async () => {
            const res = await app.post(url).send({ email: "thisisthewrongemail" })

            expect(res.statusCode).to.equal(404)
            expect(res.body.message).to.be.a('string').to.equal("No User Found With That Email")
        })

        it('should return status code 200 for successful forgot password request', async () => {
            const res = await app.post(url).send(login_data)

            expect(res.statusCode).to.equal(200)
            expect(res.body.message).to.be.a('string').to.equal("Token sent to email")
        })

        it("test token collection should have record of unhashed token", async () => {
            const user = await User.findOne({ email: login_data.email })
            const token = await TestToken.findOne({ user: user._id })

            expect(token).to.be.a('object')
            expect(token).to.have.property('password_reset').to.be.a('string').not.to.equal(null)
        })
    })

    describe('PATCH /resetpassword/:token', async () => {
        let url;
        before(() => {
            new_password = 'thisisthenewpassword'
        })

        it("should return status 404 invalid or missing password reset token", async () => {
            url = '/api/v1/auth/resetpassword/' + 'thisisnotthevalidtoken'
            const res = await app.patch(url)

            expect(res.statusCode).to.equal(404)
            expect(res.body).to.have.property('message').to.equal('Token Invalid or Token Expired, Request for a new reset token')
        })

        it("should return status 200 for successful password reset", async () => {
            const user = await User.findOne({ email: login_data.email })

            expect(user).to.have.property('passwordResetToken')
            expect(user.passwordResetToken).not.to.equal(undefined)
            expect(user.passwordResetToken).to.be.a('string')

            const test_token = await TestToken.findOne({ user: user._id })
            expect(test_token).to.be.a('object')
            expect(test_token).to.have.property('password_reset').to.be.a('string').not.to.equal(null)

            const token = test_token.password_reset

            url = '/api/v1/auth/resetpassword/' + token
            const res = await app.patch(url).send({ password: new_password })

            expect(res.statusCode).to.equal(200)
            expect(res.body).to.have.property('status').to.equal('success')
        })

        it('should return status code 200 for successful login with new password', async () => {
            const res = await app.post('/api/v1/auth/login').send({ email: login_data.email, password: new_password })

            expect(res.body).to.have.a.property('token').to.be.a('string')
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('success')
            expect(res.statusCode).to.equal(200)

            expect(res.body).to.have.a.property('data').to.be.a('object')
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

            // Login End User
            const end_user_login = await app.post('/api/v1/auth/login').send(end_user_signup_data)
            expect(end_user_login.statusCode).to.equal(200)
            expect(end_user_login.body).to.have.a.property('token').to.be.a('string')
            expect(end_user_login.body).to.have.a.property('status').to.be.a('string').to.equal('success')

            // Login Admin User
            const admin_login = await app.post('/api/v1/auth/login').send(admin_signup_data)
            expect(admin_login.statusCode).to.equal(200)
            expect(admin_login.body).to.have.a.property('token').to.be.a('string')
            expect(admin_login.body).to.have.a.property('status').to.be.a('string').to.equal('success')

            // Set End User Token
            end_user_token = end_user_login.body.token

            // Set Admin User Token
            admin_token = admin_login.body.token

            expect(end_user_token).to.be.a('string')
            expect(admin_token).to.be.a('string')
        })

        it('should return status code 401 for no access token', async () => {
            const res = await app.delete('/api/v1/course/delete-course/null')

            expect(res.statusCode).to.equal(403)
            expect(res.body).to.have.a.property('message').to.be.a('string').to.equal('Unauthenticated, Please Login')
        })

    })
    // describe('POST /verify', () => {
    //     const url = '/api/v1/auth/verify'
    //     let user, bearer_token, ver_token;

    //     beforeEach(() => {
    //         user_email = 'testemail@gmail.com'
    //         signup_data = {
    //             firstname: "testfirstname",
    //             lastname: "testlastname",
    //             email: "testemail@gmail.com",
    //             phonenumber: "132434432324",
    //             password: "testpassword",
    //             role: "EndUser"
    //         }
    //     })

    //     it('should return status code 400 for Missing required parameter in request body', async () => {
    //         const res = await app.post(url)

    //         expect(res.statusCode).to.equal(400)
    //         expect(res.body.message).to.be.a('string').to.equal("Missing required parameter: Validation failed")
    //     })

    //     it('should return status code 401 for no Bearer Token in authorization header', async () => {
    //         const res = await app.post(url).send({ verification_token: '12323' })

    //         expect(res.statusCode).to.equal(401)
    //         expect(res.body.message).to.be.a('string').to.equal("Authentication invalid")
    //     })

    //     it('should return status code 401 for expired authorization JWT token', async () => {
    //         bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI3NDFiODc1MGVmMzc0YzJhNWE1NzYiLCJlbWFpbCI6ImJvYXlhbnRlbmR1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJFbmRVc2VyIiwicmVzZXRfdG9rZW4iOm51bGwsImlhdCI6MTY2MzcyOTIyMCwiZXhwIjoxNjYzNzM2NDIwfQ.w-i1fhLiOhWCvvVamdQRww-euf5XYRizkVUEIxhj3O0"
    //         const res = await app.post(url).send({ verification_token: '12323' }).set("Authorization", `Bearer ${bearer_token}`)

    //         expect(res.statusCode).to.equal(401)
    //         expect(res.body.message).to.be.a('string').to.equal("JWT Token expired")
    //     })

    //     it('should return status code 400 for wrong verification code', async () => {
    //         bearer_token = await app.post('/api/v1/auth/signup').send(signup_data).then((response) => { return response.body.access_token })
    //         user = await User.findOne({ email: signup_data.email })

    //         const res = await app.post(url).send({ verification_token: 'thisisnottheverificationtoken' }).set("Authorization", `Bearer ${bearer_token}`)

    //         expect(res.statusCode).to.equal(400)
    //         expect(res.body.message).to.be.a('string').to.equal("Invalid verification code")
    //     })

    //     it('should return status code 200 for successful email verification', async () => {
    //         ver_token = await Token.findOne({ user })

    //         const res = await app.post(url).send({ verification_token: ver_token.verification }).set("Authorization", `Bearer ${bearer_token}`)

    //         expect(bearer_token).to.be.a('string')

    //         expect(res.statusCode).to.equal(200)
    //         expect(res.body.message).to.be.a('string').to.equal("Successful")

    //     })

    //     it('should return status code 401 for already used access token', async () => {
    //         const res = await app.post(url).send({ verification_token: ver_token.verification }).set("Authorization", `Bearer ${bearer_token}`)


    //         expect(res.statusCode).to.equal(401)
    //         expect(res.body.message).to.be.a('string').to.equal("JWT token expired")
    //     })


    // })



    // describe('PUT /password ', () => {
    //     const url = "/api/v1/auth/password/reset"
    //     let user, access_token;

    //     beforeEach(() => {
    //         signup_data = {
    //             firstname: "testfirstname",
    //             lastname: "testlastname",
    //             email: "testemail@gmail.com",
    //             phonenumber: "132434432324",
    //             password: "testpassword",
    //             role: "EndUser"
    //         }

    //         login_data = {
    //             email: "testemail@gmail.com",
    //             password: "testpassword"
    //         }
    //     })

    //     describe('PUT /password/reset', () => {
    //         it('should return status code 400 for non existing account', async () => {
    //             const res = await app.post(url).send({ email: 'noexistingaccount@test.com' })

    //             expect(res.statusCode).to.equal(400)
    //             expect(res.body.message).to.be.a('string').to.equal("User does not exist")
    //         })

    //         it('should return status code 201 for successful password reset request', async () => {
    //             user = await User.findOne({ email: signup_data.email })
    //             await Status.findOneAndUpdate({ user }, { isVerified: true, isActive: true })

    //             const res = await app.post(url).send({ email: login_data.email })

    //             expect(res.statusCode).to.equal(201)
    //             expect(res.body).to.have.a.property('access_token').to.be.a('string')


    //             access_token = res.body.access_token
    //             expect(res.body.message).to.be.a('string').to.equal('Successful, Password reset code sent to user email')
    //         })
    //     })

    //     describe('PUT /password/confirmtoken', () => {
    //         beforeEach(() => {
    //             bearer_token = access_token
    //         })

    //         const url = '/api/v1/auth/password/confirmtoken'
    //         let new_password = 'thisisthenewpassword'

    //         it('should return status code 401 for no Bearer Token in authorization header', async () => {
    //             const res = await app.put(url)

    //             expect(res.statusCode).to.equal(401)
    //             expect(res.body.message).to.be.a('string').to.equal('Authentication required')
    //         })

    //         it('should return status code 401 for expired authorization JWT token', async () => {
    //             bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI3NDFiODc1MGVmMzc0YzJhNWE1NzYiLCJlbWFpbCI6ImJvYXlhbnRlbmR1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJFbmRVc2VyIiwicmVzZXRfdG9rZW4iOm51bGwsImlhdCI6MTY2MzcyOTIyMCwiZXhwIjoxNjYzNzM2NDIwfQ.w-i1fhLiOhWCvvVamdQRww-euf5XYRizkVUEIxhj3O0"
    //             const res = await app.put(url).set("Authorization", `Bearer ${bearer_token}`)

    //             expect(res.statusCode).to.equal(401)
    //             expect(res.body.message).to.be.a('string').to.equal('JWT Token expired')
    //         })

    //         it('should return status code 400 for Missing required parameter in request body', async () => {
    //             const res = await app.put(url).set('Authorization', `Bearer ${bearer_token}`)

    //             expect(res.statusCode).to.equal(400)
    //             expect(res.body.message).to.be.a('string').to.equal("Missing required parameter: Validation failed")
    //         })

    //         it('should return status code 400 for invalid reset token', async () => {
    //             const res = await app.put(url).send({ reset_token: "thisisthewrongresettoken", password: new_password }).set("Authorization", `Bearer ${bearer_token}`)

    //             expect(res.statusCode).to.equal(400)
    //             expect(res.body.message).to.be.a('string').to.equal('Reset token is invalid')
    //         })
    //         it('should return status code 200 for successful password reset', async () => {
    //             const reset_token = await Token.findOne({ user })
    //             const res = await app.put(url).send({ reset_token: reset_token.password_reset, password: new_password }).set("Authorization", `Bearer ${bearer_token}`)

    //             expect(res.statusCode).to.equal(200)
    //             expect(res.body.message).to.be.a('string').to.equal('Successful Password Reset')
    //         })
    //         it('should return status code 200 for successful login with new password', async () => {
    //             const res = await app.post('/api/v1/auth/login').send({ email: login_data.email, password: new_password }).then((response) => { return response }, (error) => { console.log(error); return error })
    //             expect(res.statusCode).to.equal(200)
    //             expect(res.body).to.have.a.property('access_token').to.be.a('string')
    //             expect(res.body).to.have.a.property('refresh_token').to.be.a('string')

    //             expect(res.body.message).to.be.a('string').to.equal("Successful")
    //         })
    //     })
    // })
})
