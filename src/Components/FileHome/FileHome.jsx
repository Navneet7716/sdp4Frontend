import React from 'react'
import { useMantineTheme } from '@mantine/core';
import PdftoJpeg from './PdftoJpeg';
import { useMediaQuery } from '@mantine/hooks';


function FileHome() {

    const theme = useMantineTheme();
    const matches = useMediaQuery("(min-width: 900px)");

    const secondaryColor = theme.colorScheme === 'dark'
      ? theme.colors.dark[1]
      : theme.colors.gray[7];
  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
        gap:"5rem"
    }}>
        
    <h1>Welcome</h1>

    <div style={{
        display: "flex",
        flexDirection: matches ? "row" : "column",
        justifyContent: "center",
        alignItems:"center",
        gap:"5rem"

    }}>
    <PdftoJpeg />
    <PdftoJpeg />
    <PdftoJpeg />

    </div>

    </div>
  )
}

export default FileHome