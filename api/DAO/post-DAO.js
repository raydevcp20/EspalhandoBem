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

    listAll(){
        return db.execute(`select * from posts where deleted != 1`);
    }

    listFavorites(){
        return db.execute(`select * from posts where favorite = 1 and deleted != 1`);
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