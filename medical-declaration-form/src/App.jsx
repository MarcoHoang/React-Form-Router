import React from 'react';
import { useFormik } from 'formik';
import './App.css';

// Hàm validate cho Formik
const validate = (values) => {
  const errors = {};

  if (!values.hoTen) errors.hoTen = 'Required';
  if (!values.soHoChieu) errors.soHoChieu = 'Required';
  if (!values.quocTich) errors.quocTich = 'Required';
  if (!values.tinhThanh) errors.tinhThanh = 'Required';
  if (!values.quanHuyen) errors.quanHuyen = 'Required';
  if (!values.phuongXa) errors.phuongXa = 'Required';
  if (!values.soNha) errors.soNha = 'Required';
  if (!values.dienThoai) errors.dienThoai = 'Required';

  // Validate Năm sinh
  if (!values.namSinh) {
    errors.namSinh = 'Required';
  } else if (parseInt(values.namSinh) <= 1900) {
    errors.namSinh = 'Năm sinh phải lớn hơn 1900';
  } else if (!/^\d+$/.test(values.namSinh)) {
      errors.namSinh = 'Năm sinh phải là số';
  }

  // Validate Email
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

function App() {
  const formik = useFormik({
    initialValues: {
      hoTen: '',
      soHoChieu: '',
      namSinh: '',
      gioiTinh: 'Nam', // Giá trị mặc định cho radio button
      quocTich: '',
      congTy: '',
      boPhan: '',
      coTheBaoHiem: false, // Giá trị mặc định cho checkbox
      tinhThanh: '',
      quanHuyen: '',
      phuongXa: '',
      soNha: '',
      dienThoai: '',
      email: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log(values); // In dữ liệu ra console để kiểm tra
      alert('Khai báo thành công!');
      resetForm();
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit} noValidate>
        <h1>Tờ khai y tế</h1>

        {/* Thông tin cá nhân */}
        <div className="form-group">
          <label htmlFor="hoTen">Họ tên</label>
          <input type="text" id="hoTen" name="hoTen" {...formik.getFieldProps('hoTen')} />
          {formik.touched.hoTen && formik.errors.hoTen && <p className="error">{formik.errors.hoTen}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="soHoChieu">Số hộ chiếu /CMND</label>
          <input type="text" id="soHoChieu" name="soHoChieu" {...formik.getFieldProps('soHoChieu')} />
          {formik.touched.soHoChieu && formik.errors.soHoChieu && <p className="error">{formik.errors.soHoChieu}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="namSinh">Năm sinh</label>
          <input type="number" id="namSinh" name="namSinh" {...formik.getFieldProps('namSinh')} />
          {formik.touched.namSinh && formik.errors.namSinh && <p className="error">{formik.errors.namSinh}</p>}
        </div>

        <div className="form-group">
          <label>Giới tính</label>
          <div className="radio-group">
            <label><input type="radio" name="gioiTinh" value="Nam" onChange={formik.handleChange} checked={formik.values.gioiTinh === 'Nam'} /> Nam</label>
            <label><input type="radio" name="gioiTinh" value="Nữ" onChange={formik.handleChange} checked={formik.values.gioiTinh === 'Nữ'} /> Nữ</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="quocTich">Quốc tịch</label>
          <input type="text" id="quocTich" name="quocTich" {...formik.getFieldProps('quocTich')} />
          {formik.touched.quocTich && formik.errors.quocTich && <p className="error">{formik.errors.quocTich}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="congTy">Công ty làm việc</label>
          <input type="text" id="congTy" name="congTy" {...formik.getFieldProps('congTy')} />
        </div>

        <div className="form-group">
          <label htmlFor="boPhan">Bộ phận làm việc</label>
          <input type="text" id="boPhan" name="boPhan" {...formik.getFieldProps('boPhan')} />
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="coTheBaoHiem" {...formik.getFieldProps('coTheBaoHiem')} checked={formik.values.coTheBaoHiem} />
              Có thẻ bảo hiểm y tế
            </label>
          </div>
        </div>
        
        {/* Địa chỉ liên lạc */}
        <h2>Địa chỉ liên lạc tại Việt Nam</h2>
        <div className="form-group">
          <label htmlFor="tinhThanh">Tỉnh thành</label>
          <input type="text" id="tinhThanh" name="tinhThanh" {...formik.getFieldProps('tinhThanh')} />
          {formik.touched.tinhThanh && formik.errors.tinhThanh && <p className="error">{formik.errors.tinhThanh}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="quanHuyen">Quận /huyện</label>
          <input type="text" id="quanHuyen" name="quanHuyen" {...formik.getFieldProps('quanHuyen')} />
          {formik.touched.quanHuyen && formik.errors.quanHuyen && <p className="error">{formik.errors.quanHuyen}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phuongXa">Phường /xã</label>
          <input type="text" id="phuongXa" name="phuongXa" {...formik.getFieldProps('phuongXa')} />
          {formik.touched.phuongXa && formik.errors.phuongXa && <p className="error">{formik.errors.phuongXa}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="soNha">Số nhà, phố, tổ dân phố /thôn /đội</label>
          <input type="text" id="soNha" name="soNha" {...formik.getFieldProps('soNha')} />
          {formik.touched.soNha && formik.errors.soNha && <p className="error">{formik.errors.soNha}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="dienThoai">Điện thoại</label>
          <input type="tel" id="dienThoai" name="dienThoai" {...formik.getFieldProps('dienThoai')} />
          {formik.touched.dienThoai && formik.errors.dienThoai && <p className="error">{formik.errors.dienThoai}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}
        </div>
        
        <button type="submit">Gửi tờ khai</button>
      </form>
    </div>
  );
}

export default App;