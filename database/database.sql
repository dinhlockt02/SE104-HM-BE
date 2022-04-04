create database hotelmanagement;
use hotelmanagement;

create table BAOCAODOANHTHU (
	MaBaoCao INT auto_increment,
    Thang INT,
    Nam INT,
    TongDoanhThu DOUBLE,
    CONSTRAINT PK_BAOCAODOANHTHU PRIMARY KEY (MaBaoCao)
);

create table CTBAOCAODOANHTHU (
	MaBaoCao INT,
    MaLoaiPhong INT,
    DoanhThuTheoThang DOUBLE,
    TiLe DOUBLE,
    CONSTRAINT PK_CTBAOCAODOANHTHU PRIMARY KEY (MaBaoCao, MaLoaiPhong)
);

create table LOAIPHONG (
	MaLoaiPhong INT auto_increment,
    TenLoaiPhong NVARCHAR(20),
    DonGia DOUBLE,
    CONSTRAINT PK_LOAIPHONG PRIMARY KEY (MaLoaiPhong)
);

create table PHONG (
	MaPhong INT auto_increment,
    TenPhong NVARCHAR(20),
    MaLoaiPhong INT,
    GhiChu TEXT,
    MaTinhTrang INT,
    CONSTRAINT PK_PHONG PRIMARY KEY (MaPhong)
);

create table TINHTRANG (
	MaTinhTrang INT auto_increment,
    TenTinhTrang nvarchar(20),
    CONSTRAINT PK_TINHTRANG PRIMARY KEY (MaTinhTrang)
);

create table PHIEUTHUEPHONG (
	MaPhieuThuePhong INT auto_increment,
    NgayBatDauThue date,
    MaPhong INT,
    SoKhach INT,
    DonGiaThueTrenNgay DOUBLE,
    CONSTRAINT PK_PHIEUTHUEPHONG PRIMARY KEY (MaPhieuThuePhong)
);

create table CTPHIEUTHUEPHONG (
	MaCTPhieuThuePhong INT auto_increment,
    MaPhieuThuePhong INT,
    CMND VARCHAR(20),
    TenKhachHang NVARCHAR(40),
    DiaChi text,
    MaLoaiKhach INT,
    CONSTRAINT PK_CTPHIEUTHUEPHONG PRIMARY KEY (MaCTPhieuThuePhong)
);

create table LOAIKHACH (
	MaLoaiKhach INT auto_increment,
    TenLoaiKhach NVARCHAR(20),
    HeSoPhuThu FLOAT,
    CONSTRAINT PK_LOAIKHACH PRIMARY KEY (MaLoaiKhach)
);

create table CTHD (
	MaPhieuThuePhong INT,
    MaHoaDon INT,
    SoNgayThue INT,
    DonGia DOUBLE,
    CONSTRAINT PK_CTHD PRIMARY KEY (MaPhieuThuePhong)
);


create table HOADON (
	MaHoaDon INT auto_increment,
    KhachHang_CoQuan NVARCHAR(40),
    DiaChi text,
    NgayLap DATE,
    TongTien DOUBLE,
     CONSTRAINT PK_HOADON PRIMARY KEY (MaHoaDon)
);

create table TILEPHUTHU (
	SoKhach INT,
    TiLePhuThu FLOAT,
    CONSTRAINT PK_PHUTHU PRIMARY KEY (SoKhach)
);

create table THAMSO (
	SoKhachToiDa INT,
    SoKhachKhongPhuThu INT
);



ALTER TABLE CTBAOCAODOANHTHU 
ADD CONSTRAINT FK_CTBAOCAODOANHTHU_BAOCAODOANHTHU_MaBaoCao FOREIGN KEY (MaBaoCao) REFERENCES BAOCAODOANHTHU(MaBaoCao),
ADD CONSTRAINT FK_CTBAOCAODOANHTHU_LOAIPHONG_MaLoaiPhong FOREIGN KEY (MaLoaiPhong) REFERENCES LOAIPHONG(MaLoaiPhong);


ALTER TABLE PHONG
ADD CONSTRAINT FK_PHONG_LOAIPHONG_MaLoaiPhong FOREIGN KEY (MaLoaiPhong) REFERENCES LOAIPHONG(MaLoaiPhong),
ADD CONSTRAINT FK_PHONG_TINHTRANG_MaTinhTrang FOREIGN KEY (MaTinhTrang) REFERENCES TINHTRANG(MaTinhTrang);

ALTER TABLE PHIEUTHUEPHONG
ADD CONSTRAINT FK_PHIEUTHUEPHONG_PHONG_MaPhong FOREIGN KEY (MaPhong) references PHONG(MaPhong);

ALTER TABLE CTPHIEUTHUEPHONG
ADD CONSTRAINT FK_CTPHIEUTHUEPHONG_PHIEUTHUEPHONG_MaPhieuThuePhong FOREIGN KEY (MaPhieuThuePhong) REFERENCES PHIEUTHUEPHONG(MaPhieuThuePhong),
ADD CONSTRAINT FK_CTPHIEUTHUEPHONG_LOAIKHACH_MaLoaiKhach FOREIGN KEY (MaLoaiKhach) REFERENCES LOAIKHACH(MaLoaiKhach);


ALTER TABLE CTHD
ADD CONSTRAINT FK_CTHD_PHIEUTHUEPHONG FOREIGN KEY (MaPhieuThuePhong) REFERENCES PHIEUTHUEPHONG(MaPhieuThuePhong),
ADD CONSTRAINT FK_CTHD_HOADON_MaHoaDon FOREIGN KEY (MaHoaDon) REFERENCES HOADON(MaHoaDon);






