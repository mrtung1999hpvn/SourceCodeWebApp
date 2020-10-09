import React,{useState} from 'react'

function EditWork({OnSubmit,todo}) {
    return (
        <div>
            <div>
                {/* Button trigger modal */}
                <button type="button" className="btn btn-white" data-toggle="modal" data-target={`#info${todo.ma_cong_viec}`}>
                    Chi tiết
                </button>
                {/* Modal */}
                <div className="modal fade" id={`info${todo.ma_cong_viec}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalScrollableTitle">{todo.ma_cong_viec}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            <span className="">{todo.mo_ta}</span>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default EditWork
