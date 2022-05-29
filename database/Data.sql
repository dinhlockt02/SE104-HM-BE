use hotelmanagement;

INSERT INTO LOAIPHONG(MaLoaiPhong, TenLoaiPhong, DonGia) VALUES ('LP001', 'Phòng Loại 1', 100000);
INSERT INTO LOAIPHONG(MaLoaiPhong, TenLoaiPhong, DonGia) VALUES ('LP002', 'Phòng Loại 2', 200000);
INSERT INTO LOAIPHONG(MaLoaiPhong, TenLoaiPhong, DonGia) VALUES ('LP003', 'Phòng Loại 3', 300000);

INSERT INTO TINHTRANG(MaTinhTrang, TenTinhTrang) VALUES ('TT001', 'Phòng trống');
INSERT INTO TINHTRANG(MaTinhTrang, TenTinhTrang) VALUES ('TT002', 'Phòng đang sử dụng');

INSERT INTO PHONG(MaPhong,TenPhong,MaLoaiPhong,MaTinhTrang) VALUES('P001', 'Phòng 1', 'LP001', 'TT001');
INSERT INTO PHONG(MaPhong,TenPhong,MaLoaiPhong,MaTinhTrang) VALUES('P002', 'Phòng 2', 'LP001', 'TT001');
INSERT INTO PHONG(MaPhong,TenPhong,MaLoaiPhong,MaTinhTrang) VALUES('P003', 'Phòng 3', 'LP002', 'TT001');
INSERT INTO PHONG(MaPhong,TenPhong,MaLoaiPhong,MaTinhTrang) VALUES('P004', 'Phòng 4', 'LP002', 'TT001');
INSERT INTO PHONG(MaPhong,TenPhong,MaLoaiPhong,MaTinhTrang) VALUES('P005', 'Phòng 5', 'LP002', 'TT001');
INSERT INTO PHONG(MaPhong,TenPhong,MaLoaiPhong,MaTinhTrang) VALUES('P006', 'Phòng 6', 'LP003', 'TT001');

INSERT INTO LOAIKHACH(MaLoaiKhach, TenLoaiKhach, HeSoPhuThu) VALUES('LK001', 'Nội Địa', 1.0);
INSERT INTO LOAIKHACH(MaLoaiKhach, TenLoaiKhach, HeSoPhuThu) VALUES('LK002', 'Nước ngoài', 1.5);

INSERT INTO THAMSO(MaThamSo, TenThamSo, GiaTri) VALUES ('MTS01' ,'SoKhachToiDa', 3);
INSERT INTO THAMSO(MaThamSo, TenThamSo, GiaTri) VALUES ('MTS02' ,'SoKhachKhongPhuThu', 2);

INSERT INTO TILEPHUTHU(SoKhach, TiLePhuThu) VALUES (3, 0.25);

INSERT INTO NHOMNGUOIDUNG(MaNhom,TenNhom,CapBac) VALUES ('NGD001', 'Admin', 0);
INSERT INTO NGUOIDUNG(MaNguoiDung,HoTen,Email,MatKhau,MaNhom) VALUES ('ND001', 'Master Admin', 'daijoubuteam7@gmail.com', '$2a$10$7o5r3t6h2Jd5nh5cT34vSeBvJdkev9PGtT8wQtxF5xuvHQv/lU/Ai', 'NGD001');

INSERT INTO NHOMNGUOIDUNG(MaNhom,TenNhom,CapBac) VALUES ('NGD002', 'User', 1);
INSERT INTO NGUOIDUNG(MaNguoiDung,HoTen,Email,MatKhau,MaNhom) VALUES ('ND002', 'User 1', 'dinhlockt02@gmail.com', '$2a$10$7o5r3t6h2Jd5nh5cT34vSeBvJdkev9PGtT8wQtxF5xuvHQv/lU/Ai', 'NGD002');
INSERT INTO NGUOIDUNG(MaNguoiDung,HoTen,Email,MatKhau,MaNhom) VALUES ('ND003', 'User 2', 'quangnguyen221202@gmail.com', '$2a$10$7o5r3t6h2Jd5nh5cT34vSeBvJdkev9PGtT8wQtxF5xuvHQv/lU/Ai', 'NGD002');
INSERT INTO NGUOIDUNG(MaNguoiDung,HoTen,Email,MatKhau,MaNhom) VALUES ('ND004', 'User 3', 'phuquang14722@gmail.com', '$2a$10$7o5r3t6h2Jd5nh5cT34vSeBvJdkev9PGtT8wQtxF5xuvHQv/lU/Ai', 'NGD002');

