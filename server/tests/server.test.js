import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import express from 'express';

import { connectDB } from './config/dbConnect';
import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Express Server', () => {
    let server;
    let connectDBStub;

    before(() => {
        connectDBStub = sinon.stub(connectDB, 'connectDB').callsFake(() => {});

        const app = express();
        app.use(express.json());
        app.use('/api/v1/user', userRoutes);
        app.use(errorHandler);
        server = app.listen(3000);
    });

    after(() => {
        connectDBStub.restore();
        server.close();
    });

    it('should connect to the database', () => {
        expect(connectDBStub.calledOnce).to.be.true;
    });

    it('should have a JSON middleware', () => {
        expect(server._router.stack).to.deep.include.members([{ name: 'jsonParser' }]);
    });

    describe('API Routes', () => {
        it('should have a user route', () => {
            expect(server._router.stack).to.deep.include.members([{ name: 'router', regexp: /^\/api\/v1\/user\/?$/i }]);
        });
    });

    escribe('Additional API Routes', () => {
        it('should have a countries route', () => {
            expect(server._router.stack).to.deep.include.members([{ name: 'router', regexp: /^\/api\/v1\/countries\/?$/i }]);
        });
    
        it('should have a travel route', () => {
            expect(server._router.stack).to.deep.include.members([{ name: 'router', regexp: /^\/api\/v1\/travel\/?$/i }]);
        });
    });
    
    describe('Error Handling Middleware', () => {
        it('should have an error handling middleware', () => {
            expect(server._router.stack).to.deep.include.members([{ name: 'errorHandler' }]);
        });
    });
    
    describe('CORS Middleware', () => {
        it('should enable CORS with credentials', () => {
            const corsMiddleware = server._router.stack.find(middleware => middleware.name === 'corsMiddleware');
            expect(corsMiddleware).to.exist;
            expect(corsMiddleware.handle).to.be.a('function');
        });
    });
});