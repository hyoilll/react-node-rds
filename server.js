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

//클라이언트가 서버에 접속시 json 으로 반환해줌
app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "https://placeimg.com/64/64/1",
      name: "lee hyo il",
      birthday: 930727,
      gender: "man",
      job: "student",
    },
    {
      id: 2,
      image: "https://placeimg.com/64/64/2",
      name: "sana",
      birthday: 900322,
      gender: "woman",
      job: "student",
    },
    {
      id: 3,
      image: "https://placeimg.com/64/64/3",
      name: "mina",
      birthday: 940808,
      gender: "woman",
      job: "teacher",
    },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// rest api - 서버와 클라이언트가 웹 프로토콜을 기반으로 효과적으로 데이터를 주고받을 수 있게 해줌.
