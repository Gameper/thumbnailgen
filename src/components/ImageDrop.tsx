import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
interface IProps {
    changeFile: (file: string) => void;
  }
  
const ImgDrop: React.FC<IProps> = ({changeFile}) => {

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: File) => {
        const reader = new FileReader()
        reader.onabort = () => console.log("file reading has aborted")
        reader.onerror = () => console.log("file reading has failed")
        reader.readAsDataURL(file)
        reader.onload = () => {
            const dataUrl = reader.result
            if (typeof dataUrl === "string") {
            changeFile(dataUrl)
            }
        }
        });
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
        <input {...getInputProps()}/>
        <div style={{width:"1280px", height: "720px"}}>
            <p>파일을 올려주세요</p>
        </div>
        </div>
    )
}

export default ImgDrop;