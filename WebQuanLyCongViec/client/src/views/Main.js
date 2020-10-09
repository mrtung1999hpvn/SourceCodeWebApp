/** @format */

import React, { useState, useEffect,useRef } from 'react';
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
import LoadDing from '../assets/css/Loading/Load'
import Insert from '../component/Main/InsertWork';
import List from '../component/Main/ListWork';
// import Defaule from '../component/Main/Main'
function Main({ onExit, user }) {
    const [ListWork, SetListWork] = useState([]);
    const typingTimeoutRef = useRef(null)
    const [Loader,ShowLoader,HideLoader] = LoadDing()
	const Date = (str) => {
		if (str === null) {
			return '';
		} else {
			const t = str.toString();
			return (
				t[8] +
				t[9] +
				'-' +
				t[5] +
				t[6] +
				'-' +
				t[0] +
				t[1] +
				t[2] +
				t[3]
			);
		}
	};
	const TrangThai = (str) => {
		if (str === null) {
			return '';
		} else {
			return str[0] === '0'
				? 'Hoãn'
				: str[0] === '1'
				? 'Đang thực hiện'
				: str[0] === '2'
				? 'Hoàn thành'
				: 'Hủy';
		}
	};
	const [TongHoan, SetTongHoan] = useState([]);
	const [TongDangThucHien, SetTongDangThucHienn] = useState([]);
	const [TongHoanThanh, SetTongHoanThanh] = useState([]);
	const [TongHuy, SetTongHuy] = useState([]);
	const TongCacTrangThai = (data) => {
		let hoan = 0;
		let dangthuchien = 0;
		let hoanthanh = 0;
		let huy = 0;

		data.map((x) =>
			x.trang_thai === 'Hoãn'
				? hoan++
				: x.trang_thai === 'Đang thực hiện'
				? dangthuchien++
				: x.trang_thai === 'Hoàn thành'
				? hoanthanh++
				: x.trang_thai === 'Hủy'
				? huy++
				: 0
		);

		SetTongHoan(hoan);
		SetTongDangThucHienn(dangthuchien);
		SetTongHoanThanh(hoanthanh);
		SetTongHuy(huy);
	};
	const getListWork = async () => {
		try {
			const Data = [];
			const response = await fetch(
				'http://127.0.0.1:3001/cong-viec'
			);
			const getWork = await response.json();
			getWork.map((x) => {
				if (
					x.tai_khoan ===
					getTen(
						window.localStorage.getItem(
							'user'
						)
					)
				)
					Data.push({
						ma_nguoi_dung:
							x.ma_nguoi_dung,
						ten_cong_viec:
							x.ten_cong_viec,
						mo_ta: x.mo_ta,
						ngay_bat_dau: Date(
							x.ngay_bat_dau
						),
						trang_thai: TrangThai(
							x.trang_thai
						),
						ma_cong_viec:
							x.ma_cong_viec,
					});
            });
            ShowLoader()
            if(typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef.current) 
            }
            typingTimeoutRef.current = setTimeout(()=>
            {
			SetListWork(Data);
			console.log(Data);
            TongCacTrangThai(Data);
            HideLoader()
        },500)

		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getListWork();
	}, []);
	const getTen = (str) => {
		var kq = '';
		for (let i = 0; i < str.length; i++) {
			/^[A-Za-z0-9- ]*$/.test(str[i])
				? (kq += str[i])
				: (kq += '');
		}
		return kq;
	};
	const InsertSubmit = (a) => {
		const copyData = [...ListWork];
		copyData.push(a);
		SetListWork(copyData);
	};
	return (
		<>
			<div className='float-right'>
				<span>
					Xin chào người dùng{' '}
					{getTen(
						window.localStorage.getItem(
							'user'
						)
					)}
				</span>{' '}
				<button
					className='btn btn-primary'
					onClick={async () => {
						onExit(false);
					}}>
					Thoat
				</button>
			</div>

			<h3 className='text-center'>
				Quản lý công việc -{' '}
				{getTen(
					window.localStorage.getItem(
						'user'
					)
				)}
			</h3>
			<Row className='mt-2 ml-2'>
				<Col lg='8' className='mb-4'>
					<Card small className='mb-4'>
						<CardHeader className='border-bottom'>
							<h6 className='m-0'>
								Nhập
								liệu
							</h6>
						</CardHeader>
						<ListGroupItem className='p-3'>
							<Insert
								OnSubmit={
									InsertSubmit
								}></Insert>
						</ListGroupItem>
					</Card>
				</Col>
				<Col lg='3' className='mb-3'>
					<Card small className='mb-3'>
						<CardHeader className='border-bottom'>
							<h6 className='m-0'>
								Thông
								số
								công
								việc
							</h6>
						</CardHeader>
						<ListGroupItem className='p-3'>
							<Row>
								<span>
									Tổng
									hoãn
									:{' '}
									{
										TongHoan
									}
								</span>
							</Row>
							<Row>
								<span>
									Tổng
									đang
									thực
									hiện
									:{' '}
									{
										TongDangThucHien
									}
								</span>
							</Row>
							<Row>
								<span>
									Tổng
									hoàn
									thành
									:{' '}
									{
										TongHoanThanh
									}
								</span>
							</Row>
							<Row>
								<span>
									Tổng
									hủy
									:{' '}
									{
										TongHuy
									}
								</span>
							</Row>
						</ListGroupItem>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col lg='11' className='mb-4 ml-4'>
					<List Data={ListWork}></List>
				</Col>
			</Row>
            {Loader}
		</>
	);
}

export default Main;
