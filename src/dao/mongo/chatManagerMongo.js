import { chatModel } from "./models/chat.model.js";

export class ChatManagerMongo{
    constructor(){
        this.model = chatModel;
    }

    async getMessages() {
        try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            console.log("getMessages", error.message);
            throw new Error("No se pudo obtener el listado de mesanjes");
        }
    };


    async addMessage(message){
try {
    const result = await this.model.create(message);
    return result
} catch (error) {
    console.log("getMessages", error.message);
    throw new Error("No se pudo crear el mesanje");
}
    }
}