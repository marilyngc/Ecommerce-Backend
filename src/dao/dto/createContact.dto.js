

export class CreateContact {
    constructor(contactInfo){
        //datos que recibimos del front
        //transformamos la información antes de que llegue a la DB
        this.full_name = `${contactInfo.first_name}${contactInfo.last_name}`
        this.first_name = contactInfo.first_name
        this.last_name = contactInfo.last_name
        this.email = contactInfo.email
    }
}