import React from "react";
import './Moderation.css';
import StickyHeadTable from './table.js';

export const Moderation = () => {
    const columns = [
        { id: 'S.No', label: 'S.No', minWidth: 170 },
        { id: 'Semester', label: 'Semester', minWidth: 170 },
        { id: 'Batch', label: 'Batch', minWidth: 170 },
        { id: 'No of moderations', label: 'No of moderations', minWidth: 170 },
        { id: 'Status', label: 'Status', minWidth: 170 },
        { id: 'View moderation details', label: 'View moderation details', minWidth: 170 }
      ];
      const rows = [
          {"S.No":1,"Semester":7,'Batch':2020-24,'No of moderations':75,'Status':"Not completed",'View moderation details':""},
          {"S.No":1,"Semester":7,'Batch':2020-24,'No of moderations':75,'Status':"Completed",'View moderation details':""},
      ];
    return <div className="ModerationDetails">
        <StickyHeadTable columns={columns} rows={rows}  minHeight={400}/>
    </div>
}