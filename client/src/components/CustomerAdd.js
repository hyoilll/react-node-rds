import React, { useState } from "react";
import { post } from "axios";

const CustomerAdd = ({ stateRefresh }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCustomer().then((response) => {
      console.log(response);
      // 화면 리랜더링
      stateRefresh();
    });

    setFile(null);
    setFileName("");
    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
  };

  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();

    formData.append("image", file);
    formData.append("name", userName);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);

    //파일이 포함된 데이터를 전송할 때 추가해줘야함
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    return post(url, formData, config);
  };

  const handleFileChange = (e) => {
    //파일 중에서 첫번째 값을 설정 : 웹사이트에서 파일을 업로드할 때 하나의 파일만 선택할 수 있도록 하는 것
    setFile(e.target.files[0]);
    setFileName(e.target.value);
  };

  const handleValueChange = (e, text) => {
    switch (text) {
      case "userName":
        setUserName(e.target.value);
        break;
      case "birthday":
        setBirthday(e.target.value);
        break;
      case "gender":
        setGender(e.target.value);
        break;
      case "job":
        setJob(e.target.value);
        break;
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Add Customer</h1>
      Profile Image:{" "}
      <input
        type="file"
        name="file"
        file={file}
        value={fileName}
        onChange={handleFileChange}
      ></input>
      <br />
      Name:{" "}
      <input
        type="text"
        name="userName"
        value={userName}
        onChange={(e) => handleValueChange(e, "userName")}
      ></input>
      <br />
      Birthday:{" "}
      <input
        type="text"
        name="birthday"
        value={birthday}
        onChange={(e) => handleValueChange(e, "birthday")}
      ></input>
      <br />
      Sex:{" "}
      <input
        type="text"
        name="gender"
        value={gender}
        onChange={(e) => handleValueChange(e, "gender")}
      ></input>
      <br />
      Job:{" "}
      <input
        type="text"
        name="job"
        value={job}
        onChange={(e) => handleValueChange(e, "job")}
      ></input>
      <br />
      <button type="submit">Add</button>
    </form>
  );
};

export default CustomerAdd;
