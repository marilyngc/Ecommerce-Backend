import { app } from '../src/app.js'
import { expect } from 'chai'
import supertest from 'supertest' 
import { usersModel } from '../src/dao/managers/mongo/models/users.models.js'
import { describe } from 'node:test'

const request = supertest(app);

describe('Testing de ecommerce', () => {
    let sessionCookie;
    let cartID
    let createdProductID;

    before(async function(){
        await usersModel.deleteMany({})
    })


    describe('Test de usuarios', () => {
       
        it('El endpoint de Post /api/sessions/register debe registrar un usuario', async function () {
            const newUser = {
                first_name: 'test',
                last_name: 'test',
                email: 'tester@test.com',
                age: 10,
                password: 'testPassword123',
                role: 'admin'
            }
            const  registerResponse = await request.post('/api/sessions/register').send(newUser);
            //console.log('Respuesta ----', registerResponse)
            expect(registerResponse.status).to.be.equal(200);
        })
        it('Debe loguearse con email y password', async function () {
            const userTest = {
                email: "tester@test.com",
                password: "testPassword123"
            }
            const loginResponse = await request.post('/api/sessions/login').send(userTest);
            //console.log('loginResponse---', loginResponse)
    
            sessionCookie = loginResponse.headers['set-cookie'][0].split(';')[0];
            const cookieName = sessionCookie.split('=')[0];
            const cookieValue = sessionCookie.split('=')[1];
    
            expect(loginResponse.status).to.be.eql(200);
            expect(cookieName).to.be.equal('cookieLogin');
            expect(cookieValue).to.be.ok;
    
        });
    
        it('Debe comprobar la sesion del usuario', async function () {
            const checkSessionResponse = await request.get('/profile?test=true').set('Cookie', sessionCookie);
            //console.log('checkSessionResponse---', checkSessionResponse)
            expect(checkSessionResponse.status).to.be.equal(200);
            expect(checkSessionResponse._body.body).to.have.property('_id');
            expect(checkSessionResponse._body.body).not.to.have.property('password');
            cartID = checkSessionResponse._body.body.cart
            //console.log('Cart id', cartID)
    
        });
    
    })

    describe('Testing de Productos', () => {
       
    
       it('POST --> Debe crear un nuevo producto', async function () {
           const newProduct = {
               title: "test_product",
               description: "Descripción de prueba",
               price: 100,
               code: "TEST_CODE_PRODUCT_",
               stock: 50,
               category: "conjunto",
               status: true,
               thumbnail: [
                   "img.png"
               ]
           }
   
           const response = await request.post('/api/products/').set('Cookie', sessionCookie).send(newProduct);
           //console.log('Respuesta ----', response)
   
           expect(response.status).to.be.equal(200);
           createdProductID = response._body._id;
           console.log('Product id', createdProductID)

       });
   

    })


})

