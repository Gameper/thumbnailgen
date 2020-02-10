import React, { useState, useEffect, useCallback } from "react";
import Jimp from "jimp";

interface IProps {
  renderedText: string;
  renderedText2: string;
  imgSrc: string;
  editedImgSrc: string;
  fontPath: string;

  changeFile: (url: string) => void;
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

  return await textCanvas3.print(font, wi, 0, coloredText).color([ { apply: "xor", params: [ color ] } ]);
};
const EditorCanvas: React.FC<IProps> = ({
  fontPath,
  renderedText,
  renderedText2,
  imgSrc,
  changeFile,
  editedImgSrc
}) => {
  useEffect(
    () => {
      Jimp.read(imgSrc, async (err, imgLoaded) => {
        const fontHeight = 50;
        const bottomX = 10;
        const bottomY = 0;
        const shadowOffset = 4;
        // get text
        console.log(`[TEXT FROM PROPS]${renderedText}`);

        const textCanvasHeight = 500;
        const textCanvasWidth = 1000;
        let transparentColor: number = await (Jimp as any).rgbaToInt(100, 100, 0, 0.5);
        let textCanvas = await new Jimp(textCanvasWidth, textCanvasHeight, transparentColor);
        // img resize
        await imgLoaded.resize(1280, 720);
        // load font
        // const fontPath = `${process.env.PUBLIC_URL}/nanum/nanum.fnt`;

        let font = await Jimp.loadFont(fontPath);
        // print text to the bottom line

        let orangeColor = "#ffd042";
        let whiteColor = "#ffffff";
        let blackColor = "#000000";

        // first line
        let separator = renderedText.indexOf(" ");
        let shadow = await createColoredText(font, renderedText, blackColor, renderedText);
        let text2 = await createColoredText(font, renderedText, whiteColor, renderedText.slice(0, separator));
        let text3 = await createColoredText(font, renderedText, orangeColor, renderedText.slice(separator));

        let separator2 = renderedText2.indexOf(" ");
        let shadow2 = await createColoredText(font, renderedText2, blackColor, renderedText2);
        let text22 = await createColoredText(font, renderedText2, orangeColor, renderedText2.slice(0, separator2));
        let text32 = await createColoredText(font, renderedText2, whiteColor, renderedText2.slice(separator2));

        let secondOffset = textCanvasHeight - 100;
        let firstOffset = textCanvasHeight - 200;
        let textCanvasIndent = 5;
        await textCanvas.composite(shadow, shadowOffset, shadowOffset + firstOffset);
        await textCanvas.composite(text2, textCanvasIndent, firstOffset);
        await textCanvas.composite(text3, textCanvasIndent, firstOffset);

        await textCanvas.composite(shadow2, shadowOffset, shadowOffset + secondOffset);
        await textCanvas.composite(text22, textCanvasIndent, secondOffset);
        await textCanvas.composite(text32, textCanvasIndent, secondOffset);

        // resize text
        const compositBottomX = 10;
        const compositBottomY = imgLoaded.getHeight() - textCanvasHeight - 10;
        await imgLoaded.composite(textCanvas, compositBottomX, compositBottomY);

        let imgBase64 = await imgLoaded.getBase64Async(Jimp.MIME_PNG);
        changeFile(imgBase64);
      });
    },
    [ imgSrc, renderedText, renderedText2, fontPath ]
  );

  return (
    <div>
      <img width="auto" height="auto" src={editedImgSrc} alt="editorImg" />
    </div>
  );
};
const invertHex = (hex: string) => {
  hex = hex.slice(1);
  let hexString = (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1).toUpperCase();
  return `#${hexString}`;
};

export default EditorCanvas;
