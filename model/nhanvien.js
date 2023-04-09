const mongoose = require('mongoose');

const NhanVienSchema = new mongoose.Schema({
    ten: {
        type: String,
       
    },
    diachi: {
        type: String
    },
    luong: {
        type: Number,
        default: 0
    }
})

const NhanVienModel =  mongoose.model('nhanvien', NhanVienSchema);

module.exports = NhanVienModel;