-- HOADON 1 02/04/2022 - 04/04/2022
-- PhieuThuePhong No 1(2 KhachNoiDia, Phong Loai 1) 
INSERT INTO PHIEUTHUEPHONG(MaPhieuThuePhong, NgayBatDauThue, MaPhong, SoKhach, DonGiaThueTrenNgay, DaXoa) VALUES ('PTP001','2022-04-02', 'P001', 2, 100000, true);
INSERT INTO CTPHIEUTHUEPHONG(MaCTPhieuThuePhong, MaPhieuThuePhong, CMND, TenKhachHang, DiaChi, MaLoaiKhach) VALUES ('CTPTP001', 'PTP001', '233316142', 'Trần Đình Lộc', 'KTX Khu A' ,  'LK001');
INSERT INTO CTPHIEUTHUEPHONG(MaCTPhieuThuePhong, MaPhieuThuePhong, TenKhachHang, MaLoaiKhach) VALUES ('CTPTP002', 'PTP001', 'Nguyễn Văn An', 'LK001');

INSERT INTO HOADON(MaHoaDon, KhachHang_CoQuan, DiaChi, NgayLap, TongTien) VALUES ('HD001', 'Trần Đình Lộc', 'KTX Khu A', '2022-04-04', 200000);
INSERT INTO CTHD(MaPhieuThuePhong, MaHoaDon, SoNgayThue, DonGia) VALUES ('PTP001', 'HD001', 2, 100000);

-- END HOADON 1


-- HOADON 2 05/04/2022 - 10/04/2022 
-- PhieuThuePhong No 2 (2 KhachNoiDia, Phong Loai 2)
INSERT INTO PHIEUTHUEPHONG(MaPhieuThuePhong, NgayBatDauThue, MaPhong, SoKhach, DonGiaThueTrenNgay, DaXoa) VALUES ('PTP002','2022-04-05', 'P003', 2, 200000, true);
INSERT INTO CTPHIEUTHUEPHONG(MaCTPhieuThuePhong, MaPhieuThuePhong, CMND, TenKhachHang, DiaChi, MaLoaiKhach) VALUES ('CTPTP003', 'PTP002', '233324161', 'Võ Văn Bình', 'Bcons' ,  'LK001');
INSERT INTO CTPHIEUTHUEPHONG(MaCTPhieuThuePhong, MaPhieuThuePhong, TenKhachHang, MaLoaiKhach) VALUES ('CTPTP004', 'PTP002', 'Võ Văn An', 'LK001');
-- PhieuThuePhong No 3 (1 KhachNuocNgoai, Phong Loai 3)
INSERT INTO PHIEUTHUEPHONG(MaPhieuThuePhong, NgayBatDauThue, MaPhong, SoKhach, DonGiaThueTrenNgay, DaXoa) VALUES ('PTP003','2022-04-05', 'P006', 1, 300000 * 1.5, true);
INSERT INTO CTPHIEUTHUEPHONG(MaCTPhieuThuePhong, MaPhieuThuePhong, TenKhachHang, DiaChi, MaLoaiKhach) VALUES ('CTPTP005', 'PTP002', 'Luke', 'America' ,  'LK002');

INSERT INTO HOADON(MaHoaDon, KhachHang_CoQuan, DiaChi, NgayLap, TongTien) VALUES ('HD002', 'Võ Văn Bình', 'KTX Khu A', '2022-04-10', 3250000);
INSERT INTO CTHD(MaPhieuThuePhong, MaHoaDon, SoNgayThue, DonGia) VALUES ('PTP002', 'HD002', 5, 200000);
INSERT INTO CTHD(MaPhieuThuePhong, MaHoaDon, SoNgayThue, DonGia) VALUES ('PTP003', 'HD002', 5, 450000);
-- END HOADON 2



