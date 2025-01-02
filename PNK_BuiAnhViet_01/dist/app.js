"use strict";
class Person {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    getDetails() {
        console.log("Thông tin của khách hàng");
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Phone: ${this.phone}`);
    }
}
class Room {
    constructor(roomId, type, pricePerNight, isAvailable) {
        this.roomId = roomId;
        this.type = type;
        this.pricePerNight = pricePerNight;
        this.isAvailable = isAvailable;
    }
    bookRoom() {
        this.isAvailable = false;
    }
    releaseRoom() {
        this.isAvailable = true;
    }
}
class StandarRoom extends Room {
    constructor(roomId, type, pricePerNight, isAvailable) {
        super(roomId, type, pricePerNight, isAvailable);
    }
    calculateCost(nights) {
        return this.pricePerNight * nights;
    }
    getAdditionalServices() {
    }
    applyDiscount(discountRate) {
        return this.pricePerNight * discountRate;
    }
    getCancellationPolicy() {
        console.log("Hoàn lại 100% nếu hủy trước 1 ngày.");
    }
}
class DeluxeRoom extends Room {
    constructor(roomId, type, pricePerNight, isAvailable) {
        super(roomId, type, pricePerNight, isAvailable);
    }
    calculateCost(nights) {
        return this.pricePerNight * nights;
    }
    getAdditionalServices() {
    }
    applyDiscount(discountRate) {
        return this.pricePerNight * discountRate;
    }
    getCancellationPolicy() {
        console.log("Hoàn lại 50% nếu hủy trước 2 ngày.");
    }
}
class SuiteRoom extends Room {
    constructor(roomId, type, pricePerNight, isAvailable) {
        super(roomId, type, pricePerNight, isAvailable);
    }
    calculateCost(nights) {
        return this.pricePerNight * nights;
    }
    getAdditionalServices() {
    }
    applyDiscount(discountRate) {
        return this.pricePerNight * discountRate;
    }
    getCancellationPolicy() {
        console.log("Không hoàn lại tiền nếu hủy.");
    }
}
class Booking {
    constructor(bookingId, customer, room, nights, totalCost) {
        this.bookingId = bookingId;
        this.customer = customer;
        this.room = room;
        this.nights = nights;
        this.totalCost = totalCost;
    }
    getDetails() {
        console.log("Thông tin chi tiết đặt phòng");
        console.log(`BookingId: ${this.bookingId}`);
        console.log(`Nights: ${this.nights}`);
        console.log(`Total Cost: ${this.totalCost}`);
        console.log(`RoomId: ${this.room.roomId}`);
        console.log(`Type: ${this.room.type}`);
        console.log(`Price per Night: ${this.room.pricePerNight}`);
        console.log(`Trạng thái phòng: ${this.room.isAvailable}`);
        this.customer.getDetails();
    }
}
class HotelManager {
    constructor() {
        this.rooms = [];
        this.bookings = [];
        this.customers = [];
    }
    addRoom(type, pricePerNight) {
        switch (type) {
            case "StandarRoom":
                let roomStand = new StandarRoom(Math.random(), type, pricePerNight, false);
                this.rooms.push(roomStand);
                break;
            case "DeluxeRoom":
                let roomDelux = new DeluxeRoom(Math.random(), type, pricePerNight, false);
                this.rooms.push(roomDelux);
                break;
            case "SuiteRoom":
                let roomSuite = new SuiteRoom(Math.random(), type, pricePerNight, false);
                this.rooms.push(roomSuite);
                break;
        }
    }
    addCustomer(name, email, phone) {
        let customer = new Person(Math.random(), name, email, phone);
        this.customers.push(customer);
        return customer;
    }
    bookRoom(customerId, roomId, nights) {
        let customer = this.customers.find(cu => cu.id);
        let room = this.rooms.find(r => r.roomId);
        if (customer === undefined || room === undefined) {
            console.log("Không tìm thấy");
            return this.bookings[-1];
        }
        else {
            let total = room.calculateCost(nights);
            let booking = new Booking(Math.random(), customer, room, nights, total);
            this.bookings.push(booking);
            return booking;
        }
    }
    releaseRoom(roomId) {
        let room = this.rooms.find(r => r.roomId === roomId);
        if (room === undefined) {
            console.log("Không tìm thấy");
        }
        else {
            room.releaseRoom();
        }
    }
    listAvailableRooms() {
        console.log("Danh sách phòng còn trống:");
        this.rooms.filter(function (element, index) {
            if (element.isAvailable === true) {
                console.log(`RoomId: ${element.roomId}`);
                console.log(`Type: ${element.type}`);
                console.log(`Price per Night: ${element.pricePerNight}`);
                console.log(`Trạng thái phòng: ${element.isAvailable}`);
                console.log("-------------------------------------------");
            }
        });
    }
    listBookingsByCustomer(customerId) {
        console.log("Danh sách đặt phòng của một khách hàng");
        this.bookings.filter(function (element, index) {
            if (element.customer.id === customerId) {
                element.getDetails();
                console.log("--------------------");
            }
        });
    }
    calculateTotalRevenue() {
        return this.bookings.reduce((acc, curent) => acc + curent.totalCost, 0);
    }
    getRoomTypesCount() {
        let sumStand = 0;
        let sumDulex = 0;
        let sumSuite = 0;
        this.rooms.reduce((acc, curr) => {
            acc[curr.type] = (acc[curr.type] || 0) + 1;
            return acc;
        }, {});
    }
}
class Main {
    constructor() {
        this.hotelManager = new HotelManager();
    }
    boostrap() {
        console.log("Menu chức năng");
        console.log("1.Thêm khách hàng");
        console.log("2.Thêm phòng. 	");
        console.log("3.Đặt phòng. 		");
        console.log("4.Trả phòng.");
        console.log("5.Hiển thị danh sách phòng còn trống");
        console.log("6.Thêm khách hàng");
        console.log("7.Thêm khách hàng");
        console.log("8.Thêm khách hàng");
        console.log("9.Thêm khách hàng");
        console.log("10.Thêm khách hàng");
        let check = true;
        while (check) {
            let input = String("Hãy nhập vào từ 1-10 để điều khiển chương trình");
            switch (input) {
                case "1":
            }
        }
    }
}