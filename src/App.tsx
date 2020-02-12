import React, { useState, useEffect, useCallback } from "react";

// import "./App.css";
import "./scss/styles.scss";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CreateIcon from "@material-ui/icons/Create";
import ImgDrop from "./components/ImageDrop";
import Upload from "./components/Upload";
import Loading from './components/Loading'
import EditorCanvas from "./components/EditorCanvas";
import useStyles from "./styles/material-ui-styles";

const defaultSource =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5XlCdYS6OP0Q5RENKnhkXWDsgfzlvssygvZul1efZtA7v9AtjKA&s";
const nanumFontPath = `./nanum-barun-gothic-100/nanum100bg.fnt`;
const spocaSansFontPath = `./spoca-han-sans/spocahansans.fnt`;

const App: React.FC = () => {
  const [ fileUrl, setfileUrl ] = useState("");
  const [ editedFileUrl, setEditedfileUrl ] = useState("");
  const [ newText, setNewText ] = useState("밥 먹자");
  const [ newText2, setNewText2 ] = useState("맛있느냐");
  const [ renderedText, setRenderedText ] = useState("");
  const [ renderedText2, setRenderedText2 ] = useState("");
  const [ isLoading, setIsLoading ]= useState(false);

  const [ fontPath, setFontPath ] = useState(nanumFontPath);

  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = URL.createObjectURL((event as any).target.files[0]);
    console.log(`URL : ${url}`);
    setfileUrl(url);
  };

  const changeEditedFile = (url: string) => {
    setEditedfileUrl(url);
  };

  const changeLoadingState = (isShowing: boolean) => {
    setIsLoading(isShowing)
  };

  const onClickGenerate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setRenderedText(newText);
    setRenderedText2(newText2);
    console.log("im clicked");
  };

  const classes = useStyles();

  return (
    <div className="test">
      {/* <CssBaseline /> */}
      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>Thumbnail Generator</Toolbar>
      </AppBar> */}
      <div className="header">Thumbnail Generator</div>
      <main className="main-container">
        {/* <div className={classes.toolbar} /> */}
        {fileUrl ? (
          <EditorCanvas
            fontPath={fontPath}
            renderedText={renderedText}
            renderedText2={renderedText2}
            imgSrc={fileUrl}
            changeFile={changeEditedFile}
            editedImgSrc={editedFileUrl}
            changeLoadingState={changeLoadingState}
          />
        ) : (
          <ImgDrop changeFile={(file) => setfileUrl(file)} />
        )}
      </main>
      <div className="sidemenu">
        <Upload handleChangeFile={handleChangeFile} downloadUrl={editedFileUrl} />

        <div className="input-container">
          <TextField
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
            className="input-field"
            id="filled-required"
            inputProps={{ className: classes.textField }}
          />
          <br />
          <br />
          <TextField
            value={newText2}
            onChange={(event) => setNewText2(event.target.value)}
            className="input-field"
            id="filled-required"
            inputProps={{ className: classes.textField }}
          />
        </div>

        <Button
          onClick={onClickGenerate}
          variant="contained"
          color="primary"
          className="thumb-btn"
          startIcon={<CreateIcon />}
        >
          생성
        </Button>
        <br />
        <br />
        <Button
          href={editedFileUrl}
          download="thumbnail"
          variant="contained"
          color="secondary"
          className="thumb-btn"
          startIcon={<SaveIcon />}
        >
          저장
        </Button>
      </div>
      <div className="footer">2020 © gameper.io</div>
      {isLoading && <Loading isStopped={!isLoading}/>}
    </div>
  );
};

export default App;
