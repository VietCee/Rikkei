class Person {
    protected _id: number;
    protected _name: string;
    protected _email: string;
    protected _phone: string;
  
    constructor(id: number, name: string, email: string, phone: string) {
      this._id = id;
      this._name = name;
      this._email = email;
      this._phone = phone;
    }
  
    getDetails() {
      return {
        id: this._id,
        name: this._name,
        email: this._email,
        phone: this._phone,
      };
    }
  }
  
  abstract class Room {
    protected _roomId: number;
    protected _type: string;
    protected _pricePerNight: number;
    protected _isAvailable: boolean;
  
    protected constructor(roomId: number, type: string, pricePerNight: number, isAvailable: boolean = true) {
      this._roomId = roomId;
      this._type = type;
      this._pricePerNight = pricePerNight;
      this._isAvailable = isAvailable;
    }
  
    getDetails() {
      return {
        roomId: this._roomId,
        type: this._type,
        pricePerNight: this._pricePerNight,
        isAvailable: this._isAvailable,
      };
    }
  
    // Đặt phòng (chuyển trạng thái isAvailable thành false).
    bookRoom(): void {
      this._isAvailable = false;
    }
  
    // Trả phòng (chuyển trạng thái isAvailable thành true).
    releaseRoom(): void {
      this._isAvailable = true;
    }
  
    //: Tính chi phí dựa trên số đêm (Phương thức trừu tượng).
    abstract calculateCost(nights: number): number;
  
    // Trả về danh sách các dịch vụ bổ sung (Phương thức trừu tượng).
    abstract getAdditionalServices(): string[];
  
    //: Tính giá sau khi áp dụng giảm giá (Phương thức trừu tượng).
    abstract applyDiscount(discountRate: number): number;
  
    //Trả về chính sách hủy phòng (Phương thức trừu tượng).
    abstract getCancellationPolicy(): string;
  }
  
  class StandardRoom extends Room {
    // Giá cố định, không có dịch vụ bổ sung.
    // Chính sách hủy: Hoàn lại 100% nếu hủy trước 1 ngày.
  
    constructor(roomId: number, isAvailable: boolean = true) {
      super(roomId, 'standard', 300, isAvailable);
    }
  
    override calculateCost(nights: number): number {
      return this._pricePerNight * nights;
    }
  
    override getAdditionalServices(): string[] {
      return [];
    }
  
    override applyDiscount(discountRate: number): number {
      this._pricePerNight *= discountRate;
      return this._pricePerNight;
    }
  
    override getCancellationPolicy(): string {
      return 'Standard room: Refund 100% if cancel 1 day or more in advance.';
    }
  }
  
  class DeluxeRoom extends Room {
    // Giá cao hơn, có dịch vụ ăn sáng.
    // Chính sách hủy: Hoàn lại 50% nếu hủy trước 2 ngày.
  
    constructor(roomId: number, isAvailable: boolean = true) {
      super(roomId, 'deluxe', 500, isAvailable);
    }
  
    override calculateCost(nights: number): number {
      return this._pricePerNight * nights;
    }
  
    override getAdditionalServices(): string[] {
      return ['breakfast'];
    }
  
    override applyDiscount(discountRate: number): number {
      this._pricePerNight *= discountRate;
      return this._pricePerNight;
    }
  
    override getCancellationPolicy(): string {
      return 'Deluxe room: Refund 50% if cancel 2 days in advance.';
    }
  }
  
  class SuiteRoom extends Room {
    // Giá cao nhất, có dịch vụ spa, minibar.
    // Chính sách hủy: Không hoàn lại tiền nếu hủy.
  
    constructor(roomId: number, isAvailable: boolean = true) {
      super(roomId, 'suite', 900, isAvailable);
    }
  
    override calculateCost(nights: number): number {
      return this._pricePerNight * nights;
    }
  
    override getAdditionalServices(): string[] {
      return ['spa', 'minibar'];
    }
  
    override applyDiscount(discountRate: number): number {
      this._pricePerNight *= discountRate;
      return this._pricePerNight;
    }
  
    override getCancellationPolicy(): string {
      return 'Suite room: No refund.';
    }
  }
  
  class Booking {
    protected _bookingId: number; // Mã đặt phòng (số nguyên).
    protected _customer: Person; // Khách hàng đặt phòng (Person).
    protected _room: Room; // Phòng được đặt (Room).
    protected _nights: number; // Số đêm (số nguyên).
    protected _totalCost: number; // Tổng chi phí (số thực).
  
    constructor(bookingId: number, customer: Person, room: Room, nights: number, totalCost: number) {
      this._bookingId = bookingId;
      this._customer = customer;
      this._room = room;
      this._nights = nights;
      this._totalCost = totalCost;
    }
  
    getDetails() {
      return {
        bookingId: this._bookingId,
        customer: this._customer.getDetails(),
        room: this._room,
        nights: this._nights,
        totalCost: this._totalCost,
      };
    }
  }
  
  type RoomType = 'standard' | 'deluxe' | 'suite';
  
  class HotelManager {
    protected _rooms: Room[];
    protected _bookings: Booking[];
    protected _customers: Person[];
  
    constructor(rooms: Room[] = [], bookings: Booking[] = [], customers: Person[] = []) {
      this._rooms = rooms;
      this._bookings = bookings;
      this._customers = customers;
    }
  
    // Thêm phòng mới vào danh sách phòng.
    addRoom(type: RoomType, pricePerNight: number): void {
      const ids = this._rooms.map(e => e.getDetails().roomId).sort((a, b) => b - a);
      ids.length <= 0 && ids.push(0);
      // const ids = this._rooms
      switch (type) {
        case 'standard':
          this._rooms.push(new StandardRoom(ids[0] + 1));
          break;
        case 'deluxe':
          this._rooms.push(new DeluxeRoom(ids[0] + 1));
          break;
        case 'suite':
          this._rooms.push(new SuiteRoom(ids[0] + 1));
          break;
      }
    }
  
    // Thêm khách hàng mới vào danh sách khách hàng.
    addCustomer(name: string, email: string, phone: string): Person {
      const ids = this._customers.map(e => e.getDetails().id).sort((a, b) => b - a);
      ids.length <= 0 && ids.push(0);
      const newPerson = new Person(ids[0] + 1, name, email, phone);
      this._customers.push(newPerson);
      return newPerson;
    }
  
    // Đặt phòng cho khách hàng và trả về thông tin đặt phòng.
    bookRoom(customerId: number, roomId: number, nights: number): Booking | void {
      const roomIdx = this._rooms.findIndex(e => e.getDetails().roomId === roomId);
      if (roomIdx < 0) {
        return showError(`No room of this ID (${roomId}) exists`);
      }
      if (!this._rooms[roomIdx].getDetails().isAvailable) {
        return showError(`Room of ID ${roomId} is already booked`);
      }
      const customerIdx = this._customers.findIndex(e => e.getDetails().id === customerId);
      if (customerIdx < 0) {
        return showError(`No customer of this ID (${customerId}) exists`);
      }
  
      const ids = this._bookings.map(e => e.getDetails().bookingId).sort((a, b) => b - a);
      ids.length <= 0 && ids.push(0);
      const newBooking = new Booking(
        ids[0] + 1,
        this._customers[customerIdx],
        this._rooms[roomIdx],
        nights,
        this._rooms[roomIdx].calculateCost(nights),
      );
      this._rooms[roomIdx].bookRoom();
      this._bookings.push(newBooking);
      return newBooking;
    }
  
    // Trả phòng.
    releaseRoom(roomId: number): void {
      const roomIdx = this._rooms.findIndex(e => e.getDetails().roomId === roomId);
      if (roomIdx < 0) {
        return showError(`No room of this ID (${roomId}) exists`);
      }
      if (this._rooms[roomIdx].getDetails().isAvailable) {
        return showError(`Room of ID ${roomId} is not booked`);
      }
  
      this._rooms[roomIdx].releaseRoom();
      // this._bookings.splice(this._bookings.findIndex(book => book.getDetails().room.getDetails().roomId === roomId), 1);
    }
  
    // Hiển thị danh sách các phòng còn trống (Sử dụng filter).
    listAvailableRooms(): void {
      const availableRooms = this._rooms.filter(e => e.getDetails().isAvailable);
      let res = '';
      for (let i = 0; i < availableRooms.length; i++) {
        const room = availableRooms[i].getDetails();
        if (i <= 0) res += `=====AVAILABLE ROOMS=====\n`;
        res +=
          ` - ID: ${room.roomId}\n` +
          ` - Type: ${room.type}\n` +
          ` - Price: ${room.pricePerNight}\n` +
          `-------------\n`;
      }
      console.log(res + '=========================');
    }
  
    // Hiển thị danh sách đặt phòng của một khách hàng (Sử dụng filter).
    listBookingsByCustomer(customerId: number): void {
      const hasCustomer = this._customers.findIndex(e => e.getDetails().id === customerId) >= 0;
      if (hasCustomer) {
        return showError(`No customer of this ID (${customerId}) exists`);
      }
  
      const bookings = this._bookings.filter(e => e.getDetails().customer.id === customerId);
      if (bookings.length < 0) return console.log(`Customer (${customerId}) have no booking`);
      let res = '';
  
      for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i].getDetails(),
          room = booking.room.getDetails();
  
        if (i <= 0) res += `=====BOOKING OF CUSTOMER ${customerId}=====\n`;
        res +=
          ` - ID: ${booking.bookingId}\n` +
          ` - Customer: ${booking.customer.name}\n` +
          ` - Room type: ${room.type}\n` +
          ` - Availability: ${room.isAvailable ? 'Available' : 'Booked'}\n` +
          ` - Room price: ${room.pricePerNight}\n` +
          ` - Nights: ${booking.nights}\n` +
          ` - Cost: ${booking.totalCost}\n` +
          `-------------\n`;
      }
      console.log(res + '===========================================');
    }
  
    // Tính tổng doanh thu từ các đặt phòng (Sử dụng reduce).
    calculateTotalRevenue(): number {
      return this._bookings.reduce(
        (p, c) => p + c.getDetails().totalCost,
        0,
      );
    }
  
    // Đếm số lượng từng loại phòng (Sử dụng reduce và map).
    getRoomTypesCount(): void {
      const counter = {
        'standard': this._rooms.reduce((p, c) => c.getDetails().type === 'standard' ? ++p : p, 0),
        'deluxe': this._rooms.reduce((p, c) => c.getDetails().type === 'deluxe' ? ++p : p, 0),
        'suite': this._rooms.reduce((p, c) => c.getDetails().type === 'suite' ? ++p : p, 0),
      };
  
      console.table(counter);
    }
  
    // Áp dụng giảm giá cho một phòng cụ thể (Sử dụng findIndex).
    applyDiscountToRoom(roomId: number, discountRate: number): void {
      const roomIdx = this._rooms.findIndex(e => e.getDetails().roomId === roomId);
      if (roomIdx < 0) {
        return showError(`No room of this ID (${roomId}) exists`);
      }
  
      this._rooms[roomIdx].applyDiscount(discountRate);
    }
  
    // Hiển thị các dịch vụ bổ sung của phòng (Sử dụng find).
    getRoomServices(roomId: number): void {
      const room = this._rooms.find(e => e.getDetails().roomId === roomId);
      if (room === undefined) {
        return showError(`No room of this ID (${roomId}) exists`);
      }
      console.log(room.getAdditionalServices());
    }
  
    // Hiển thị chính sách hủy phòng (Sử dụng find).
    getCancellationPolicy(roomId: number): void {
      const room = this._rooms.find(e => e.getDetails().roomId === roomId);
      if (room === undefined) {
        return showError(`No room of this ID (${roomId}) exists`);
      }
      console.log(room.getCancellationPolicy());
    }
  }
  
  function showError(content: string): void {
    console.error(content);
  }
  
  enum Input {
    addCustomer = 1,
    addRoom,
    book,
    release,
    listAvailable,
    listBooked,
    totalRev,
    countRoomByType,
    applyDiscount,
    listServices,
    showCancelPolicy,
    end,
  }
  
  class Main {
    run(): void {
      const manager = new HotelManager();
      let input: Input;
  
      while (true) {
        input = Number(prompt(
          `Hotel Manager\n\n` +
          `${Input.addCustomer}. Thêm khách hàng.\n` +
          `${Input.addRoom}. Thêm phòng.\n` +
          `${Input.book}. Đặt phòng.\n` +
          `${Input.release}. Trả phòng.\n` +
          `${Input.listAvailable}. Hiển thị danh sách phòng còn trống (sử dụng filter).\n` +
          `${Input.listBooked}. Hiển thị danh sách đặt phòng của khách hàng (sử dụng filter).\n` +
          `${Input.totalRev}. Tính tổng doanh thu từ các đặt phòng (sử dụng reduce).\n` +
          `${Input.countRoomByType}. Đếm số lượng từng loại phòng (sử dụng reduce hoặc map).\n` +
          `${Input.applyDiscount}. Áp dụng giảm giá cho phòng (sử dụng findIndex).\n` +
          `${Input.listServices}. Hiển thị các dịch vụ bổ sung của phòng (sử dụng find).\n` +
          `${Input.showCancelPolicy}. Hiển thị chính sách hủy phòng (sử dụng find).\n` +
          `${Input.end}. Thoát chương trình.`,
        ));
  
        switch (input) {
          case Input.addCustomer:
            const cusName = String(prompt(`Enter customer's name`));
            const cusEmail = String(prompt(`Enter customer's email`));
            const cusPhone = String(prompt(`Enter customer's phone`));
            if (cusName.length <= 0 || cusEmail.length <= 0 || cusPhone.length <= 0) {
              showError('All fields must be filled');
              break;
            }
            if (!cusEmail.match(/^[a-zA-Z][a-zA-Z0-9.]*@[a-z.]+\.[a-z]{2,3}/)) {
              showError('Email is invalid');
              break;
            }
            if (!cusPhone.match(/[0-9]{10,11}/)) {
              showError('Phone number is invalid');
              break;
            }
            manager.addCustomer(cusName, cusEmail, cusPhone);
            break;
          case Input.addRoom:
            const roomType = String(prompt('Enter room type\nAllowed types: standard, deluxe, suite'));
            if (roomType !== 'standard' && roomType !== 'deluxe' && roomType !== 'suite') {
              showError('Invalid room type');
              break;
            }
            manager.addRoom(roomType, 1);
            break;
          case Input.book:
            const cusId = Number(prompt('Enter customer ID'));
            const roomId = Number(prompt('Enter room ID'));
            const nightCount = Number(prompt('Enter night count'));
            if (isNaN(cusId) || isNaN(roomId) || isNaN(nightCount) || cusId < 0 || roomId < 0 || nightCount < 0) {
              showError('Invalid input.');
              break;
            }
            manager.bookRoom(cusId, roomId, nightCount);
            break;
          case Input.release:
            const relRoomId = Number(prompt('Enter room ID'));
            if (isNaN(relRoomId)) {
              showError('Invalid room ID');
              break;
            }
            manager.releaseRoom(relRoomId);
            break;
          case Input.listAvailable:
            manager.listAvailableRooms();
            break;
          case Input.listBooked:
            const cusBookedId = Number(prompt('Enter customer ID'));
            if (isNaN(cusBookedId) || cusBookedId < 0) {
              showError('Invalid customer ID');
              break;
            }
            manager.listBookingsByCustomer(cusBookedId);
            break;
          case Input.totalRev:
            console.log(`Total revenue: ${manager.calculateTotalRevenue()}`);
            break;
          case Input.countRoomByType:
            manager.getRoomTypesCount();
            break;
          case Input.applyDiscount:
            const disRoomId = Number(prompt('Enter room ID'));
            if (isNaN(disRoomId)) {
              showError('Invalid room ID');
              break;
            }
            const disRate = Number(prompt('Enter discount rate'));
            if (isNaN(disRate) || disRate < 0 || disRate > 1) {
              showError('Invalid discount rate');
              break;
            }
            manager.applyDiscountToRoom(disRoomId, disRate);
            break;
          case Input.listServices:
            const serRoomId = Number(prompt('Enter room ID'));
            if (isNaN(serRoomId)) {
              showError('Invalid room ID');
              break;
            }
            manager.getRoomServices(serRoomId);
            break;
          case Input.showCancelPolicy:
            const canRoomId = Number(prompt('Enter room ID'));
            if (isNaN(canRoomId)) {
              showError('Invalid room ID');
              break;
            }
            manager.getCancellationPolicy(canRoomId);
            break;
          case Input.end:
            showError('App terminated.');
            return;
        }
      }
    }
  }
  
  const app = new Main();