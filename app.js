const fs = require('fs')

const Path  = require('path')
const {PORT,JWT_SECRET} =  require('./config/config_env')

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
//jwt
const jwt = require('@fastify/jwt')
fastify.register(jwt,{secret:JWT_SECRET})

//数据库实例
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


fastify.post('/v1/market/login', (request, reply) =>{
    const {name} = request.body 
    const token  = fastify.jwt.sign({name})
    reply.send({code:0,token,username:name,msg:'登陆成功' })
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