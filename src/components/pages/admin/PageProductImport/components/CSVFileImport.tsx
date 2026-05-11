import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    if (!file) return;

    try {
      const authorizationToken = localStorage.getItem("authorization_token");
      if (!authorizationToken) {
        alert("Authorization token not found!");
        return;
      }

      const response = await axios.get(url, {
        params: { fileName: file.name },
        headers: {
          Authorization: `Basic ${authorizationToken}`,
        },
      });

      const signedUrl = response.data.url;
      const result = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "text/csv",
        },
      });

      if (result.ok) {
        alert("File uploaded successfully!");
      } else {
        alert(`File upload failed. HTTP status: ${result.status}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert(
            "401 Unauthorized: Please provide a valid authorization token."
          );
        } else if (error.response?.status === 403) {
          alert("403 Forbidden: Invalid authorization credentials.");
        } else {
          alert(
            "An error occurred while uploading the file. Check console logs."
          );
        }
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
