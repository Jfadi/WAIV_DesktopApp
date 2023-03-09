import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable';
import NotesList from './NotesList';
import uuid from 'react-uuid';

// const Store = require('electron-store');
// const storage = new Store();

const serviceTypeList = [
    { value: 'employment Preparation', label: 'Employment Preparation' },
    { value: 'job development, placement, and retention', label: 'Job development, placement, and retention' },
    { value: 'communication information', label: 'Communication information' },
    { value: 'dOR Application', label: 'DOR Application' },
    { value: 'monthly Report of Progress', label: 'Monthly Report of Progress' }
];
const CMSList = [
    { value: '2232', label: '2232' },
    { value: '2233', label: '2233' },
    { value: '2234', label: '2234' }
];
const term = [
    { value: 'Spring 2023', label: 'Spring 2023' },
    { value: 'Summer 2023', label: 'Summer 2023' },
    { value: 'Fall 2023', label: 'Fall 2023' }
];
const beneficiariesList = [
    { value: 'Student', label: 'Student' },
    { value: 'WAIV Student Assistant', label: 'WAIV Student Assistant' },
    { value: 'DOR-QRP, Counselor', label: 'DOR-QRP, Counselor' },
    { value: 'WAIV Employment Services Specialist, Robert Wendt', label: 'WAIV Employment Services Specialist, Robert Wendt' },
    { value: 'WAIV Employment Services Specialist, Rosa Trujillo', label: 'WAIV Employment Services Specialist, Rosa Trujillo' },
    { value: 'WAIV Employment Services Specialist, Angi Carrillo-Humphreys', label: 'WAIV Employment Services Specialist, Angi Carrillo-Humphreys' },
    { value: 'WAIV Employment Services Specialist, Mathew Gonzales', label: 'WAIV Employment Services Specialist, Mathew Gonzales' },
    { value: 'WAIV Employment Support Services Coordinator, Shauna Hagemann', label: 'WAIV Employment Support Services Coordinator, Shauna Hagemann' },
    { value: 'WAIV Program Case Manager, Karen Kinsley', label: 'WAIV Program Case Manager, Karen Kinsley' },
    { value: 'WAIV Program Case Manager, Domonique Rood', label: 'WAIV Program Case Manager, Domonique Rood' },
    { value: 'WAIV Accommodation & Retention Counselor, Jericho Padilla', label: 'WAIV Accommodation & Retention Counselor, Jericho Padilla' },
    { value: 'WAIV Accommodations & Retention Counselor, Jen Schwartz', label: 'WAIV Accommodations & Retention Counselor, Jen Schwartz' },
];
const contactType = [
    { value: 'Email', label: 'Email' },
    { value: 'Virtual Meeting', label: 'Virtual Meeting' },
    { value: 'Mail', label: 'Mail' },
    { value: 'Phone (spoke to)', label: 'Phone (spoke to)' },
    { value: 'Phone (left message)', label: 'Phone (left message)' },
    { value: 'In-person meeting', label: 'In-person meeting' }
];
const contactBy = [
    { value: 'Nikkia Pannell, WA IV Staff', label: 'Nikkia Pannell, WA IV Staff' },
    { value: 'the student', label: 'the student' },
    { value: 'WAIV Student Assistant', label: 'WAIV Student Assistant' },
    { value: 'Robert Wendt, WAIV Employment Services Specialist', label: 'Robert Wendt, WAIV Employment Services Specialist' },
    { value: 'Rosa Trujillo, WAIV Employment Services Specialist', label: 'Rosa Trujillo, WAIV Employment Services Specialist' },
    { value: 'Angi Carrillo-Humphreys, WAIV Employment Services Specialist', label: 'Angi Carrillo-Humphreys, WAIV Employment Services Specialist' },
    { value: 'Mathew Gonzales, WAIV Employment Services Specialist', label: 'Mathew Gonzales, WAIV Employment Services Specialist' },
    { value: 'Natalie Smerkanich, WAIV Employer/Job Developer', label: 'Natalie Smerkanich, WAIV Employer/Job Developer' },
    { value: 'Gabriel Wilson, WAIV Program Assistant', label: 'Gabriel Wilson, WAIV Program Assistant' },
    { value: 'Domonique Rood, WAIV Program Case Manager', label: 'Domonique Rood, WAIV Program Case Manager' },
    { value: 'Jericho Padilla, WAIV Accommodation & Retention Counselor', label: 'Jericho Padilla, WAIV Accommodation & Retention Counselor' },
    { value: 'Jen Schwartz, WAIV Accommodations & Retention Counselor', label: 'Jen Schwartz, WAIV Accommodations & Retention Counselor' },
    { value: 'Jessica Wood, Support Services Coordinator', label: 'Jessica Wood, Support Services Coordinator' },
    { value: 'Mary Nguyen, WAIV Support Services Director', label: 'Mary Nguyen, WAIV Support Services Director' }
];

