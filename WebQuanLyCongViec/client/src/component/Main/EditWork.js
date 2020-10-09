import React,{useState} from 'react'
import {FormSelect} from 'shards-react'

function EditWork({OnSubmit,todo}) {

    const [ma_nguoi_dung, SetMaNguoiDung] = useState([]);
	const [ten_cong_viec, SetTenCongViec] = useState(todo.ten_cong_viec);
	const [mo_ta, SetMoTa] = useState(todo.mo_ta);
	const [ngay_bat_dau, SetNgayBatDau] = useState(todo.ngay_bat_dau);
    const [trang_thai, SetTrangThai] = useState(todo.trang_thai);
    const [_submit,Setsubmit] = useState(false)
    const OnClickEdit = async(e)=>{
        e.preventDefault();
        try {
            const ma_cong_viec = todo.ma_cong_viec
            const body = {ma_cong_viec,ten_cong_viec,mo_ta,ngay_bat_dau,trang_thai}
            OnSubmit(body)
            Setsubmit(true)
            Setsubmit(false)
            const response = await fetch("http://127.0.0.1:3001/cong-viec"+`/${todo.ma_cong_viec}`,
            {
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body : JSON.stringify(body)
            })
        } catch (error) {
            console.error(error.message)
        }
    }
   
    return (
        <div>
            <div>
                {/* Button trigger modal */}
                <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.ma_cong_viec}`}>
                    Sửa
                </button>
                {/* Modal */}
                <div className="modal fade" id={`id${todo.ma_cong_viec}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">{todo.ma_cong_viec}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            <span className="">Tên công việc</span>
                            <input type="text" className="form-control mb-3" value={ten_cong_viec} onChange={e => SetTenCongViec(e.target.value)}></input>
                            <span className="">Mô tả</span>
                            <input type="text" className="form-control mb-3" value={mo_ta} onChange={e => SetMoTa(e.target.value)}></input>
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
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Đóng</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal"
                        disabled={_submit}
                        onClick={
                            e => OnClickEdit(e)
                        }>Lưu</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default EditWork
