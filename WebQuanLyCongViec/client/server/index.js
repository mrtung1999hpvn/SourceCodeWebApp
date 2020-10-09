const express = require('express')
const cors = require('cors')
const pool = require('./pgconnect')

const app = express()
const port = 3001

app.use(cors())
app.use(express.json());

app.use(cors());
app.listen(port, ()=>{
  console.log("Port : "+port)
})

//Xu ly
const MaND = (str) =>{
  const testma = [];var vttestma = 0
  const Input = [];
  var MAX = 0;var K ="";
  
  if(str.length===0)
  {
      return "CV0001"
  }
  else{
      for(let i=0;i<str.length;i++)
      {
          K = str[i].ma_cong_viec
          
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
        return "CV" + "0".repeat(4-(MAX+1).toString().length)+ (MAX+1)
      }
      else{
        return "CV" + "0".repeat(4-(parseInt(testma[0])+1).toString().length)+ ((parseInt(testma[0])+1))
      }
  }
  
}

//#region Cong viec
app.get("/cong-viec",async(req,res)=>{
  try {
    const {tai_khoan} = req.body
    const newTodo = await pool.query("select * from tbl_cong_viec as a , tbl_nguoi_dung as b where a.ma_nguoi_dung = b.ma_nguoi_dung")
    res.json(newTodo.rows);
  } catch (error) {
      console.error(error.message) 
   }
})
app.post("/cong-viec" , async(req,res)=>{
  //Them
  try{
    const listcv = await pool.query(`select * from tbl_cong_viec`)
    const {tai_khoan,ma_nguoi_dung,ten_cong_viec,mo_ta,ngay_bat_dau,trang_thai} = req.body;
    const newTodo = await pool.query(
`      insert into tbl_cong_viec(ma_nguoi_dung,ten_cong_viec,mo_ta,ngay_bat_dau,trang_thai,ma_cong_viec)
      values (
        (select ma_nguoi_dung from tbl_nguoi_dung where tai_khoan = '`+tai_khoan+`'),
        '`+ten_cong_viec+`',
        N'`+mo_ta+`',
        '`+ngay_bat_dau+`',
        '`+trang_thai+`',
        '`+MaND(listcv.rows)+`'
      )	`
    )
    res.json(newTodo)
  }
catch (error) {
  console.error(error.message) 
}
})
app.put("/cong-viec/:id" , async(req,res)=>{
  //Sua
  const {ma_cong_viec,ten_cong_viec,mo_ta,trang_thai} = req.body;
  var _trang_thai = (
    trang_thai==="Hoãn" ? "0" :
    trang_thai==="Đang thực hiện" ? "1" : 
    trang_thai==="Hoàn thành" ? "2" :
    trang_thai==="Hủy" ? "3" : ""
  )
    
    const UpdateLoaiDoiTuong = await pool.query(
      `update tbl_cong_viec set trang_thai=N'`+_trang_thai+`',ten_cong_viec =N'`+ten_cong_viec+`', mo_ta=N'`+mo_ta+`' where ma_cong_viec = '`+ma_cong_viec+`'`
    )
})

app.delete("/cong-viec/:id" , async(req,res)=>{
  const {id} = req.params
  const UpdateLoaiDoiTuong = await pool.query(
  `delete from tbl_cong_viec where ma_cong_viec = N'`+id+`'`
  )
  console.log(id)
  })



//#endregion


//Nguoi Dung*******************************
app.get("/nguoi_dung",async(req,res)=>{
  try {
    const newTodo = await pool.query("select * from tbl_nguoi_dung")
    res.json(newTodo.rows);
  } catch (error) {
      console.error(error.message) 
   }
})

app.post("/nguoi_dung" , async(req,res)=>{
  //Them
  try{
    const {ma_nguoi_dung,tai_khoan,mat_khau} = req.body;
    const newTodo = await pool.query(
`          INSERT into tbl_nguoi_dung(ma_nguoi_dung,tai_khoan,mat_khau)
      values (N'`+ma_nguoi_dung+`',N'`+tai_khoan+`',N'`+mat_khau+`')`
    )
    console.log(req.body)
    res.json(newTodo)
  }
catch (error) {
  console.error(error.message) 
}
})

///*************************************** */




