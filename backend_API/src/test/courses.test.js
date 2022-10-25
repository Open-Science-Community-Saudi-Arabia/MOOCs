require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const { default: mongoose } = require('mongoose')
const expect = require('chai').expect

const server = require('../app')
const request = require('supertest'),
    app = request.agent(server)

const Video = require('../models/course.models')
