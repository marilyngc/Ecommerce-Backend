
import { usersModel } from "../src/dao/managers/mongo/models/users.model.js";
import { app } from "../src/app.js";
import {expect} from "chai";
import supertest from "supertest";


const requester = supertest(app); // con este elemento hacemos las peticiones http

// creamos pruebas
describe("pruebas para e-commerce", function(){
    describe("pruebas para los endopoitns de users", function(){
          // creamos usuario
          const newUser = {
            first_name:"macarena",
            last_name:"mercado",
            age:32,
            email:"macarena@gmail.com",
            password:"dbfrgvw364"
        };

        before(async function(){
            this.cookie;
            await usersModel.deleteMany({});
        });
       
        it("El endpoint POST /api/users/signup crea un usuario perfectamente", async function(){
          

            const response = await requester.post("/api/users/signup").send(newUser);
            console.log("responseee",response.body)
            expect(response.body.status).to.be.equal("success");
            // expect(response.body.payload).to.have.property("_id");
           
        });

        
        it("El endpoint POST /api/users/login loguea el usuario correctamente", async function(){
          
            const response = (await requester.post("/api/users/login"));
            // expect(response.body.status).to.be.equal("success");
            expect(response.body.payload).to.have.property("_id");
        });


    });
});
