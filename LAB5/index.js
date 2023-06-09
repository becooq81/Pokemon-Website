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
    

    if (req.query?.term) {
        var rows = await db.all("select * from products WHERE product_title LIKE '%" + req.query.term + "%'");
    } else if (req.query?.region) {
        var rows = await db.all("select * from products WHERE product_category LIKE '%" + req.query.region + "%'");
    }
    else {
        var rows = await db.all("select * from products");
    }
    await db.close();
    
    my_product = '';
    for (var i = 0; i < rows.length; i++) {
        my_product += '<div width="150px"><h4>'
            +rows[i]['product_title'] + '</h4>'
            + ' <img width="150px" src="'+ rows[i]['product_image'] +'"/> '
            + '<p>Price: $' + rows[i]['product_price'] + '</p>'
            + '<p>Region: ' + rows[i]['product_category']+'</p></div>';
    }
    
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
                <a href="/">메인</a>
                <a href="/login">로그인</a>
                <a href="/signup">회원가입</a>
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
    res.send(output);
});

app.get('/login', async function (req, res) {
    var output = 
    `<!DOCTYPE html>
    <html lang="ko">
        <head>
            <meta charset="utf-8">
            <title>Log in</title>
            <link rel="stylesheet" type="text/css" href="main.css">
        </head>
        <body>
            <div class="header">
                <h1>Welcome to Poke Shop!</h1>
            </div>
            <div class="menu">
                <a href="/">메인</a>
                <a href="/login">로그인</a>
                <a href="/signup">회원가입</a>
            </div>
            <div class="signup">
                <h3>로그인</h3>
                <form method="post" action="http://www.example.com">
                    <p>
                        <label>아이디:
                            <input name="id" type="text" size="25" placeholder="아이디">
                        </label>
                    </p>
                    <p>
                        <label>비밀번호:
                            <input name="password" type="password" size="25" required placeholder="비밀번호">
                        </label>
                    </p>
                    <p>
                        <input class="signup-reset signup-button" type="submit" value="로그인">
                    </p>
                </form>
            </div>
        </body>
    </html>`;
    res.send(output);
});

app.get('/signup', async function (req, res) {
    var output =
    `<!DOCTYPE html>
    <html lang="ko">
        <head>
            <meta charset="utf-8">
            <title>Sign up</title>
            <link rel="stylesheet" type="text/css" href="main.css">
        </head>
        <body>
            <div class="header">
                <h1>Welcome to Poke Shop!</h1>
            </div>
            <div class="menu">
                <a href="/">메인</a>
                <a href="/login">로그인</a>
                <a href="/signup">회원가입</a>
            </div>
            <div class="signup">
                <h3>회원 가입</h3>
                <form method="post" action="http://www.example.com">
                    <p>
                        <label>이름:
                            <input name = "name" type = "text" size = "25" autofocus required>
                        </label>
                    </p>
                    <p>
                        <label>이메일:
                            <input name = "email" type = "email" placeholder="name@domain.com" required autocomplete="on">
                        </label>
                    </p>
                    <p>
                        <label>아이디:
                            <input name = "id" type = "text" size = "25" required>
                        </label>
                    </p>
                    <p>
                        <label>비밀번호:
                            <input name = "password" type = "password" placeholder = "비밀번호" required>
                        </label>
                    </p>
                    <p>
                        <label>비밀번호 확인:
                            <input name = "password" type="password" placeholder = "비밀번호 확인" required>
                        </label>
                    </p>
                    <p>
                        <label>생일:
                            <input name = "date" type = "date">
                        </label>
                    </p>
                    <p>
                        <label>학년:
                            <input name = "grade" type = "number" min = "1" max = "4" step = "1">
                        </label>
                    </p>
                    <p>
                        <label>전화번호:
                            <input name = "tel" type = "tel" placeholder="(###) ###-####">
                        </label>
                    </p>
                    <br>
                    <p>
                        관심사<br>
                        <label>포켓몬고
                            <input name = "interest" type="checkbox" value = "Pokemongo">
                        </label>
                        <label>포켓몬 바이올렛
                            <input name = "interest" type="checkbox" value = "Violet">
                        </label>
                        <label>포켓몬 스칼렛
                            <input name = "interest" type="checkbox" value = "Scarlet">
                        </label>
                        <label>포켓몬 펄
                            <input name = "interest" type="checkbox" value = "Pearl">
                        </label>
                        <label>포켓몬 다이아
                            <input name = "interest" type="checkbox" value = "Diamond">
                        </label>
                    </p>
                    <p>
                        방문 경로<br>
                        <label>블로그 홍보
                            <input name = "approach" type="radio" value = "blog">
                        </label>
                        <label>광고
                            <input name = "approach" type="radio" value = "ad">
                        </label>
                        <label>지인 추천
                            <input name = "approach" type="radio" value = "acquaintance">
                        </label>
                    </p>
                    <br>
                    <br>
                    <p>
                        <input class="signup-submit signup-button" type="submit" value="완료">
                        <input class="signup-reset signup-button" type="reset" value="취소">
                    </p>
                </form>
            </div>
        </body>
    </html>`;
    res.send(output);
});

const port = 3000;


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
