drop database if exists hotelmanagement ;
create database hotelmanagement;
use hotelmanagement;

create table BAOCAODOANHTHU (
	MaBaoCao VARCHAR(8),
    Thang TINYINT NOT NULL,
    Nam SMALLINT NOT NULL,
    TongDoanhThu DECIMAL(13,2),
    DaXoa bool default false,
    CONSTRAINT PK_BAOCAODOANHTHU PRIMARY KEY (MaBaoCao)
);

create table CTBAOCAODOANHTHU (
	MaBaoCao VARCHAR(8),
    MaLoaiPhong VARCHAR(8),
    DoanhThuTheoThang DOUBLE NOT NULL,
    TiLe DOUBLE NOT NULL,
	DaXoa bool default false,
    CONSTRAINT PK_CTBAOCAODOANHTHU PRIMARY KEY (MaBaoCao, MaLoaiPhong)
);

create table LOAIPHONG (
	MaLoaiPhong VARCHAR(8),
    TenLoaiPhong NVARCHAR(16) NOT NULL,
    DonGia DECIMAL(13,2) NOT NULL,
	DaXoa bool default false,
    CONSTRAINT PK_LOAIPHONG PRIMARY KEY (MaLoaiPhong),
    CONSTRAINT CK_DonGia CHECK(DonGia >0 )
);

create table PHONG (
	MaPhong VARCHAR(8),
    TenPhong NVARCHAR(60) NOT NULL,
    MaLoaiPhong VARCHAR(8) NOT NULL,
    GhiChu TEXT,
    MaTinhTrang VARCHAR(8) NOT NULL,
	DaXoa bool default false,
    CONSTRAINT PK_PHONG PRIMARY KEY (MaPhong)
);

create table TINHTRANG (
	MaTinhTrang VARCHAR(8),
    TenTinhTrang nvarchar(40) NOT NULL,
	DaXoa bool default false,
    CONSTRAINT PK_TINHTRANG PRIMARY KEY (MaTinhTrang)
);

create table PHIEUTHUEPHONG (
	MaPhieuThuePhong VARCHAR(8),
    NgayBatDauThue date NOT NULL,
    MaPhong VARCHAR(8),
    SoKhach TINYINT NOT NULL,
    DonGiaThueTrenNgay DECIMAL(13,2) NOT NULL,
	DaXoa bool default false,
    CONSTRAINT PK_PHIEUTHUEPHONG PRIMARY KEY (MaPhieuThuePhong)
);

create table CTPHIEUTHUEPHONG (
	MaCTPhieuThuePhong VARCHAR(8),
    MaPhieuThuePhong VARCHAR(8),
    CMND VARCHAR(12),
    TenKhachHang NVARCHAR(60) NOT NULL,
    DiaChi text,
    MaLoaiKhach VARCHAR(8),
	DaXoa bool default false,
    CONSTRAINT PK_CTPHIEUTHUEPHONG PRIMARY KEY (MaCTPhieuThuePhong)
);

create table LOAIKHACH (
	MaLoaiKhach VARCHAR(8),
    TenLoaiKhach NVARCHAR(40) NOT NULL,
    HeSoPhuThu DOUBLE NOT NULL,
	DaXoa bool default false,
    CONSTRAINT PK_LOAIKHACH PRIMARY KEY (MaLoaiKhach)
);

create table CTHD (
	MaPhieuThuePhong VARCHAR(8),
    MaHoaDon VARCHAR(8),
    SoNgayThue SMALLINT NOT NULL,
    DonGia DECIMAL(13,2) NOT NULL,
	DaXoa bool default false,
    CONSTRAINT PK_CTHD PRIMARY KEY (MaPhieuThuePhong)
);

create table HOADON (
	MaHoaDon VARCHAR(8),
    KhachHang_CoQuan NVARCHAR(60),
    DiaChi text,
    NgayLap DATE,
    TongTien DOUBLE,
	DaXoa bool default false,
     CONSTRAINT PK_HOADON PRIMARY KEY (MaHoaDon)
);

create table TILEPHUTHU (
	SoKhach INT,
    TiLePhuThu FLOAT, 
    CONSTRAINT PK_PHUTHU PRIMARY KEY (SoKhach),
    CONSTRAINT CK_SoKhach CHECK(SoKhach > 0),
    CONSTRAINT CK_TiLePhuThu CHECK(TiLePhuThu >= 0)
);

create table THAMSO (
	MaThamSo VARCHAR(8) PRIMARY KEY,
	TenThamSo VARCHAR(100),
    GiaTri INT
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