const regardsTo = [
    { value: 'Case Review Meeting', label: 'Case Review Meeting' },
    { value: 'QRP case staffing', label: 'QRP case staffing' },
    { value: 'intake and orientation to WAIV Program', label: 'intake and orientation to WAIV Program' },
    { value: 'internship search strategies', label: 'internship search strategies' },
    { value: 'employment search strategies', label: 'employment search strategies' },
    { value: 'job leads', label: 'job leads' },
    { value: 'resume development', label: 'resume development' },
    { value: 'resume review', label: 'resume review' },
    { value: 'job application process', label: 'job application process' },
    { value: 'interview skills and preparation', label: 'interview skills and preparation' },
    { value: 'referral to CDC WAIV staff', label: 'referral to CDC WAIV staff' },
    { value: 'referral to BMAC WAIV staff', label: 'referral to BMAC WAIV staff' },
    { value: 'Event Notification', label: 'Event Notification' },
    { value: 'Internship or Employment Documentation', label: 'Internship or Employment Documentation' },
    { value: 'workplace accommodations and disability management', label: 'workplace accommodations and disability management' },
    { value: 'DOR closed letter', label: 'DOR closed letter' },
    { value: 'Participant\'s Progress Towards IPE Goal/ Contract Services', label: 'Participant\'s Progress Towards IPE Goal/ Contract Services' },
];

const Note = () => {
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

    const handleDelete = (id) => {
        console.log('deleted id ' + id )
        setDataTable(dataTable.filter(data => data.id !== id))
    }

    // const handleSave = (id) => {
    //     console.log('saved id ' + id)
    //     storage.set('myId' , id)
    // }

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
        // if (!serviceType || !cms ||  !campusTerm ||  !date ||  !beneficiarie ||  !contact  || !contacter ||  !inRegardsTo ||  !note){
        //     alert('All fields are required.')
        //     return;
        // }
        const caseNote = {
            id: uuid(),
            Date: date,
            Campus_term: campusTerm,
            Who_was_contacted: beneficiarie,
            By_who: contacter,
            In_regards_to: inRegardsTo,
            Note: note,
            Contact: contact, 
            service: serviceType,
            student: studentId
        }
        setDataTable([...dataTable, caseNote])
        console.log(studentId)
        console.log(dataTable)
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
                    <label>CMSTerm:</label>
                    <CreatableSelect
                        onChange={(e) => {
                        handlechange('CMS',e)}}
                        options={CMSList}
                        isClearable
                    >
                    </CreatableSelect>
                    <label>Campus Term:</label>
                    <CreatableSelect
                        onChange={(e) => {
                        handlechange('term',e)}}
                        options={term}
                        isClearable
                    >
                    </CreatableSelect>
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
            <button className='button' onClick={()=>addNote(serviceType, cms, campusTerm, date, beneficiarie, contact ,contacter, inRegardsTo, note, studentId)}>Add Note</button>
            {/* <button className='button' onClick={()=>handleSave(dataTable[1].id)}>Add Note</button>            */}
        </div>
        <div style={{color : "black"}}>
            <NotesList list={dataTable} setDataTable={setDataTable} onDelete={handleDelete}/>
        </div>
    </div>
  )
}

export default Note