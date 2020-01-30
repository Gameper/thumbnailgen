import React, { useState, useEffect, useCallback } from 'react';

import './App.css';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';
import ImgDrop from './components/ImageDrop';
import Upload from './components/Upload';
import EditorCanvas from './components/EditorCanvas';
import useStyles from './styles/material-ui-styles';

const defaultSource = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5XlCdYS6OP0Q5RENKnhkXWDsgfzlvssygvZul1efZtA7v9AtjKA&s';
const nanumFontPath = `./nanum-barun-gothic-100/nanum100bg.fnt`;
const spocaSansFontPath = `./spoca-han-sans/spocahansans.fnt`;


const App: React.FC = () => {
  const [fileUrl, setfileUrl] = useState('')
  const [editedFileUrl, setEditedfileUrl] = useState('')
  const [newText, setNewText] = useState('');
  const [newText2, setNewText2] = useState('');
  const [renderedText, setRenderedText] = useState('');
  const [renderedText2, setRenderedText2] = useState('');

  const [fontPath, setFontPath] = useState(nanumFontPath);

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
    setRenderedText2(newText2);
    console.log("im clicked");
  }

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       { fileUrl ? <EditorCanvas fontPath={fontPath} renderedText={renderedText} renderedText2={renderedText2} imgSrc={fileUrl} changeFile={changeEditedFile} editedImgSrc={editedFileUrl} /> : <ImgDrop changeFile={(file) => setfileUrl(file)}/>}
  //       <Upload handleChangeFile={handleChangeFile} downloadUrl={editedFileUrl} />
  //       <input value={newText} onChange={(event) => setNewText(event.target.value)} />
  //       <input value={newText2} onChange={(event) => setNewText2(event.target.value)} />
  //       <button onClick={onClickGenerate}>적용</button>
  //       <button onClick={()=> fontPath === nanumFontPath ? setFontPath(spocaSansFontPath) : setFontPath(nanumFontPath)} >폰트 전환</button>
  //     </header>
  //   </div>
  // );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        Thumbnail Generator
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
         { fileUrl ? <EditorCanvas fontPath={fontPath} renderedText={renderedText} renderedText2={renderedText2} imgSrc={fileUrl} changeFile={changeEditedFile} editedImgSrc={editedFileUrl} /> : <ImgDrop changeFile={(file) => setfileUrl(file)}/>}
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <br></br>
        <br></br>
        <Upload handleChangeFile={handleChangeFile} downloadUrl={editedFileUrl} />
        <br></br>
        폰트2
        <br></br>
        텍스트 위치
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Divider />
        <TextField value={newText} onChange={(event) => setNewText(event.target.value)} variant="filled" className={classes.textField} id="filled-required" label="Standard" inputProps={{className: classes.textField }} />
        <TextField value={newText2} onChange={(event) => setNewText2(event.target.value)} variant="filled" className={classes.textField} id="filled-required" label="Standard" inputProps={{className: classes.textField }} />
    
        <br></br>
        
        <Button onClick={()=> fontPath === nanumFontPath ? setFontPath(spocaSansFontPath) : setFontPath(nanumFontPath)} variant="contained" color="primary" className={classes.drawerButton} startIcon={<CreateIcon />}>
        폰트 전환
        </Button>
        <br></br><br></br>
        <Button onClick={onClickGenerate} variant="contained" color="primary" className={classes.drawerButton} startIcon={<CreateIcon />}>
        생성
        </Button>
        
        <Divider />
        <Divider />
        <Button href={editedFileUrl} download="thumbnail" variant="contained" color="secondary" startIcon={<SaveIcon />}>
        저장
        </Button>
        
        <Divider />
      </Drawer>
    </div>
  );
}

export default App;
