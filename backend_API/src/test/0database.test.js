require('dotenv').config({ path: `./src/.env.${process.env.NODE_ENV}` })

const { expect } = require('chai')
const { default: mongoose } = require('mongoose')
const connectDatabase = require('../db/connectDB')

describe('Database connection and test for env variables', () => {
    it("should return 'test' for NODE_ENV environment variable", async() => {
        expect(process.env.NODE_ENV).to.equal('test')
    })
    
    it("should confirm that 'test' string is in the db name", async() => {
        expect(process.env.MONGO_URI).to.include('test')
    })

    it("should resolve 'Successful' string for successful db connection", async() => {
        const res = await connectDatabase(process.env.MONGO_URI)
        expect(res).to.be.a('string').to.equal('Successful')

        await mongoose.connection.dropDatabase()
    })
})