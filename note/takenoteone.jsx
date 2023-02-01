import React from "react";
import { InputBase } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import BrushIcon from '@mui/icons-material/Brush';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import './TakeNoteOne.css'

function TakeNoteOne (props) {

    const openTakeNoteTwo = () => {
        props.listenToNoteOne()
    }
    return (
        <div className="addNote">
            <InputBase id='textField' onClick={openTakeNoteTwo} type="text" placeholder='Take a note...' />
            <div className='imgBlock'>
                <CheckBoxOutlinedIcon  />
                <BrushIcon />
                <ImageOutlinedIcon  />
            </div>
        
        
        
      
            {/* <TextField id="outlined-basic" placeholder="Take a note..." size="small" fullWidth 
            InputProps={{
                endAdornment:<InputAdornment position='end'>
                    <CheckBoxOutlinedIcon />
                    <BrushIcon />
                 <ImageIcon/>

                </InputAdornment>,
                
            }} 
            />  */}

    </div>
    )
    

}

export default TakeNoteOne
