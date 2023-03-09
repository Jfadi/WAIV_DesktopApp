import React from 'react'
import { AiFillDelete } from 'react-icons/ai';

const NotesList = ({list, setDataTable, onDelete}) => {
  return (
    <div className='table-container'>    
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Student ID</th>
            <th>Date of service</th>
            <th>Service Type</th>
            <th>Contact type</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {list.map( (n,i) => (
            <tr>
                <td>{i + 1}</td>
                <td>{n.student}</td>
                <td>{n.Date}</td>
                <td>{n.service}</td>
                <td>{n.Contact}</td>
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