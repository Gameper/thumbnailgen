import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Jimp from 'jimp';

const App: React.FC = () => {
  let imgSrc2 = 'https://static1.squarespace.com/static/5914dd0d1b10e39c76258fe6/5914dd3b9f7456d2c423df0f/5af3fd7ef950b7dea0e5a6e0/1548246450471/Article+Image+%2813%29.png';
  const [fileUrl, setfileUrl] = useState(imgSrc2)
  const [editedFileUrl, setEditedfileUrl] = useState(imgSrc2)
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

  const changeFile = (url: string) => {
    setEditedfileUrl(url);
  }

  const onClickGenerate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setRenderedText(newText);
    console.log("im clicked");
  }

  return (
    <div className="App">
      <header className="App-header">
        <EditorCanvas renderedText={renderedText} imgSrc={fileUrl} changeFile={changeFile} editedImgSrc={editedFileUrl} />
        <Upload handleChangeFile={handleChangeFile} downloadUrl={editedFileUrl} />
        <input value={newText} onChange={onChangeText} />
        <button onClick={onClickGenerate}>적용</button>
      </header>
    </div>
  );
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
      <img src={editedImgSrc} alt="editorImg" />
    </div>
  )
}
const invertHex = (hex: string) => {
  hex = hex.slice(1);
  let hexString = (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
  return `#${hexString}`
}

export default App;
