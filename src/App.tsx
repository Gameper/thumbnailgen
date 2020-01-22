import React, { useState, useEffect, useCallback } from 'react';
import Jimp from 'jimp';
import { useDropzone } from 'react-dropzone';
import './App.css';


const App: React.FC = () => {
  const [fileUrl, setfileUrl] = useState('')
  const [editedFileUrl, setEditedfileUrl] = useState('')
  const [newText, setNewText] = useState('');
  const [renderedText, setRenderedText] = useState('');

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(event.target.value);
  }

  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = URL.createObjectURL((event as any).target.files[0])
    console.log(`URL : ${url}`);
    setfileUrl(url)
  }

  const changeEditedFile = (url: string) => {
    setEditedfileUrl(url);
  }

  const onClickGenerate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setRenderedText(newText);
    console.log("im clicked");
  }

  return (
    <div className="App">
      <header className="App-header">
        { fileUrl ? <EditorCanvas renderedText={renderedText} imgSrc={fileUrl} changeFile={changeEditedFile} editedImgSrc={editedFileUrl} /> : <ImgDrop changeFile={(file) => setfileUrl(file)}/>}
        <Upload handleChangeFile={handleChangeFile} downloadUrl={editedFileUrl} />
        <input value={newText} onChange={onChangeText} />
        <button onClick={onClickGenerate}>적용</button>
      </header>
    </div>
  );
}

interface ImgDropProps {
  changeFile: (file: string) => void;
}

const ImgDrop: React.FC<ImgDropProps> = ({changeFile}) => {

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

interface UploadProps {
  handleChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => (any);
  downloadUrl: string;
}

const Upload: React.FC<UploadProps> = ({ handleChangeFile, downloadUrl }) => {

  return (
    <div>
      <input type="file" onChange={handleChangeFile} />
      <a href={downloadUrl} download="thumbnail">다운로드</a>
    </div>
  )
}


interface CanvasProps {
  renderedText: string;
  imgSrc: string;
  changeFile: (url: string) => (void);
  editedImgSrc: string;
}


const createColoredText = async (font: any, fullText: string, color: string, coloredText: string) => {
  let from = fullText.indexOf(coloredText);
  let to = from + coloredText.length;

  const textCanvasHeight = 140;
  const textCanvasWidth = 1000;

  let transparentColor: number = await (Jimp as any).rgbaToInt(100, 100, 0, 0.5);
  let textCanvas3 = await new Jimp(textCanvasWidth, textCanvasHeight, transparentColor);

  let wi = Jimp.measureText(font, fullText.slice(0, from));
  // let he = Jimp.measureTextHeight(font, fullText.slice(0, from), wi);

  return (await textCanvas3.print(font, wi, 0, coloredText).color([{ apply: 'xor', params: [color] }]));
}
const EditorCanvas: React.FC<CanvasProps> = ({ renderedText, imgSrc, changeFile, editedImgSrc }) => {

  useEffect(() => {
    Jimp.read(imgSrc, async (err, imgLoaded) => {

      const fontHeight = 50;
      const bottomX = 10
      const bottomY = 0;
      const shadowOffset = 4;
      // get text
      console.log(`[TEXT FROM PROPS]${renderedText}`)


      const textCanvasHeight = 150;
      const textCanvasWidth = 1000;
      let transparentColor: number = await (Jimp as any).rgbaToInt(100, 100, 0, 0.5);
      let textCanvas = await new Jimp(textCanvasWidth, textCanvasHeight, transparentColor);
      // img resize
      await imgLoaded.resize(1280, 720);
      // load font
      // const fontPath = `${process.env.PUBLIC_URL}/nanum/nanum.fnt`;
      const fontPath = `./nanum-barun-gothic-100/nanum100bg.fnt`;
      let font = await Jimp.loadFont(fontPath);
      // print text to the bottom line

      let orangeColor = '#ffd042'
      let whiteColor = '#ffffff'
      let blackColor = '#000000'
      let separator = renderedText.indexOf(' ');
      let shadow = await createColoredText(font, renderedText, blackColor, renderedText);
      let text3 = await createColoredText(font, renderedText, whiteColor, renderedText.slice(0, separator));
      let text2 = await createColoredText(font, renderedText, orangeColor, renderedText.slice(separator));
      
      // let text3 = await createColoredText(renderedText, whiteColor, '비트코인');

      await textCanvas.composite(shadow, shadowOffset, shadowOffset);
      await textCanvas.composite(text3, 0, 0);
      await textCanvas.composite(text2, 0, 0);

      // resize text
      const compositBottomX = 10;
      const compositBottomY = imgLoaded.getHeight() - textCanvasHeight - 10
      await imgLoaded.composite(textCanvas, compositBottomX, compositBottomY);

      // get base64 encoded imge to use in the img component
      // let imgBase64 = await textCanvas.getBase64Async(Jimp.MIME_PNG);
      // setEditedImgSrc(imgBase64);
      let imgBase64 = await imgLoaded.getBase64Async(Jimp.MIME_PNG);
      // setEditedImgSrc(imgBase64);
      changeFile(imgBase64);
    })

  }, [imgSrc, renderedText])

  return (
    <div>
      <img width="1280px" height="720px" src={editedImgSrc} alt="editorImg" />
    </div>
  )
}
const invertHex = (hex: string) => {
  hex = hex.slice(1);
  let hexString = (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
  return `#${hexString}`
}

export default App;
