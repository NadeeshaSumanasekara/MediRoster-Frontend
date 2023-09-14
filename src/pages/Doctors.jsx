import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { doctorsData, doctorsGrid } from '../data/dummy';
import { Header } from '../components';

const Doctors = () => {
  const selectionsettings = { persistSelection: true }; 
  const editing = { allowDeleting: true, allowEditing: true };

  const handleCalendar = () => {
    window.location.href = '/calendar';  
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <Header title="Doctors" />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full h-12 w-full sm:w-auto">
          Add Doctor
        </button>
      </div>
      <GridComponent
        dataSource={doctorsData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings} 
        editSettings={editing}
        allowSorting
        onClick={handleCalendar}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {doctorsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Doctors;
