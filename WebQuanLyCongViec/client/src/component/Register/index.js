import React,{useState} from 'react'

function _index({onCheckRegister,NguoiDung}) {
    const MaND = (str) =>{
        const testma = [];var vttestma = 0
        const Input = [];
        var MAX = 0;var K ="";
        
        if(str.length===0)
        {
            return ""
        }
        else{
            for(let i=0;i<str.length;i++)
            {
                K = str[i].ma_nguoi_dung
                
              for(let j=0;j<K.length;j++)
              {
                  if(Input[i]==="undefined") (Input[i] = '')
                  else{
                      (/^[0-9]*$/).test(K[j]) ? Input[i] += K[j] : Input[i]+=''
                  }
              }
              if(MAX < parseInt(Input[i])) MAX = parseInt(Input[i])
            }
            Input.sort()
            for(let i =0;i < Input.length-1;i++)
            {
              for(let j=0;j <= parseInt(Input[Input.length-1]);j++)
              {
                  if(Input[i] !== j && Input[i+1] === j+1)
                  {
                    testma[vttestma] = Input[i]
                    vttestma++
                  }
              }
            }
            if(testma.length===0)
            {
              return "ND" + "0".repeat(4-(MAX+1).toString().length)+ (MAX+1)
            }
            else{
              return "ND" + "0".repeat(4-(parseInt(testma[0])+1).toString().length)+ ((parseInt(testma[0])+1))
            }
        }
        
    }
    const [user,SetUser] = useState([
        {
        _user : "",
        _pass : "",
        }
    ])
    console.log(MaND(NguoiDung))
    const onsubmit = async()=>{
        try {
            const body = {
                ma_nguoi_dung : MaND(NguoiDung),
                tai_khoan : user[0]._user,
                mat_khau : user[0]._pass,
            }
            const response = await fetch("http://127.0.0.1:3001/nguoi_dung", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
              });
              console.log(body);
              alert("Đăng ký thành công")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="limiter">
        <div className="container-login100">
            <div className="wrap-login100">
            <form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                <span className="login100-form-title">
                Quản lý công việc<br>
                </br>Đăng ký
                </span>
                <span>Tài khoản</span>
                <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                <input className="input100" type="text" name="username" placeholder="Tài khoản" 
                onChange={e=>user[0]._user=e.target.value}/>
                <span className="focus-input100" />
                </div>

                <span>Mật khẩu</span>
                <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                
                <input className="input100" type="text" name="username" placeholder="Mật khẩu" 
                />
                <span className="focus-input100" />
                </div>

                <span>Nhập lại mật khẩu</span>
                <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                
                <input className="input100" type="text" name="username" placeholder="Nhập lại mật khẩu" 
                onChange={e=>user[0]._pass=e.target.value}
                />
                <span className="focus-input100" />
                
                </div>
                <div className="text-right p-t-13 p-b-23">
                <span className="txt1">
                </span>
                </div>
                <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={onsubmit}>
                    Đăng ký
                </button>
                </div>
                <div className="flex-col-c p-t-170 p-b-40">
                <span onClick={async ()=>{
                    onCheckRegister(false)
                }} className="txt3" style={{cursor:"pointer"}}>
                    Trang đăng nhập
                </span>
                </div>
            </form>
            </div>
        </div>
        </div>


    )
}

export default _index
