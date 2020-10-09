/** @format */

import React, { useState, useEffect } from 'react';

function _index({ NguoiDung, onCheckLogin, onCheckRegister, TenNguoiDung }) {
	const [user, SetUser] = useState([
		{
			_user: '',
			_pass: '',
		},
	]);
	const onclick = () => {
        if(user[0]._user.length < 20 
            && user[0]._pass.length < 20 
            && /^[A-Za-z0-9 ]*$/.test(user[0]._user)
            && /^[A-Za-z0-9 ]*$/.test(user[0]._pass))
            {
                console.log(user[0]._user + ' ' + user[0]._pass);
                var d = 0;
                for (let i = 0; i < NguoiDung.length; i++) {
                    if (
                        user[0]._user ===
                            NguoiDung[i].tai_khoan &&
                        user[0]._pass === NguoiDung[i].mat_khau
                    ) {
                        d++;
                        TenNguoiDung(user[0]._user);
                    } else {
                    }
                }
                if(d>0)
                {
                    onCheckLogin(true)
                    alert("Đăng nhập thành công")
                }
                else{
                    onCheckLogin(false)
                    alert("Đăng nhập thất bại")
                }
                
            }
            else{
                alert("Xem lại thông tin nhập")
            }

	};

	useEffect(() => {
		SetUser([
			{
				_user: '',
				_pass: '',
			},
		]);
	}, []);
	return (
		<>
			<div className='limiter'>
				<div className='container-login100'>
					<div className='wrap-login100'>
						<form className='login100-form validate-form p-l-55 p-r-55 p-t-178'>
							<span className='login100-form-title'>
								Quản
								lý
								công
								việc
								<br></br>
								Đăng
								nhập
							</span>

							<span>
								Tài
								khoản
							</span>
							<div
								className='wrap-input100 validate-input m-b-16'
								data-validate='Please enter username'>
								<input
									className='input100'
									type='text'
									name='username'
									placeholder='Tài khoản'
									onChange={(
										e
									) =>
										(user[0]._user =
											e.target.value)
									}
								/>
								<span className='focus-input100' />
							</div>
							<span>
								Mật
								khẩu
							</span>
							<div
								className='wrap-input100 validate-input'
								data-validate='Please enter password'>
								<input
									className='input100'
									type='password'
									name='pass'
									placeholder='Mật khẩu'
									onChange={(
										e
									) =>
										(user[0]._pass =
											e.target.value)
									}
								/>
								<span className='focus-input100' />
							</div>
							<div className='text-right p-t-13 p-b-23'>
								<span className='txt1'></span>
							</div>
							<div className='container-login100-form-btn'>
								<button
									className='login100-form-btn'
									onClick={
										onclick
									}>
									Đăng
									nhập
								</button>
								<div className='flex-col-c p-t-170 p-b-40'>
									<span className='txt1 p-b-9'>
										Bạn
										chưa
										có
										tài
										khoản
										?
									</span>
									<span
										onClick={async () => {
											onCheckRegister(
												true
											);
										}}
										className='txt3'
										style={{
											cursor:
												'pointer',
										}}>
										Tạo
										tài
										khoản
									</span>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default _index;
