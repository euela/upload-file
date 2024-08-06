import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'
const API_URL = 'https://upload-file-server-five.vercel.app';
const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getFilesList();
  }, []);

  const getFilesList = async () => {
    try {
      const { data } = await axios.get('/'+API_URL+'/api/getAllFiles');
      setErrorMsg('');
      setFilesList(data);
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get('/'+API_URL+`/api/download/${id}`,{
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Table variant='striped' className="files-table">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Download File</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filesList.length > 0? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <Tr key={_id}>
                  <Td style={{textAlign:'center'}} className="file-title">{title}</Td>
                  <Td  className="file-description">{description}</Td>
                  <Td style={{textAlign:'center'}}>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                      className='text-md text-gray-900  border-2 border-gray-300 border-dashed p-2 rounded-md '
                    >
                      Download
                    </a>
                  </Td>
                </Tr>
              )
            )
          ) : (
            <Tr>
              <Td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default FilesList;