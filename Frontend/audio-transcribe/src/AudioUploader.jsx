import { useState } from "react";
import axios  from 'axios';

const AudioUploader=()=>{ 
const[file,setfile]=useState(null);
const[transcrption,settranscrption]=useState("");




const handlefilechange =(e) =>{
setfile(e.target.files[0]);

}
 

const handleUpload =async()=>{
const formData = new FormData();
formData.append('file',file);

try {
    const response = await axios.post('http://localhost:8080/api/transcribe',formData,{
        headers:{'Content-Type':'multipart/form-data',}


    }) ;

    settranscrption(response.data.transcription);
} catch (error) {
    console.log("err",error)
}


}


    return(

    <><div className="container">
        <h1> Audio to text Transcriber </h1>

        <div className="file-input">
            <input type="file" accept="audio/*" onChange={handlefilechange} />
        </div>
        <button className="upload button"onClick={handleUpload} > Upload and transcribe </button>
    </div><div className="transcrption-result">

            <h2> Transcrption result</h2>
            <p>{transcrption}</p>
        </div></>
    );


}
export default AudioUploader