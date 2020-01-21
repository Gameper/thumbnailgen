import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Jimp from 'jimp';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <EditorCanvas renderedText={'비트코인 100억 간다'}/>
        <Upload/>
      </header>
    </div>
  );
}

const Upload: React.FC = () => {

  const [fileUrl, setfileUrl] = useState()

  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = URL.createObjectURL((event as any).target.files[0])
    console.log(`URL : ${url}`);
    setfileUrl(url)
  }

  return (
    <div>
      <input type="file" onChange={handleChangeFile}/>
      <img src={fileUrl} width="300px" height="100px" alt="asdf"/>
      <a href={fileUrl} download="true">다운로드</a>
    </div>
  )
}


interface CanvasProps {
  renderedText: string;
}
const EditorCanvas: React.FC<CanvasProps> = ({ renderedText }) => {

  let imgSrc = 'https://w0.pngwave.com/png/132/811/bitcoin-cryptocurrency-blockchain-sticker-laptop-bitcoin-png-clip-art.png';
  const [editedImgSrc, setEditedImgSrc] = useState('');

  useEffect(()=> {
    Jimp.read(imgSrc, async (err, imgLoaded) => {

      // get text
      console.log(`[TEXT FROM PROPS]${renderedText}`)

      // load font
      const fontPath = '';
      // let font = await Jimp.loadFont(fontPath);
      // print text to the bottom line

      // print shadow of the all text
      // await imgLoaded.color([{ apply: 'xor', params:['#ffffff']}])
      // .invert()
      // .print(font, 2, 2, text)

      // img resize

      // get base64 encoded imge to use in the img component
      let imgBase64 = await imgLoaded.getBase64Async(Jimp.MIME_PNG);
      setEditedImgSrc(imgBase64);
    })
    
  }, [])

  return (
    <div>
      <img src={editedImgSrc} alt="editorImg" />
    </div>
  )
}


export default App;
