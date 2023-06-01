// const mysql = require('mysql2'); 
const { url } = require('inspector');
const db = require('../util/database');

module.exports = class userDAO {
    constructor(){
    }

    getByUserId(userId){
        return db.execute(`SELECT * FROM users WHERE cnpj = ${userId} or cpf = ${userId}`);
    }

    list(){
        return db.execute(`SELECT * FROM users`);
    }
    
    getById(user){
        if(user.type_NID == 'cnpj'){
            return db.execute(`SELECT u.*, c.name as categoryName 
            FROM users as u 
            inner join category as c 
            on u.id_category = c.id 
            WHERE u.id = ${user.id}`);
        }
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

    login(email, password){
        let url = `SELECT * from users WHERE email = '${email} and password = '${password}'`;
        try {
            return { status: "SUCCESS",  result: db.execute(url)};
        } catch (error) {
            return { status: "ERROR",  result: error };
        }
    }

    setFavorite(user){
        return db.execute(`UPDATE users
        SET favorited = '${user.favorited}', user_favorited = ${user.user_favorited} WHERE id = ${user.id};`);
    }

    updateUser(user){
        return db.execute(`UPDATE users
        SET email = '${user.email}', telephone = '${user.telephone}', description = '${user.description}', 
        cep = '${user.cep}', street = '${user.street}', city = '${user.city}', state='${user.state}' 
        WHERE id = ${user.id};`);
    }

    async createUser(user){
        let url = "";
        let existUser = [];
        try {
            if(user.typeNID == "cnpj"){
                existUser = await this.listbyCNPJ(user.cnpj);
                if(existUser[0].length === 0){
                    url = `INSERT INTO users (name, type_NID, email, password, id_category, cep, street, city, state, cnpj, phone) 
                    values ( '${user.name}', '${user.typeNID}', '${user.email}', '${user.password}', ${user.idCategory}, '${user.cep}', 
                    '${user.street}',  '${user.city}', '${user.state}', '${user.cnpj}', '${user.telephone}' )`;
                }else {
                    return { status: "ERROR",  result: "Não é permitido criar o usuário. CNPJ já cadastrado." }
                }
            }else if(user.typeNID == "cpf"){
                existUser = await this.listbyCPF(user.cpf);
                if(existUser[0].length === 0){
                    url = `INSERT INTO users (name, type_NID, email, password, cpf, phone) 
                            values ( '${user.name}', '${user.typeNID}', '${user.email}', '${user.password}', '${user.cpf}', '${user.telephone}' )`;
                }else {
                    return { status: "ERROR",  result: "Não é permitido criar o usuário. CPF já cadastrado." }
                }
            }

            return { status: "SUCCESS",  result: db.execute(url) };
        } catch (error) {
            return { status: "ERROR",  result: error };
        }
    }

}