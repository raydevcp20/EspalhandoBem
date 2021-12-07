// const mysql = require('mysql2'); 
const db = require('../util/database');

module.exports = class userDAO {
    constructor(){
        // this._connection = mysql.createConnection({
        //           host: 'localhost',
        //           user: 'root',
        //           database: 'espalhandobem',
        //           password: ''
        // });
    }

    list(){
        return db.execute(`SELECT * FROM users`);
    }

    listbyId(id){
        return db.execute(`SELECT * FROM users WHERE id = ${id}`);
    }

    listbyCPF(cpf){
        return db.execute(`SELECT * FROM users WHERE cpf = '${cpf}'`);
    }

    listbyCNPJ(cnpj){
        return db.execute( `SELECT * FROM users WHERE cnpj = '${cnpj}'`);
    }

    login(email){
        return db.execute(`SELECT * FROM users WHERE email = '${email}'`);
    }

    async createUser(user){
        let url = "";
        let existUser = [];
        
        if(user.typeNID == "cnpj"){
            existUser = this.listbyCNPJ(user.cnpj);
            if(!existUser){
                url = `INSERT INTO users (name, type_NID, email, password, description, id_category, cep, street, city, state, cnpj, telephone) 
                values ( '${user.name}', '${user.typeNID}', '${user.email}', '${user.password}', '${user.description}', ${user.idCategory}, '${user.cep}', '${user.street}',  '${user.city}', '${user.state}', '${user.cnpj}', '${user.telephone}' )`;
            }else {
                return "Error: usuario já existente"
            }
        }else if(user.typeNID == "cpf"){
            existUser = await this.listbyCPF(user.cpf);
            // console.log(existUser[0]);
            if(!existUser[0]){
                url = `INSERT INTO users (name, type_NID, email, password, cpf, telephone) 
                        values ( '${user.name}', '${user.typeNID}', '${user.email}', '${user.password}', '${user.cpf}', '${user.telephone}' )`;
            }else {
                return "Error: usuario já existente"
            }
        }
        return db.execute(url);
    }

}