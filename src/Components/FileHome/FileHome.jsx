import React from "react";
import { useMantineTheme } from "@mantine/core";
import ConvertCard from "./ConvertCard";
import { useMediaQuery } from "@mantine/hooks";
import { selectUser } from "../Redux/UserContext/UserSlice";
import { useSelector } from "react-redux";

function FileHome() {
  const theme = useMantineTheme();
  const matches = useMediaQuery("(min-width: 900px)");

  const user = useSelector(selectUser);
  console.log("🚀 ~ file: FileHome.jsx ~ line 14 ~ FileHome ~ user", user);

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5rem",
        marginBottom: "1rem"
        // backgroundImage: "url('./background.svg') ",
        // backgroundPosition: "right bottom", /*Positioning*/
        // backgroundRepeat: "no-repeat"
      }}
    >
      <h1
        style={{
          textTransform: "capitalize",
        }}
      >
        Welcome {user.username}
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: matches ? "row" : "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "5rem",
          flexWrap: "wrap",
          marginBottom: "1rem"
        }}
      >
        <ConvertCard
          bannerImage={"./JPEG.png"}
          Heading={"Convert from JPEG to PDF"}
          Description={`With our best in class converter you don't need to worry no more, easily convert your awesome jpgs into a pdf file
        and share with the world`}
          Convertlink={'jpg-pdf'}
        />

        <ConvertCard
          bannerImage={"./PNG-PDF.png"}
          Heading={"Convert from PNG to PDF"}
          Description={`With our best in class converter you don't need to worry no more, easily convert your awesome jpgs into a pdf file
        and share with the world`}
        Convertlink={'png-pdf'}
        />

        <ConvertCard
          bannerImage={"./WORD-PDF.png"}
          Heading={"Convert from WORD to PDF"}
          Description={`With our best in class converter you don't need to worry no more, easily convert your awesome jpgs into a pdf file
        and share with the world`}
        Convertlink={'word-pdf'}
        />

        <ConvertCard
          bannerImage={"./PPTX-PDF.png"}
          Heading={"Convert from PPTX to PDF"}
          Description={`With our best in class converter you don't need to worry no more, easily convert your awesome jpgs into a pdf file
        and share with the world`}
        Convertlink={'pptx-pdf'}
        />
        <ConvertCard
          bannerImage={"./WORD-TXT.png"}
          Heading={"Convert from WORD to TXT"}
          Description={`With our best in class converter you don't need to worry no more, easily convert your awesome jpgs into a pdf file
        and share with the world`}
        Convertlink={'word-txt'}
        />
        <ConvertCard
          bannerImage={"./PDF-JPG.png"}
          Heading={"Convert from PDF to JPG"}
          Description={`With our best in class converter you don't need to worry no more, easily convert your awesome jpgs into a pdf file
        and share with the world`}
        Convertlink={'pdf-jpg'}
        />
      </div>
    </div>
  );
}

export default FileHome;
