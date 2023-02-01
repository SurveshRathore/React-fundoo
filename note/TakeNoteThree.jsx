import './TakeNoteThree.css'
import React, { useState } from "react";
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
// import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ColorPopper from '../colorPopper/ColorPopper';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { archivedNotes, trashNote, updateNoteApi } from '../../services/dataService';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { InputBase } from '@mui/material';

function TakeNoteThree (props) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

     const [noteDetails, setNoteDetails] = useState({noteId: '', noteTitle: '', noteDesciption: '', noteColor:'', noteIsArchive:false,noteIsPin:false, noteIsTrash:false, noteImage:''})
      const [open, setOpen] = React.useState(false);
        const handleOpen = (noteData) => {
            console.log(noteData)
            setOpen(true);
            setNoteDetails({
                noteId: noteData.noteId, 
                noteTitle: noteData.noteTitle, 
                noteDesciption: noteData.noteDesciption,
                noteColor: noteData.noteColor
            })
        } 
  const handleClose = () => setOpen(false);

    const listenToColorUpdate = () => {
        props.autoRefresh()
    }

    const archiveNotes = (id) => {
        let archiveObj = {
            NoteId: [id],
            //noteIsArchive: true
        } 
        console.log(archiveObj)
        
        archivedNotes(archiveObj)
        .then((response)=>{
            props.autoRefresh()
            console.log(response)
        })
        .catch((error)=>{

            console.log(error)
        })
    }
    const trashNotes = (id) => {
        console.log(id)
        let trashNoteObj = {
            NoteId: [id],
            //noteIsTrash: true
        }
        console.log(trashNoteObj)
        trashNote(trashNoteObj)
        .then((response)=>{
            props.autoRefresh()
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })   
    }

    const takingTitle = (e) => {
        setNoteDetails(prevState =>({
            ...prevState,
            noteTitle: e.target.value
            
        }))
        
    }

    const takingDesciption = (e) => {
        setNoteDetails(prevState => ({
            ...prevState,
            noteDesciption: e.target.value
        }))
    }
// setNoteDetails(prevState => ({
        //     ...prevState,
        //     noteColor: props.note.noteColor,
        //     noteImage: props.note.noteImage
        // }))
    const updateNote = () => {
        
        setOpen(false)
        updateNoteApi(noteDetails)

        .then((response)=>console.log(response))
        .catch((error)=>console.log(error))

        props.autoRefresh()
    }

    return (
        <div className="displayNote" style={{backgroundColor:props.note.noteColor}}>
        <div className="titlebox">
            <span onClick={() => handleOpen(props.note)}>{props.note.noteTitle} </span>
            <PushPinOutlinedIcon/>
        </div>
        <div className='description-box'>
        <span onClick={() => handleOpen(props.note)}>{props.note.noteDesciption}</span>
        </div>
        
        <div className="textbox-icon">
            <AddAlertOutlinedIcon />
            <PersonAddAlt1OutlinedIcon />
            <ColorPopper action="update" listenToColorUpdate={listenToColorUpdate} id={props.note.noteId}  />
            {/* <ColorLensOutlinedIcon /> */}
            <DeleteForeverRoundedIcon onClick={() => trashNotes(props.note.noteId)}/>
            {/* <ImageOutlinedIcon /> */}
            <ArchiveOutlinedIcon onClick = {() => archiveNotes(props.note.noteId)}/>
            <MoreVertOutlinedIcon />
           
        </div>

        
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box style={{backgroundColor: noteDetails.noteColor}}>
                <Box>
                    <InputBase onChange={takingTitle} defaultValue={noteDetails.noteTitle}/>
                    <InputBase onChange={takingDesciption} defaultValue={noteDetails.noteDesciption} />
                </Box>
                <Box style={{display: 'flex',flexDirection: 'row', width:'100%',height: '30%',justifyContent: 'space-between',}}>
                    <Box style={{display: 'flex',flexDirection: 'row',}}>
                        <AddAlertOutlinedIcon />
                        <PersonAddAlt1OutlinedIcon />
                        <ColorPopper action="update" listenToColorUpdate={listenToColorUpdate} id={noteDetails.noteId}  />
                        <ImageOutlinedIcon /> 
                        <ArchiveOutlinedIcon onClick = {() => archiveNotes(noteDetails.noteId)}/>
                        <MoreVertOutlinedIcon />
                    </Box>
                    <Box>
                        <Button varient="text" onClick={updateNote} >Close</Button>
                    </Box>
                    
                </Box>
            </Box>
            
            
        </Box>
      </Modal>
    </div>
    )
    

}

export default TakeNoteThree
