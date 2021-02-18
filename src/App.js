import React from "react";
import "./App.css";
import Customer from "./components/Customer";

const customers = [
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
];

function App() {
  return (
    <div className="gray-backgroud">
      {customers.map((customer) => {
        return (
          <Customer
            key={customer.id}
            id={customer.id}
            img={customer.image}
            name={customer.name}
            birthday={customer.birthday}
            gender={customer.gender}
            job={customer.job}
          ></Customer>
        );
      })}
    </div>
  );
}

export default App;
