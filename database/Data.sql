use hotelmanagement;

INSERT INTO LOAIPHONG(MaLoaiPhong, TenLoaiPhong, DonGia) VALUES ('LP001', 'Phòng Loại 1', 19.99);
INSERT INTO LOAIPHONG(MaLoaiPhong, TenLoaiPhong, DonGia) VALUES ('LP002', 'Phòng Loại 2', 29.99);
INSERT INTO LOAIPHONG(MaLoaiPhong, TenLoaiPhong, DonGia) VALUES ('LP003', 'Phòng Loại 3', 39.99);

INSERT INTO TINHTRANG(MaTinhTrang, TenTinhTrang) VALUES ('TT001', 'Phòng trống');
INSERT INTO TINHTRANG(MaTinhTrang, TenTinhTrang) VALUES ('TT002', 'Phòng đang sử dụng');

INSERT INTO PHONG(MaPhong,TenPhong,MaLoaiPhong,MaTinhTrang) VALUES('P001', 'Phòng 1', 'LP001', 'TT001');
INSERT INTO PHONG(MaPhong,TenPhong,MaLoaiPhong,MaTinhTrang) VALUES('P002', 'Phòng 2', 'LP001', 'TT002');
INSERT INTO PHONG(MaPhong,TenPhong,MaLoaiPhong,MaTinhTrang) VALUES('P003', 'Phòng 3', 'LP002', 'TT002');
INSERT INTO PHONG(MaPhong,TenPhong,MaLoaiPhong,MaTinhTrang) VALUES('P004', 'Phòng 4', 'LP002', 'TT001');
INSERT INTO PHONG(MaPhong,TenPhong,MaLoaiPhong,MaTinhTrang) VALUES('P005', 'Phòng 5', 'LP002', 'TT001');
INSERT INTO PHONG(MaPhong,TenPhong,MaLoaiPhong,MaTinhTrang) VALUES('P006', 'Phòng 6', 'LP003', 'TT002');

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

SET SQL_SAFE_UPDATES = 0;
SELECT * FROM HOADON;
DELETE FROM CTHD;
DELETE FROM HOADON;

DELETE FROM CTBAOCAODOANHTHU;
DELETE FROM BAOCAODOANHTHU;


SELECT * FROM PHONG;

DELETE FROM HOADON;

SELECT * FROM CTHD;
SELECT * FROM PhieuThuePhong;

SELECT PHONG.MaLoaiPhong,
SUM(CTHD.DonGia) as TongDoanhThuTheoThang
FROM PHONG, PHIEUTHUEPHONG, CTHD, HOADON 
WHERE PHONG.MaPhong = PHIEUTHUEPHONG.MaPhong 
AND PHIEUTHUEPHONG.MaPhieuThuePhong = CTHD.MaPhieuThuePhong 
AND CTHD.MaHoaDon = HOADON.MaHoaDon
AND MONTH(NgayLap) = 12
AND YEAR(NgayLap) = 2022
GROUP BY PHONG.MaLoaiPhong;

DELETE FROM CTBAOCAODOANHTHU;
DELETE FROM BAOCAODOANHTHU;

DELETE FROM HOADON;
DELETE FROM CTHD;

UPDATE HOADON SET NgayLap = DATE('2022-02-26') 


