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

SET SQL_SAFE_UPDATES = 0;
SELECT * FROM HOADON;
DELETE FROM CTHD;
DELETE FROM HOADON;

SELECT date('2021-2-25') - date('2021-2-23')