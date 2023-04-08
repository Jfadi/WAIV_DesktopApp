import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable';
import NotesList from './NotesList';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
// import {exportToExcel} from '../createExcel'
import { serviceTypeList, CMSList, term, beneficiariesList, contactType, contactBy, regardsTo } from '../staticData'
const ipcRenderer = window.require("electron").ipcRenderer;

const Note = () => {
    const [cmsFlag, setcmsFlag] = useState(false)
    const [dataTable, setDataTable] = useState([])
    const [serviceType, setServiceType] = useState('')
    const [cms, setCMS] = useState('')
    const [campusTerm, setCampusTerm] = useState('')
    const [date, setDate] = useState('')
    const [beneficiarie, setBeneficiarie] = useState('')
    const [contact, setContact] = useState('')
    const [contacter, setContacter] = useState('')
    const [inRegardsTo, setInRegardsTo] = useState('')
    const [note, setNote] = useState('')
    const [studentId, setStudentID] = useState('')

    ipcRenderer.on('recieveData', (event, data) => {
        // 'Data from main process!'
        let temp = []
        if ( (data === null) || (data === undefined)) {
            // Do nothing
        } else {
            Object.keys(data).forEach(element => {
                temp.push(data[element]);
            });
            setDataTable([...dataTable, ...temp])
        }

    });

    // useEffect(() => {
    //     ipcRenderer.send("test",dataTable)
    // }
    //   , [dataTable]);
    useEffect(() => {
        ipcRenderer.send("get", "notes")
    }, []);

    const handleDelete = (id) => {
        console.log('deleted id ' + id )
        setDataTable(dataTable.filter(data => data.id !== id))
        ipcRenderer.send("delete",id)
    }

    const handlechange = (field, e) => {
        switch (field) {
            case 'service':
                if (e) {
                    setServiceType(e.value);
                } else {
                    setServiceType('');
                }
                break;
            case 'CMS':
                if (e) {
                    setCMS(e.value);
                } else {
                    setCMS('');
                }
                break;
            case 'term':
                if (e) {
                    setCampusTerm(e.value);
                    if (e.value === "Spring 2023"){
                        setCMS("2232")
                    } else if (e.value === "Summer 2023"){
                        setCMS("2233")
                    } else if (e.value === "Fall 2023"){
                        setCMS("2234")
                    } else if (!(e.value ==="")) {
                        setcmsFlag(true)
                        setCMS("")
                    }
                } else {
                    setCampusTerm('');
                }
                break;
            case 'beneficiarie':
                if (e) {
                    setBeneficiarie(e.value);
                } else {
                    setBeneficiarie('');
                }
                break;
            case 'contactType':
                if (e) {
                    setContact(e.value);
                } else {
                    setContact('');
                }
                break;
            case 'contactBy':
                if (e) {
                    setContacter(e.value);
                } else {
                    setContacter('');
                }
                break;
            case 'regardsTo':
                if (e) {
                    setInRegardsTo(e.value);
                } else {
                    setInRegardsTo('');
                }
                break;
            default:
                break; 
        }
    }
    const addNote = (serviceType, cms, campusTerm, date, beneficiarie, contact ,contacter, inRegardsTo, note, studentId) => {
        if (!serviceType || !cms ||  !campusTerm ||  !date ||  !beneficiarie ||  !contact  || !contacter ||  !inRegardsTo ||  !note){
            // alert('All fields are required.')
            ipcRenderer.send("alert")

            return;
        }

        
        const caseNote = {
            id: uuidv4(),
            Date: date,
            Campus_term: campusTerm,
            cms: cms,
            Who_was_contacted: beneficiarie,
            By_who: contacter,
            In_regards_to: inRegardsTo,
            Note: note,
            Contact: contact, 
            service: serviceType,
            student: studentId
        }
        setDataTable([...dataTable, caseNote])
    }

    const saveNotes = (dataTable) => {
        ipcRenderer.send("set", dataTable)
    }
    const clearNotes = () => {
        ipcRenderer.send("clear")
        setDataTable([])
    }
    
  return (
    <div >
        <div style={{color : "black", backgroundColor : "#1d8fbc"}}>
            <h3>Case Note</h3>
            <form>
                <div className='note_setup'>
                    <label>Student ID:</label>
                    <input 
                        className='datepick'
                        type="text" 
                        required 
                        value={studentId}
                        onChange={ (e) => setStudentID(e.target.value) }
                    ></input>
                    <label>Service Type:</label>
                    <CreatableSelect
                        onChange={(e) => {
                        handlechange('service',e)}}
                        options={serviceTypeList}
                        isClearable 
                    ></CreatableSelect>
                    <label>Campus Term:</label>
                    <CreatableSelect
                        onChange={(e) => {
                        handlechange('term',e)}}
                        options={term}
                        isClearable
                    >
                    </CreatableSelect>
                    { cmsFlag ? (<label>CMSTerm:</label>) : null}
                    { cmsFlag ? (                    
                        <CreatableSelect
                            onChange={(e) => {
                            handlechange('CMS',e)}}
                            options={CMSList}
                            isClearable
                        >
                        </CreatableSelect>) 
                    : null}
                </div>
                <div className='createNote'>
                    <p>On </p>
                        <input 
                            placeholder="e.g. 10/11/2019"
                            className='datepick'
                            type="text" 
                            required 
                            value={date}
                            onChange={ (e) => setDate(e.target.value) }
                        ></input>
                    <p>, the </p>
                    <CreatableSelect
                        onChange={(e) => {
                        handlechange('beneficiarie',e)}}
                        options={beneficiariesList}
                        isClearable
                    >
                    </CreatableSelect>
                    <p> was contacted via </p>
                    <CreatableSelect
                        onChange={(e) => {
                        handlechange('contactType',e)}}
                        options={contactType}
                        isClearable
                    >
                    </CreatableSelect>
                    <p> by </p>
                    <CreatableSelect
                        onChange={(e) => {
                        handlechange('contactBy',e)}}
                        options={contactBy}
                        isClearable
                    >
                    </CreatableSelect>
                    <p> in regards to </p>
                    <CreatableSelect
                        onChange={(e) => {
                        handlechange('regardsTo',e)}}
                        options={regardsTo}
                        isClearable
                    >
                    </CreatableSelect>
                </div>
                <div className='note'>
                <label style={{padding: '1rem'}}>Note:</label>
                <textarea
                    className='datepick'
                    required
                    style={{width: '530px',height: '37px'}}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>
                </div>
            </form>
            <div className='btns'>
                <button className='button' onClick={()=>saveNotes(dataTable)}>Save</button>
                <button className='button' onClick={()=>addNote(serviceType, cms, campusTerm, date, beneficiarie, contact ,contacter, inRegardsTo, note, studentId)}>Add Note</button>
                <button className='delete_btn' onClick={()=>clearNotes()}>Delete All Notes</button>

                {/* <button className='button' onClick={()=>exportExcel(dataTable)}>Export</button> */}
            </div>
        </div>
        <div style={{color : "black"}}>
            <NotesList list={dataTable} setDataTable={setDataTable} onDelete={handleDelete}/>
        </div>
    </div>
  )
}

export default Note