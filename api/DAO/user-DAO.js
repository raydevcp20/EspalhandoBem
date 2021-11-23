const mysql = require('mysql2'); 

class userDAO{
    constructor(){
        this._connection = mysql.createConnection({
                  host: '',
                  user: '',
                  database: '',
                  password: ''
        });
    }

    list(){
        return new Promise( (resolve, reject) =>{

            this._connection.query(
                'SELECT * FROM users',
                function(err, results) {
                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                });
        });
    }

    createUser(user){
        return new Promise( (resolve, reject) =>{
            let url = "";
            if(user.typeNID == "cnpj"){
                url = `INSERT INTO users (name, type_NID, email, password, description, id_category, cep, street, city, state, cnpj, telephone) 
                values ( '${user.name}', '${user.typeNID}', '${user.email}', '${user.password}', '${user.description}', ${user.idCategory}, '${user.cep}', '${user.street}',  '${user.city}', '${user.state}', '${user.cnpj}', '${user.telephone}' )`;
            }else if(user.typeNID == "cpf"){
                url = `INSERT INTO users (name, type_NID, email, password, cpf, telephone) 
                        values ( '${user.name}', '${user.typeNID}', '${user.email}', '${user.password}', '${user.cpf}', '${user.telephone}' )`;
            }
            this._connection.query(url,
                function(err, results) {
                    if(err){
                        reject(err);
                    }else{
                        console.log(results)
                        resolve(results);
                    }
                }
              );
        });
    }

}

module.exports = userDAO