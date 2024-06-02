const fs = require('fs')
const Path  = require('path')
const {PORT} =  require('./config/config_env')

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const jwt = require('@fastify/jwt')


//数据库实例
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


fastify.get('/', function handler (request, reply) {
    reply.send({ hello: 'world' })
})

fastify.post('/v1/market/register',async(request,reply)=>{
    const {name,password,email,} = request.body
    const user = await prisma.user.create({
        data:{name,password,email}
    })
    console.log(user)
    reply.send({
        msg:'ok'
    })
    console.log(user)
})

// Declare a route
fastify.get('/v1/market/test', function handler (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: PORT }, (err) => {

  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})