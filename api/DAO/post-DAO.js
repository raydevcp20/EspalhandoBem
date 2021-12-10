// const mysql = require('mysql2'); 
const db = require('../util/database');

module.exports = class postDAO {
    constructor(){
        // this._connection = mysql.createConnection({
        //           host: 'localhost',
        //           user: 'root',
        //           database: 'espalhandobem',
        //           password: ''
        // });
    }

    listPostsByUser(userID){
        return db.execute(`select p.*, u.name as nameUser FROM posts as p inner join users as u on p.id_user = u.id WHERE id_user = ${userID} and deleted != 1 ORDER BY p.post_date DESC`);
    }

    listAll(){
        return db.execute(`select p.*, u.name as nameUser FROM posts as p inner join users as u on p.id_user = u.id ORDER BY p.post_date DESC`);
    }

    listFavorites(userID){
        return db.execute(`select p.*, u.name as nameUser FROM posts as p inner join users as u on p.id_user = u.id where favorite = 1 and deleted != 1 and id_user = ${userID}`);
    }

    editPost(post){
        return db.execute(`UPDATE posts
        SET deleted = ${post.deleted}, favorite = ${post.favorite}
        WHERE id = ${post.id};`);
    }

    createPost(post){
        let date = new Date();
        date = date.toLocaleDateString();
        return db.execute(`INSERT INTO posts (title, description, id_user, post_date) 
        values ( '${post.title}', '${post.description}', '${post.user.id}', '${date}')`);
    }

    delete(id){
        return db.execute(`delete from posts where id = '${id}'`);
    }

}