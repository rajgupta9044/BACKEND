const redis =require ('redis');

const redisClient = redis.createClient({
    username: 'default',
    password: 'R9jExvTJreMKNbBxqQou0uiTk6jfyVzB',
    socket: {
        host: 'redis-12617.crce182.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 12617
    }
});




module.exports=redisClient;


