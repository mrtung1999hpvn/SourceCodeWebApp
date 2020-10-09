/** @format */

import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	CardHeader,
	ListGroupItem,
	Alert,
	Form,
	FormGroup,
	FormFeedback,
	FormInput,
	FormSelect,
	FormTextarea,
} from 'shards-react';
function InsertWork({OnSubmit}) {
	const [ma_nguoi_dung, SetMaNguoiDung] = useState([]);
	const [ten_cong_viec, SetTenCongViec] = useState([]);
	const [mo_ta, SetMoTa] = useState([]);
	const [ngay_bat_dau, SetNgayBatDau] = useState([]);
    const [trang_thai, SetTrangThai] = useState([]);
    const getTen =(str)=>{
        var kq = ""
        for(let i=0;i<str.length;i++)
        {
            /^[A-Za-z0-9- ]*$/.test(str[i]) ? kq += str[i] : kq += ""
        }
        return kq
    }
    const _OnInsert = async()=>{
        try {
            const tai_khoan = getTen(window.localStorage.getItem('user'))
            const body ={tai_khoan,ma_nguoi_dung,ten_cong_viec,mo_ta,ngay_bat_dau,trang_thai}
            console.log(body);
            OnSubmit(body)
            const response = await fetch("http://127.0.0.1:3001/cong-viec", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
              });
              
              alert("Thêm thành công");
              SetTenCongViec("");
              SetMoTa("");
              SetNgayBatDau("")
              SetTrangThai("")
        } catch (error) {
            console.error(error)
        }
    }
	return (
		<div>
			<Row>
				<Col>
					<span>Tên công việc</span>
					<FormInput
						type='text'
						placeholder='Công việc'
                        required
                        value={ten_cong_viec}
						onChange={(e) =>
							SetTenCongViec(
								e
									.target
									.value
							)
						}
						valid={
							ten_cong_viec.length <
							50
								? true
								: false
						}
						invalid={
							ten_cong_viec.length <
							50
								? false
								: true
						}></FormInput>
					<FormFeedback
						valid={
							ten_cong_viec.length <
							50
								? true
								: false
						}
						invalid={
							ten_cong_viec.length <
							50
								? false
								: true
						}>
						{ten_cong_viec.length <
						50
							? 'Xác nhận'
							: 'Bạn nhập quá 50 ký tự'}
					</FormFeedback>
				</Col>
				<Col>
					<span>Ngày bắt đầu</span>
					<FormInput
                        type='date'
                        value={ngay_bat_dau}
						valid={
							ngay_bat_dau.length >
							0
								? true
								: false
						}
						invalid={
							ngay_bat_dau.length >
							0
								? false
								: true
						}
						onChange={(e) =>
							SetNgayBatDau(
								e
									.target
									.value
							)
						}></FormInput>
					<FormFeedback
						valid={
							ngay_bat_dau.length >
							0
								? true
								: false
						}
						invalid={
							ngay_bat_dau.length >
							0
								? false
								: true
						}>
						{ngay_bat_dau.length >
						0
							? 'Xác nhận'
							: 'Bạn chọn ngày bắt đầu'}
					</FormFeedback>
				</Col>
			</Row>
			<Row>
				<Col>
					<span>Trạng thái</span>
                    <FormSelect type='area'
                    value={trang_thai}
                    valid={
                        trang_thai.length >0 ? true : false
                    }
                    invalid={
                        trang_thai.length >0 ? false : true
                    }
                    onChange={async e=>SetTrangThai(e.target.value)}
                    >
                        <option value={''}>{'Mặc định'}</option>
						<option value={'0'}>
							{'Hoãn'}
						</option>
						<option value={'1'}>
							{'Đang thực hiện'}
						</option>
						<option value={'2'}>
							{'Hoàn thành'}
						</option>
                        <option value={'3'}>
							{'Hủy'}
						</option>
					</FormSelect>
                    <FormFeedback
                        valid={
                            trang_thai.length >0 ? true : false
                        }
                        invalid={
                            trang_thai.length >0 ? false : true
                        } 
                    >{
                        trang_thai ==='Mặc định' ? "Xác nhận" : "Bạn chưa chọn trạng thái"
                    }</FormFeedback>
				</Col>
				<Col>
					<span>Mô tả</span>
                    <FormTextarea type='text'
                    value={mo_ta}
                    onChange={e=>SetMoTa(e.target.value)}
                    valid ={
                        mo_ta.length >0 ? true : false
                    }
                    invalid ={
                        mo_ta.length >0 ? false : true
                    }
                    ></FormTextarea>
                    <FormFeedback
                    valid ={
                        mo_ta.length >0 ? true : false
                    }
                    invalid ={
                        mo_ta.length >0 ? false : true
                    }
                    >
                        {
                            mo_ta.length >0 ? "Xác nhận" : "Bạn chưa nhập phần mô tả"
                        }
                    </FormFeedback>
				</Col>
			</Row>
			<Row className='mt-3'>
				<Col></Col>

				<Col>
					<button className='btn btn-primary' onClick={_OnInsert}>
						Thêm
					</button>
				</Col>
			</Row>
		</div>
	);
}

export default InsertWork;
