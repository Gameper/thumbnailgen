import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Jimp from 'jimp';

const App: React.FC = () => {
  let imgSrc2 = 'https://w0.pngwave.com/png/132/811/bitcoin-cryptocurrency-blockchain-sticker-laptop-bitcoin-png-clip-art.png';
  const [fileUrl, setfileUrl] = useState(imgSrc2)
  const [editedFileUrl, setEditedfileUrl] = useState(imgSrc2)

  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = URL.createObjectURL((event as any).target.files[0])
    console.log(`URL : ${url}`);
    setfileUrl(url)
  }

  const changeFile = (url:string) => {
    setEditedfileUrl(url);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <EditorCanvas renderedText={'비트코인 100억 간다'} imgSrc={fileUrl} changeFile={changeFile} editedImgSrc={editedFileUrl}/>
        <Upload handleChangeFile={handleChangeFile} downloadUrl={editedFileUrl}/>
      </header>
    </div>
  );
}

interface UploadProps {
  handleChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => (any);
  downloadUrl: string;
}

const Upload: React.FC<UploadProps> = ({handleChangeFile, downloadUrl}) => {

  return (
    <div>
      <input type="file" onChange={handleChangeFile}/>
      <a href={downloadUrl} download="thumbnail">다운로드</a>
    </div>
  )
}


interface CanvasProps {
  renderedText: string;
  imgSrc: string;
  changeFile: (url:string) => (void);
  editedImgSrc: string;
}

const EditorCanvas: React.FC<CanvasProps> = ({ renderedText, imgSrc, changeFile, editedImgSrc}) => {


  console.log(imgSrc);
  useEffect(()=> {
    Jimp.read(imgSrc, async (err, imgLoaded) => {
      
      const fontHeight = 50;
      const bottomX = 10
      const bottomY = 0;
      const shadowOffset = 2;
      // get text
      console.log(`[TEXT FROM PROPS]${renderedText}`)

      
      const textCanvasHeight = 100;
      const textCanvasWidth = 300;
      let transparentColor: number = await (Jimp as any).rgbaToInt(100, 100, 0, 0.5);
      let textCanvas = await new Jimp(textCanvasWidth, textCanvasHeight, transparentColor);
      // img resize
      await imgLoaded.resize(1280, 720);
      // load font
      // const fontPath = `${process.env.PUBLIC_URL}/nanum/nanum.fnt`;
      const fontPath = `./nanum/nanum.fnt`;      
      let font = await Jimp.loadFont(fontPath);
      // print text to the bottom line

      const invertHex = (hex: string) => {
        hex = hex.slice(1);
        let hexString = (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
        return `#${hexString}`
      }
      let orangeColor = '#ffd042'
      let orangeColorHexInverse = invertHex(orangeColor); // Returns FF00FF
      // let orangeColorHexInverse = invertHex('edc261'); // Returns FF00FF

      // print shadow of the all text
      await textCanvas.color([{ apply: 'xor', params:['#000000']}])
        .invert()
        .print(font, bottomX + shadowOffset, bottomY + shadowOffset, renderedText)
        .color([{ apply: 'xor', params:['#ffffff']}])

      // print text
        .color([{ apply: 'xor', params:[orangeColor]}])
        .invert()
        .print(font, bottomX, bottomY, renderedText)
        .color([{ apply: 'xor', params:[orangeColorHexInverse]}])

        .color([{ apply: 'xor', params:['#ffffff']}])
        .invert()
        .print(font, bottomX, bottomY, renderedText.slice(0,2))
        .color([{ apply: 'xor', params:['#000000']}])
        
      
      // resize text
      await textCanvas.resize(textCanvasWidth*2, textCanvasHeight*2);
      const compositBottomX = 10;
      const compositBottomY = imgLoaded.getHeight() - textCanvasHeight
      await imgLoaded.composite(textCanvas, compositBottomX, compositBottomY);

      // get base64 encoded imge to use in the img component
      // let imgBase64 = await textCanvas.getBase64Async(Jimp.MIME_PNG);
      // setEditedImgSrc(imgBase64);
      let imgBase64 = await imgLoaded.getBase64Async(Jimp.MIME_PNG);
      // setEditedImgSrc(imgBase64);
      changeFile(imgBase64);
    })
    
  }, [imgSrc])

  return (
    <div>
      <img src={editedImgSrc} alt="editorImg" />
    </div>
  )
}


export default App;
