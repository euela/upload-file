import React, { useState, useRef } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    VStack,
    Textarea
  } from '@chakra-ui/react'
import Dropzone from 'react-dropzone';
import axios from 'axios';

const Upload = (props) => {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const API_URL = 'http://localhost:4000';

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  }
  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
  
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };
  // const handleTest = async(e) => {
  //   e.preventDefault()
  //   const {data} = await axios.get('/api/trial')
  //   console.log(data)
  // }
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);
  
          setErrorMsg('');
          await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };


  return (
        <VStack spacing="5px" style={{border:'2px solid gray',padding:'18px',borderRadius:'8px',marginTop:'4px'}}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <FormControl style={{display:'flex',justifyItems:'center',alignItems:"center"}}>
                <FormLabel>Title</FormLabel>
                <Input 
                  type="text"
                  name="title"
                  value={state.title || ''}
                  placeholder="Enter title"
                  onChange={handleInputChange}/>
            </FormControl>
            <FormControl style={{display:'flex',justifyItems:'center',alignItems:"center"}}>
                <FormLabel>Description</FormLabel>
                <Textarea 
                name="description"
                value={state.description || ''}
                placeholder="Enter description"
                onChange={handleInputChange}
                />
            </FormControl>
          <div className="border-2 border-dashed p-8 rounded-lg border-gray-400">
            <Dropzone onDrop={onDrop} 
             onDragEnter={() => updateBorder('over')}
             onDragLeave={() => updateBorder('leave')}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                  <input {...getInputProps()} />
                  <p className='text-gray-400'>Drag and drop a file OR click here to select a file</p>
                  {file && (
                    <div>
                      <strong>Selected file:</strong> {file.name}
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
            {previewSrc ? (
              isPreviewAvailable ? (
                    <div className="w-96 h-60 m-4 rounded-lg overflow-hidden">
                      <img className="w-96 h-60" src={previewSrc} alt="Preview" />
                    </div>
                    ) : (
                      <div className="preview-message">
                        <p>No preview available for this file</p>
                      </div>
                    )
                    ) : (
                      <div className="preview-message">
                        <p className='text-gray-400' >Image preview will be shown here after selection</p>
                      </div>
                    )}
                  </div>
                <Button colorScheme='teal' variant='outline' onClick={handleOnSubmit} style={{margin:"4px"}}>
                Submit
                </Button>
            </VStack>
  );
};

export default Upload;