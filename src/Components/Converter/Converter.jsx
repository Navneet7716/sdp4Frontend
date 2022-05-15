import {
  Group,
  Text,
  useMantineTheme,
  MantineTheme,
  Title,
  Input,
  Button,
  Paper,
  Progress,
  Skeleton,
  Transition,
  GroupedTransition,
  List,
  ThemeIcon,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import {
  Upload,
  Photo,
  X,
  Icon as TablerIcon,
  CircleCheck,
  ExternalLink,
} from "tabler-icons-react";
import {
  IMAGE_MIME_TYPE,
  PDF_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  MS_POWERPOINT_MIME_TYPE,
} from "@mantine/dropzone";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { selectIsToken, selectUser } from "../Redux/UserContext/UserSlice";

function Converter() {
  const { type } = useParams();

  const user = useSelector(selectUser);
  const token = useSelector(selectIsToken);

  console.log("🚀 ~ file: Converter.jsx ~ line 49 ~ Converter ~ type", type);
  const controller = new AbortController();
  const [filename, setFilename] = useState("");
  const [originalFilenameURL, setOriginalFilenameURL] = useState("");
  const [files, setFiles] = useState(null);
  const [enableUpload, setEnableUpload] = useState(true);
  const [loading, setLoading] = useState(false);

  const [convertedFile, setConvertedFile] = useState("");
  const [convertedFileLink, setConvertedFileLink] = useState("");

  const [image, setImage] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const [success, setSuccess] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState("");

  const [cleared, setCleared] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [submitfailure, setsubmitfailure] = useState(false);

  let allowedMimeType;

  if (type == "jpg-pdf") {
    allowedMimeType = IMAGE_MIME_TYPE;
  } else if (type == "png-pdf") {
    allowedMimeType = IMAGE_MIME_TYPE;
  } else if (type == "word-pdf") {
    allowedMimeType = MS_WORD_MIME_TYPE;
  } else if (type == "word-txt") {
    allowedMimeType = MS_WORD_MIME_TYPE;
  } else if (type == "pptx-pdf") {
    allowedMimeType = MS_POWERPOINT_MIME_TYPE;
  } else if (type == "pdf-jpg") {
    allowedMimeType = PDF_MIME_TYPE;
  }

  const HandleFileChange = async (e) => {
    setEnableUpload(false);
    setFiles(e.target.files[0]);
    console.log(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  console.log("BRUHH", user);

  const HandleClear = () => {
    controller.abort();
    setCleared((prev) => !prev);
    setEnableUpload(true);
    setFiles(null);
    setFilename("");
    setSuccess(false);
    setLoading(false);
    setLoadingButton(false);
    setEnableUpload(false);
  };

  const HandleUpload = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setLoadingButton(true);
      setEnableUpload(true);

      let form = new FormData();

      form.append("file", files, filename);
      form.append("ConversionType", `${type.toUpperCase()}`);

      setTimeout(() => {
        showNotification({
          title: "Success",
          message: "Hey, your file got uploaded!!",
          color: "green",
        });
      }, 2000);

      let res = await axios.post("http://localhost:4001/convert", form, {
        onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
        signal: controller.signal,
      });

      console.log(res);

      // setImage(res.data.publicUrl);
      setConvertedFile(res.data.filenameConvertedFile);
      setConvertedFileLink(res.data.publicUrlConvertedFile);
      setOriginalFilenameURL(res.data.publicUrl);

      setSuccess(true);

      showNotification({
        title: "Success",
        message: "Hey, your file got Converted!!",
        color: "green",
      });
      setSuccessMessage("File Upload Successfull ✅");
      setLoading(false);
      setLoadingButton(false);

     

      let userData = {
        email: user.email,
        file_name: res.data.filenameConvertedFile,
        file_size: files.size,
        file_type: `${convertedFile.split(".")[1]}`,
        file_url: res.data.publicUrlConvertedFile,
        old_name: files.name,
        old_url: res.data.publicUrl,
      };

      let res2 = await axios.post("http://localhost:8000/api/auth/update/", {...userData}, {
        headers: {
          Authorization: "Bearer " + token
        }
      }); 
      setFiles(null);
      console.log(res2)
    }
  };

  const theme = useMantineTheme();
  return (
    <div>
      <Title order={1}> Thanks for using convertIt</Title>

      <Paper shadow="md" mt={"md"} withBorder radius={"sm"}>
        {loading && <Progress value={100} animate />}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            margin: "1.4rem",
          }}
        >
          <Title order={3}> Select your file 📃</Title>
          <Input
            disabled={loading}
            accept={allowedMimeType}
            type={"file"}
            variant="default"
            placeholder="Default variant"
            onChange={(e) => HandleFileChange(e)}
          />
          <Button
            onClick={HandleUpload}
            loading={loading}
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 105 }}
          >
            Upload
          </Button>
          <Button
            onClick={HandleClear}
            variant="gradient"
            gradient={{ from: "red", to: "orange" }}
          >
            Clear
          </Button>
        </div>
      </Paper>

      <GroupedTransition
        mounted={loading}
        transitions={{
          modal: {
            duration: 500,
            transition: "fade",
            timingFunction: "ease",
          },
          overlay: {
            duration: 500 / 2,
            transition: "fade",
            timingFunction: "ease",
          },
        }}
      >
        {(styles) => (
          <Paper
            shadow="md"
            mt={"md"}
            withBorder
            radius={"sm"}
            style={styles.modal}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                margin: "1.4rem",
                ...styles.overlay,
              }}
            >
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
            </div>
          </Paper>
        )}
      </GroupedTransition>

      <GroupedTransition
        mounted={success}
        transitions={{
          modal: {
            duration: 500,
            transition: "slide-down",
            timingFunction: "ease",
          },
          overlay: {
            duration: 500 / 2,
            transition: "fade",
            timingFunction: "ease",
          },
        }}
      >
        {(styles) => (
          <Paper
            shadow="md"
            mt={"md"}
            withBorder
            radius={"sm"}
            style={styles.modal}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                margin: "1.4rem",
                ...styles.overlay,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Title order={3}>Conversion Successfull ✅</Title>

              <div>
                <List
                  spacing="md"
                  icon={
                    <ThemeIcon color="teal" size={24} radius="xl">
                      <CircleCheck size={16} />
                    </ThemeIcon>
                  }
                >
                  <List.Item>Original File Name : {filename}</List.Item>
                  <List.Item>
                    Original File URL :{" "}
                    <Button
                      component="a"
                      href={originalFilenameURL}
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan" }}
                      size="xs"
                      leftIcon={<ExternalLink size={14} />}
                    >
                      Download
                    </Button>
                  </List.Item>
                  <List.Item>Converted File Name : {convertedFile}</List.Item>
                  <List.Item>
                    Converted File URL :{" "}
                    <Button
                      component="a"
                      href={convertedFileLink}
                      size="xs"
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan" }}
                      leftIcon={<ExternalLink size={14} />}
                    >
                      Download
                    </Button>
                  </List.Item>
                </List>
              </div>
            </div>
          </Paper>
        )}
      </GroupedTransition>
    </div>
  );
}

export default Converter;
