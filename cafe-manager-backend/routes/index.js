const subscriberRouter = require('./subscribers');
const authRouter = require('./auth');
const tableRouter = require('./table');
const productRouter = require('./product');
const userRouter = require('./user');
const orderRouter = require('./order');
const materialRouter = require('./material');
const typeRouter = require('./type');
const importMaterial = require('./importMaterial');
const exportMaterial = require('./exportMaterial');
const statistic = require('./statistic');
//Index of route middleware
const route = (app) => {
    //Route middleware subscribers
    app.use('/subscribers', subscriberRouter);

    //Route middleware auth
    app.use('/api/auth', authRouter);
    app.use('/api', tableRouter);
    app.use('/api', productRouter);
    app.use('/api', userRouter);
    app.use('/api', orderRouter);
    app.use('/api', materialRouter);
    app.use('/api', typeRouter);
    app.use('/api', importMaterial);
    app.use('/api', exportMaterial);
    app.use('/api', statistic);
};

module.exports = route;
