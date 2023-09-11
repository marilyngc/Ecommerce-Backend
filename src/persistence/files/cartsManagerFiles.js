import fs from "fs";

export class CartsManagerFiles{

    constructor(path){
        this.pathFile = path;
    }

    fileExist(){
        return fs.existsSync(this.pathFile);
    }


    
  async getCart() {
    try {
      if (this.fileExist()) {
        // Leer archivo una vez encontrado en string
        const content = await fs.promises.readFile(this.path, "utf-8");

        // transformar string a json => JSON.parse(objetoJson)
        const contentJson = JSON.parse(content);

        return contentJson;
      } else {
        console.log("No es posible guardar el producto");
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

};

