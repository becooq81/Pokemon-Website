const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function getDBConnection() {
    const db = await sqlite.open({
        filename: 'product.db',
        driver: sqlite3.Database
    });
    return db;
}

app.use(express.static('public'));

app.use('/images', express.static('images'));

app.get('/', async function (req, res) {
    let db = await getDBConnection();
    let rows = await db.all("select * from products");
    await db.close();
    my_product = '';
    for (var i = 0; i < rows.length; i++) {
        my_product += '<div width="150px"><h4>'
            +rows[i]['product_title'] + '</h4>'
            + ' <img width="150px" src="'+ rows[i]['product_image'] +'"/> '
            + '<p>Price: $' + rows[i]['product_price'] + '</p>'
            + '<p>Region: ' + rows[i]['product_category']+'</p></div>';
    }

    console.log(my_product);
    var output = 
    `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Main</title>
            <link rel="stylesheet" type="text/css" href="main.css">
        </head>
        <body>
            <div class="header">
                <h1>Welcome to Poke Shop!</h1>
            </div>
            <div class="menu">
                <a href="index.html">메인</a>
                <a href="login.html">로그인</a>
                <a href="signup.html">회원가입</a>
            </div>
            <div class="content">
                <div class="search">
                    <form action="" id="myForm">
                        Choose a region:
                        <select name="region" id="region">
                            <option value="">All</option>
                            <option value="Kanto">Kanto</option>
                            <option value="Johto">Johto</option>
                            <option value="Hoenn">Hoenn</option>
                            <option value="Sinnoh">Sinnoh</option>
                        </select><br>
                        Enter a search term:
                        <input name="term" type="text" size="20" id="term"><br>
                        Choose a sort:
                        <select name="sort" id="sort">
                            <option value="">None</option>
                            <option value="Alphabet">Alphabetical order</option>
                            <option value="Price">Cheapest to costliest</option>
                        </select><br>
                        <button type="submit" value="Submit">Submit</button>
                    </form>
                </div>
                <div class="products">
            ${my_product}
            </div>
        </body>
    </html>`;
    res.send(output)
});

const port = 3000;


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
