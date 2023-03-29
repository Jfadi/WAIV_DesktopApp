import React from 'react'
import { CSVLink } from "react-csv";
import { AiFillDelete } from 'react-icons/ai';

const NotesList = ({list, setDataTable, onDelete}) => {
  const headers = [
    { label: "#", key: "id" },
    { label: "CSULB_ID", key: "student" },
    { label: "CMSTerm", key: "cms" },
    { label: "CampusTerm", key: "Campus_term" },
    { label: "DateofService", key: "Date" },
    { label: "ServiceType", key: "service" },
    { label: "StaffProvidingService", key: "By_who" },
    { label: "ServiceRegarding", key: "In_regards_to" },
    { label: "ContactType", key: "Contact" },
    { label: "ContactPerson", key: "Who_was_contacted" },
    { label: "Notes", key: "Note" }
  ];

  return (
    <div className='table-container'>    
      <CSVLink data={list} headers={headers}>Download CSV</CSVLink>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>CSULB_ID</th>
            <th>CMSTerm</th>
            <th>CampusTerm</th>
            <th>Date of service</th>
            <th>ServiceType</th>
            <th>StaffProvidingService</th>
            <th>ServiceRegarding</th>
            <th>ContactType</th>
            <th>ContactPerson</th>
            <th>Notes</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map( (n,i) => (
            <tr key={n.id}>
                <td>{i + 1}</td>
                <td>{n.student}</td>
                <td>{n.cms}</td>
                <td>{n.Campus_term}</td>
                <td>{n.Date}</td>
                <td>{n.service}</td>
                <td>{n.By_who}</td>
                <td>{n.In_regards_to}</td>
                <td>{n.Contact}</td>
                <td>{n.Who_was_contacted}</td>
                <td>{n.Note}</td>
                <td style={{textAlign: 'center'}}><button 
                  onClick={() => onDelete(n.id)}
                ><AiFillDelete/></button></td>
            </tr>
        ))}
        </tbody>
      </table>     
      <ul>

      </ul>
    </div>
    
  )
}

export default NotesList
