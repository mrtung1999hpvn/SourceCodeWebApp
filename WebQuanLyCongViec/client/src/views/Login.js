/** @format */

import React, { useState, useEffect } from 'react';
import Login from '../component/Login/index';
import Register from '../component/Register/index';

function _Login({ _onCheckLogin ,TenNguoiDung}) {
    const [NguoiDung, SetNguoiDung] = useState([]);
	const [register, Setregister] = useState(false);
	const getuser = async () => {
		try {
			const response = await fetch(
				'http://127.0.0.1:3001/nguoi_dung',
			); // Get
			const jsonData = await response.json();
			SetNguoiDung(jsonData);
		} catch (error) {
			console.error(error);
		}
	};
	const onCheckLogin = (e) => {
		_onCheckLogin(e);
	};
	useEffect(() => {
		getuser();
	}, []);
	const onCheckRegister = (e) => {
		Setregister(e);
    };
    const _TenNguoiDung =(e)=>{
		
        TenNguoiDung(e)
    }
	if (!register) {
		return (
			<>
				<Login
                TenNguoiDung={_TenNguoiDung}
					NguoiDung={NguoiDung}
					onCheckLogin={onCheckLogin}
					onCheckRegister={
						onCheckRegister
					}></Login>
			</>
		);
	} else {
		return (
			<Register
            NguoiDung={NguoiDung}
				onCheckRegister={
					onCheckRegister
				}></Register>
		);
	}
}

export default _Login;
