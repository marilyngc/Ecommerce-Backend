
import { usersModel } from "../src/dao/managers/mongo/models/users.model.js";
import { app } from "../src/app.js";
import {expect} from "chai";
import supertest from "supertest";


const requester = supertest(app); // con este elemento hacemos las peticiones http

// creamos pruebas
describe("pruebas para e-commerce", function(){
    describe("pruebas para los endopoitns de users", function(){
          // creamos usuario
          const mockUser = {
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

        it("El endpoint /api/sessions/signup debe registrar al usuario correctamente", async function(){
            const response = await requester.post("/api/sessions/signup").send(mockUser);
            console.log(response.status);
            expect(response.status).to.be.equal(404);
        });

        it("El endpoint POST /api/sessions/login permite loguear al usuario", async function(){
            const response = await requester.post("/api/sessions/login").send({
                email:mockUser.email,
                password: mockUser.password
            });
            console.log(response);
            expect(response.body.message).to.be.equal("login exitoso");
            const cookieResult = response.header['set-cookie'][0];
  
            console.log(cookieResult);
            const cookieData = {
                name:cookieResult.split("=")[0],
                value: cookieResult.split("=")[1]
            };
            // console.log(cookieData);
            this.cookie=cookieData;
            expect(this.cookie.name).to.be.equal("coderCookie");
        });

        it("El endpoint /api/sessions/current permite obtener la informacion del usuario", async function(){
            const response = await requester.get("/api/sessions/current").set("Cookie",[`${this.cookie.name}=${this.cookie.value}`]);
            console.log("current",response);
            expect(response.body.status).to.be.equal("success");
            expect(response.body.payload.email).to.be.equal(mockUser.email);
        });


    });
});
