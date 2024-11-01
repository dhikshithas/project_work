import './ModerationMark.css';
import { MaterialTable } from './MaterialTable.js';
import Button from '@mui/material/Button';

export const ModerationMark = ()=>{
    const columns = [
        { accessorKey: 'id', header: 'S.no', size: 170,enableEditing: false },
        { accessorKey: 'Name', header: 'Name', size: 170,enableEditing: false },
        { accessorKey: 'Roll number', header: 'Roll number', size: 170, enableEditing: false },
        { accessorKey: 'Moderation mark', header: 'Moderation mark', size: 170, enableEditing: true },
      ];
      const rows = [
          {"id":1,"Name":'Baskar T','Roll number':'7376201CS114','Moderation mark':null},
          {"id":2,"Name":'Pavithra lakshmi R','Roll number':'7376221EC224','Moderation mark':null},
      ];
    return <div className='ModerationForm'>
        <MaterialTable columns={columns} rows={rows}/>
        <Button variant="contained" className='submit'>Submit</Button>
        </div>
}