import { Table, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectIsToken, selectUser } from "../Redux/UserContext/UserSlice";
import { useParams } from "react-router-dom";

function UserFiles() {
  const { email } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/auth/get-user-files/${email}`, {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
              .token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      });
  }, []);

  const rows = data.map((element, idx) => (
    <tr key={idx}>
      <td>{idx+1}</td>
      <td>{element.file_name}</td>
      <td>{element.file_size} (KB)</td>
      <td>{element.file_name.split(".")[1]}</td>
      <td>{new Date(element.created_on).toUTCString()}</td>
      <td><a href={element.file_url}> {element.file_url} </a></td>
      <td>{element.old_name}</td>

      <td><a href={element.old_url}>{element.old_url}</a></td>
    </tr>
  ));

  return (
    <div>
     <Title style={{ 
         display:"flex",
         justifyContent: "center",
     }}>
        UserFiles
         </Title>
      <Table>
        <thead>
          <tr>
            <th>SN</th>
            <th>File Name</th>
            <th>File Size</th>
            <th>File Type</th>
            <th>Created On</th>
            <th>URL</th>
            <th>Old Name</th>
            <th>Old Url</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}

export default UserFiles;
