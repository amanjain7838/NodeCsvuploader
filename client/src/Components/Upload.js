import React, { useEffect, useRef } from 'react';
import {uploadCSV} from '../Methods/upload';
import {useNavigate} from "react-router-dom";

const Upload=()=>{
    const uploadRef=useRef(null);
    const navigate = useNavigate();

    useEffect(()=>{
        window.ondragover = function(e) { e.preventDefault(); return false };
        window.ondrop = function(e) { e.preventDefault(); return false };
    },[]);
    const uploadFile=(file)=>{
        uploadCSV(file).then(()=>{
            navigate("/users");
        });
    }
    const handleDrop=(e)=>{
        e.preventDefault();
        console.log(e)
        let file=e.dataTransfer.files[0];
        if(file)
        {
            if(file.type=="text/csv")
                uploadFile(file);
            else
                alert("Only Csv allowed");
    
        }
    }
    return (
        <div className="upload-panel">
            <div onClick={()=>uploadRef.current.click()} onDrop={e=>handleDrop(e)} className="upload-panel-center">
                <input ref={uploadRef} onChange={e=>uploadFile(e.target.files[0])} type="file" accept=".csv" name="csv_file" className='d-none'/>
                <div>Drag file here to upload</div>
            </div>
        </div>
    )
};
export default Upload;