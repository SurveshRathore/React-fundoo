import { Button } from "@mui/material";
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import './TakeNoteTwo.css'
import React from "react";
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
// import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { InputBase } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import { useState } from "react";
import { AddNote } from "../../services/dataService";
import ColorPopper from "../colorPopper/ColorPopper";

function TakeNoteTwo (props) {

    const[data, setData] = useState( {noteTitle: '', noteDesciption: '', noteColor:'', noteIsArchive:false,noteIsPin:false, noteIsTrash:false, noteImage:''})
    //const[data, setData] = useState( {title: '', description: '', color:'', isArchived:false, isPined:false,isDeleted:false})

    const getTitle = (e) => {
        setData(prevState =>({
            ...prevState,
            noteTitle: e.target.value
        }))
        
    }

    const getDescription = (e) => {
        setData(prevState => ({
            ...prevState,
            noteDesciption: e.target.value
        }))
    }

    const submitData =() => {
        
        AddNote(data)
        .then((response)=>{
            console.log(response)
            props.autoRefresh()
        }).catch((error)=>{
            console.log(error)
        })
        props.listenToNoteTwo()
    }

    const listenToColor = (color) => {
        setData(prevState => ({
            ...prevState,
            noteColor: color
        }))
    }

    const archivedNote = () => {
        setData(prevState => ({
            ...prevState,
            noteIsArchive: true
        }))
        console.log("Note is added to Archived")
    }

    const pinnedNote = () =>{
        setData(prevState => ({
            ...prevState,
            isPined: true
        }))
        console.log("Note is pinned")
    }

    // const deleteNote = () =>{
    //     setData(prevState => ({
    //         ...prevState,
    //         isDeleted: true
    //     }))
    //     console.log("Note is deleted")
    // }
    
    return (
        <div className="takeNoteTwo" style={{backgroundColor:data.noteColor}}>
        <div className="titlebox">
        <InputBase id='textField' onChange={getTitle} type="text" placeholder='Title' />
        <PushPinOutlinedIcon onClick={pinnedNote}/>
            {/* <TextField id="outlined-basic" placeholder="Title" size="small" fullWidth /> */}
            
        </div>
        
        <div className="textbox">
        <InputBase id='textField' onChange={getDescription} type="text" placeholder='Take a note...' />
            {/* <TextField id="outlined-basic"  variant="standard" placeholder="Take a note..." size="small" fullWidth /> */}
        </div>
        <div className="textbox-icon">
            <AddAlertOutlinedIcon />
            <PersonAddAlt1OutlinedIcon />
            {/* <ColorLensOutlinedIcon /> */}
            <ColorPopper action="create" listenToColor={listenToColor}/>
            <ImageOutlinedIcon />
            <ArchiveOutlinedIcon onClick={archivedNote}/>
            <MoreVertOutlinedIcon />
            <UndoOutlinedIcon />
            <RedoOutlinedIcon />

            <Button variant="text" className="close-btn" onClick={submitData}>Close</Button>
        </div>
    </div>
    )
    

}

export default TakeNoteTwo
