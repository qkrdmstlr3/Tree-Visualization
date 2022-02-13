import React, {useState} from 'react';
import ModalContainer from '../../Container/ModalContainer';
import * as Style from './styled';
import { createDatas } from '../../../api/data';

function CreateModal() {
    const [userFile, setUserFile] = useState({
        file: [],
        previewURL: "",
    });

    const [userData, setUserData] = useState({
        date: null,
        lng: 0,
        lat: 0
    });

    const uploadFile = (e) => {
        e.stopPropagation();
        let reader = new FileReader();
        let file = e.target.files[0];
        const fileList = Array.from(e.target.files);
      
        reader.onloadend = () => {
            setUserFile({
            file: fileList,
            previewURL: reader.result,
          });
        };
      
        if (file) {
          reader.readAsDataURL(file);
        }
    };
            
    let fileExt = userFile.file[0]?.name.split('.').pop().toLowerCase();
    let extList = ["mp4", "jpg", "png", "jpeg"];
    let preview = null;

    if ((userFile.file.length !== 0) && extList.includes(fileExt)) {
        preview = userFile.file[0]?.type.includes("image/") ? (
            <Style.ImgFile name="dataset" src={userFile.previewURL} />
        ) : (
            <Style.VideoFile name="dataset" src={userFile.previewURL} controls/>
        );
    }

    const inputData = (e, key) => {
        setUserData({
            ...userData,
            [key]: e.target.value
        });
    };

    const createDataset = () => {
        const formData = new FormData();
        formData.append('dataset', userFile.file[0]);

        const postData = {
            dataset: formData,
            date: userData.date,
            lat: userData.lat,
            lng: userData.lng
          };
          createDatas(postData);
    };

    return (
    <ModalContainer active>
        <Style.Container>
            <Style.Form name="user-data" method="post">
                <Style.FileContainer>
                    {preview}
                </ Style.FileContainer>
                <Style.FileInput
                        id="upload-file"
                        type="file"
                        accept="image/*, video/*"
                        multiple
                        onChange={uploadFile}
                        >
                </Style.FileInput>
                <Style.UploadBtn htmlFor="upload-file">
                    Select a file
                </Style.UploadBtn>
                <Style.InputContainer>
                    <Style.UserData>
                        <Style.userInputLabel htmlFor="date">Date</Style.userInputLabel >
                        <Style.userInput type="date" id="date" name="date" value={userData.date} onChange={(e) => inputData(e, 'date')}/>
                    </Style.UserData>
                    <Style.UserData>
                        <Style.userInputLabel  htmlFor="lng">Longitude</Style.userInputLabel >
                        <Style.userInput type="number" id="lng" name="lng" value={userData.lng} onChange={(e) => inputData(e, 'lng')}/>
                    </Style.UserData>
                    <Style.UserData>
                        <Style.userInputLabel  htmlFor="lat">Latitude</Style.userInputLabel >
                        <Style.userInput type="number" id="lat" name="lat" value={userData.lat} onChange={(e) => inputData(e, 'lat')}/>
                    </Style.UserData>
                </Style.InputContainer>
                <Style.SubmitBtn type="submit" value="Submit" onSubmit={createDataset}></Style.SubmitBtn>
            </Style.Form>
        </Style.Container>
    </ModalContainer>
    )
}

export default CreateModal;