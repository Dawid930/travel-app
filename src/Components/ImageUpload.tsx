import { Axios } from "axios";
import React, { useState } from "react";
import { TravelDiv } from "./Style";

const { axios } = require("axios")
const ImageUpload = () => {

  const [imageSelected, setImageSelected] = useState(null)

  const uploadImage = () => {
    
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "wlofdpyi");

    axios.post("https://api.cloudinary.com/v1_1/dsoca9tfs/image/upload", formData).then((response) => console.log(response));
  };
  return (
    <TravelDiv>
      <input
        type="file"
        onChange={(e) => {
          setImageSelected(e.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>
    </TravelDiv>
  );
};

export default ImageUpload;
