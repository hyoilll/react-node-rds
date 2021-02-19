const fs = require("fs"); // 파일 접근
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

//json으로 데이터 주고 받음
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/api/hello", (req, res) => {
//   res.send({ message: "Hello Express!" });
// });

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect();

const multer = require("multer");
const upload = multer({ dest: "./upload" });

//클라이언트가 서버에 접속시 json 으로 반환해줌
app.get("/api/customers", (req, res) => {
  connection.query("select * from customer", (err, rows, fields) => {
    res.send(rows);
  });
});

// 사용자가 image폴더에 접근하면 서버의 upload로 매핑됨
app.use("/image", express.static("./upload"));

app.post("/api/customers", upload.single("image"), (req, res) => {
  const sql = "insert into customer values(null, ?, ?, ?, ?, ?)";
  const image = "/image/" + req.file.filename;
  const name = req.body.name;
  const birthday = req.body.birthday;
  const gender = req.body.gender;
  const job = req.body.job;
  const params = [image, name, birthday, gender, job];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// rest api - 서버와 클라이언트가 웹 프로토콜을 기반으로 효과적으로 데이터를 주고받을 수 있게 해줌.
// create - post / read - get / update - put / delete - delete

// file을 서버에서 받기 위한 라이브러리
// npm i --save multer
