/** @format */

import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import Edit from './EditWork'
import Info from './InfoWork'
import Delete from './DeleteWork'
function ListWork({ Data }) {
	    const TrangThai =(str)=>{
        if(str===null)
        {
            return ""
        }
        else{
            return ((str[0]==="0") ? "Hoãn" :
            (str[0]==="1") ? "Đang thực hiện" :
            (str[0]==="2") ? "Hoàn thành" : "Hủy" 
            )
        }
    }
	const [ListData, SetListData] = useState([]);
	useEffect(() => {
		SetListData(Data);
	}, [Data]);
	const EditSubmit = (a)=>{
		a.trang_thai = TrangThai(a.trang_thai)
		console.log(a.trang_thai)
		const copyData = [...ListData]
		const dataEdit = copyData.findIndex(DT => DT.ma_cong_viec === a.ma_cong_viec)
		  copyData.splice(dataEdit,1,a)
		  SetListData(copyData)
	}

	const DeleteSubmit = (a)=>{
	const copyData = [...ListData]
	const index = copyData.findIndex(DT => DT.ma_cong_viec === a.ma_cong_viec)
	copyData.splice(index,1)
	SetListData(copyData)
	}
	const columns = [
		{
			label: 'Tên công việc',
			name: 'ten_cong_viec',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			label: 'Ngày bắt đầu',
			name: 'ngay_bat_dau',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name:'Mô tả',
			  options: {
				filter: true,
				sort: true,
				empty: true,
				customBodyRenderLite: (dataIndex,rowIndex) => {
				  return (
					<Info todo={ListData[dataIndex]}></Info>
				  );
				}
			  }
		  },
		{
			name: 'trang_thai',
			label: 'Trạng thái',
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "Sửa",
			  options: {
				filter: true,
				sort: true,
				empty: true,
				customBodyRenderLite: (dataIndex,rowIndex) => {
				  return (
					<Edit todo={ListData[dataIndex]} OnSubmit={EditSubmit}></Edit>
				  );
				}
			  }
		  },
		  {
			name: "Xóa",
			  options: {
				filter: true,
				sort: true,
				empty: true,
				customBodyRenderLite: (dataIndex,rowIndex) => {
				  return (
					<Delete todo={ListData[dataIndex]} onSubmit={DeleteSubmit}></Delete>
				  );
				}
			  }
		  },
	];

    const options = {
        filter: true,
        filterType: 'checkbox',
        responsive: 'vertical',
      // customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
      //   return (
      //     <CustomFooter
      //       count={count}
      //       page={page}
      //       rowsPerPage={rowsPerPage}
      //       changeRowsPerPage={changeRowsPerPage}
      //       changePage={changePage}
      //       textLabels={textLabels}
      //     />
      //   );
      // },
      onDownload: (buildHead, buildBody, columns, data) => {
        return "\uFEFF" + buildHead(columns) + buildBody(data); 
      },
      print:true,
      viewColumns:true,
       download:true,
       downloadOptions:{
        filename:'loaidoituong.csv',
        filterOptions :{
          useDisplayedRowsOnly:true,
          useDisplayedColumnsOnly:true,
        }
       }
     }
  
	return (
		<div>
			<MUIDataTable
				title={'Employee List'}
				data={ListData}
				columns={columns}
				options={options}
			/>
		</div>
	);
}

export default ListWork;
