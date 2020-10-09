import React , {useState,useEffect,useRef} from 'react'


function XoaLoaiDoiTuong({todo,onSubmit}) {
    const [_submit,Setsubmit] = useState(false)
    
    const OnClickDelete = async (id) =>{
        try {
            const ma_cong_viec = todo.ma_cong_viec
            const body = {ma_cong_viec}
            onSubmit(body)
            Setsubmit(true)
            Setsubmit(false)
            alert("Xóa thành công")
            const response = await fetch(`http://127.0.0.1:3001/cong-viec/${id}`,
            {
               method:"DELETE",
            })
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
    <div>
  {/* Button trigger modal */}
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target={`#ldt${todo.ma_cong_viec}`}>
                Xóa
            </button>
            {/* Modal */}
            <div className="modal fade" id={`ldt${todo.ma_cong_viec}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{todo.ma_cong_viec}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div className="modal-body">
                <span>Bạn muốn xóa công viêc {todo.ma_cong_viec} ?</span>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                    disabled={_submit}
                    onClick={() => OnClickDelete(todo.ma_cong_viec)}>Xóa</button>
                    </div>
                </div>
                </div>
            </div>
            </div>

    )
}

export default XoaLoaiDoiTuong