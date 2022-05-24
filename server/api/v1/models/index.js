const RoomType = require('./room_type');
const Room = require('./room');
const RoomState = require('./room_state');
const CustomerType = require('./customer_type');
const SettingConfig = require('./setting_config');
const Surcharge = require('./surcharge');
const Voucher = require('./voucher');
const VoucherDetail = require('./voucher_detail');
const Invoice = require('./invoice');
const InvoiceDetail = require('./invoice_detail');

RoomType.hasMany(Room, { foreignKey: 'MaLoaiPhong' });
RoomState.hasMany(Room, { foreignKey: 'MaTinhTrang' });
Room.belongsTo(RoomType, { foreignKey: 'MaLoaiPhong' });
Room.belongsTo(RoomState, { foreignKey: 'MaTinhTrang' });
Room.hasMany(Voucher, { foreignKey: 'MaPhong' });
Voucher.belongsTo(Room, { foreignKey: 'MaPhong' });
Voucher.hasMany(VoucherDetail, { foreignKey: 'MaPhieuThuePhong' });
VoucherDetail.belongsTo(Voucher, { foreignKey: 'MaPhieuThuePhong' });
VoucherDetail.belongsTo(CustomerType, { foreignKey: 'MaLoaiKhach' });
CustomerType.hasMany(VoucherDetail, { foreignKey: 'MaLoaiKhach' });
Invoice.hasMany(InvoiceDetail, { foreignKey: 'MaHoaDon' });
InvoiceDetail.belongsTo(Invoice, { foreignKey: 'MaHoaDon' });
Voucher.hasOne(InvoiceDetail, { foreignKey: 'MaPhieuThuePhong' });
InvoiceDetail.belongsTo(Voucher, { foreignKey: 'MaPhieuThuePhong' });

module.exports = {
  Room,
  RoomState,
  RoomType,
  CustomerType,
  SettingConfig,
  Surcharge,
  Voucher,
  VoucherDetail,
  Invoice,
  InvoiceDetail,
};
