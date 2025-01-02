class Room {
    roomId: number;
    type: string;
    pricePerNight: number;
    isAvailable: boolean;

    constructor(roomId: number, type: string, pricePerNight: number, isAvailable: boolean) {
        this.roomId = roomId;
        this.type = type;
        this.pricePerNight = pricePerNight;
        this.isAvailable = isAvailable;
    }

    bookRoom(): void {
        this.isAvailable = false;
    }

    releaseRoom(): void {
        this.isAvailable = true;
    }

    calculateCost(nights: number): number {
        return this.pricePerNight * nights;
    }
}

class StandarRoom extends Room {
    constructor(roomId: number, type: string, pricePerNight: number, isAvailable: boolean) {
        super(roomId, type, pricePerNight, isAvailable);
    }
}

class DeluxeRoom extends Room {
    constructor(roomId: number, type: string, pricePerNight: number, isAvailable: boolean) {
        super(roomId, type, pricePerNight, isAvailable);
    }
}

class SuiteRoom extends Room {
    constructor(roomId: number, type: string, pricePerNight: number, isAvailable: boolean) {
        super(roomId, type, pricePerNight, isAvailable);
    }
}

class Person {
    id: number;
    name: string;
    email: string;
    phone: string;

    constructor(id: number, name: string, email: string, phone: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

class Booking {
    id: number;
    customer: Person;
    room: Room;
    nights: number;
    totalCost: number;

    constructor(id: number, customer: Person, room: Room, nights: number, totalCost: number) {
        this.id = id;
        this.customer = customer;
        this.room = room;
        this.nights = nights;
        this.totalCost = totalCost;
    }

    getDetails(): string {
        return `Booking ID: ${this.id}\nCustomer: ${this.customer.name}\nRoom: ${this.room.type}\nNights: ${this.nights}\nTotal Cost: ${this.totalCost}`;
    }
}

class HotelManager {
    rooms: Room[] = [];
    bookings: Booking[] = [];
    customers: Person[] = [];

    addRoom(type: string, pricePerNight: number): void {
        switch (type) {
            case "StandarRoom":
                let roomStand = new StandarRoom(Math.random(), type, pricePerNight, true);
                this.rooms.push(roomStand);
                break;
            case "DeluxeRoom":
                let roomDelux = new DeluxeRoom(Math.random(), type, pricePerNight, true);
                this.rooms.push(roomDelux);
                break;
            case "SuiteRoom":
                let roomSuite = new SuiteRoom(Math.random(), type, pricePerNight, true);
                this.rooms.push(roomSuite);
                break;
        }
    }

    addCustomer(name: string, email: string, phone: string): Person {
        let customer = new Person(Math.random(), name, email, phone);
        this.customers.push(customer);
        return customer;
    }

    bookRoom(customerId: number, roomId: number, nights: number): Booking | undefined {
        let customer = this.customers.find(cu => cu.id === customerId);
        let room = this.rooms.find(r => r.roomId === roomId);
        if (customer === undefined || room === undefined) {
            console.log("Khong tim thay");
            return undefined;
        } else {
            let total = room.calculateCost(nights);
            let booking = new Booking(Math.random(), customer, room, nights, total);
            this.bookings.push(booking);
            room.bookRoom();
            return booking;
        }
    }

    releaseRoom(roomId: number): void {
        let room = this.rooms.find(r => r.roomId === roomId);
        if (room === undefined) {
            console.log("Khong tim thay");
        } else {
            room.releaseRoom();
        }
    }

    listAvailableRooms(): void {
        console.log("Danh sach phong con trong:");
        this.rooms.filter(function (element) {
            if (element.isAvailable === true) {
                console.log(`RoomId: ${element.roomId}`);
                console.log(`Type: ${element.type}`);
                console.log(`Price per Night: ${element.pricePerNight}`);
                console.log(`Trang thai phong: ${element.isAvailable}`);
                console.log("-------------------------------------------");
            }
        });
    }

    listBookingsByCustomer(customerId: number): void {
        console.log("Danh sach dat phong cua mot khach hang");
        this.bookings.filter(function (element) {
            if (element.customer.id === customerId) {
                console.log(element.getDetails());
                console.log("--------------------");
            }
        });
    }

    calculateTotalRevenue(): number {
        return this.bookings.reduce((acc, current) => acc + current.totalCost, 0);
    }

    getRoomTypesCount(): void {
        let roomCount = this.rooms.reduce((acc, room) => {
            acc[room.type] = (acc[room.type] || 0) + 1;
            return acc;
        }, {});
        console.log(roomCount);
    }

    applyDiscountToRoom(roomId: number, discountRate: number): void {
        let room = this.rooms.find(r => r.roomId === roomId);
        if (room) {
            let discountedPrice = room.pricePerNight * (1 - discountRate / 100);
            console.log(`Discounted Price for Room ${roomId}: ${discountedPrice}`);
        } else {
            console.log("Room not found");
        }
    }

    getRoomServices(roomId: number): void {
        let room = this.rooms.find(r => r.roomId === roomId);
        if (room) {
            console.log("Additional services for room: ", room.type);
        }
    }

    getCancellationPolicy(roomId: number): void {
        let room = this.rooms.find(r => r.roomId === roomId);
        if (room) {
            console.log("Cancellation policy for room: ", room.type);
        }
    }
}

class Main {
    hotelManager: HotelManager = new HotelManager();

    boostrap(): void {
        console.log("Menu chuc nang:");
        console.log("1. Them khach hang");
        console.log("2. Them phong");
        console.log("3. Dat phong");
        console.log("4. Tra phong");
        console.log("5. Hien thi danh sach phong con trong");
        console.log("6. Hien thi danh sach dat phong cua khach hang");
        console.log("7. Tinh tong doanh thu");
        console.log("8. Dem so luong tung loai phong");
        console.log("9. Ap dung giam gia cho phong");
        console.log("10. Hien thi cac dich vu bo sung cua phong");
        console.log("11. Hien thi chinh sach huy phong");
        console.log("12. Thoat chuong trinh");

        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const getMenuChoice = () => {
            rl.question('Nhap lua chon: ', (input) => {
                switch (input) {
                    case "1":
                        rl.question("Nhap ten khach hang: ", (name) => {
                            rl.question("Nhap email: ", (email) => {
                                rl.question("Nhap so dien thoai: ", (phone) => {
                                    const customer = this.hotelManager.addCustomer(name, email, phone);
                                    console.log("Khach hang da them: ", customer);
                                    getMenuChoice();
                                });
                            });
                        });
                        break;
                    case "2":
                        rl.question("Nhap loai phong (StandarRoom, DeluxeRoom, SuiteRoom): ", (type) => {
                            rl.question("Nhap gia phong moi dem: ", (pricePerNight) => {
                                this.hotelManager.addRoom(type, parseFloat(pricePerNight));
                                console.log("Phong da them");
                                getMenuChoice();
                            });
                        });
                        break;
                    case "3":
                        rl.question("Nhap ID khach hang: ", (customerId) => {
                            rl.question("Nhap ID phong: ", (roomId) => {
                                rl.question("Nhap so dem: ", (nights) => {
                                    const booking = this.hotelManager.bookRoom(Number(customerId), Number(roomId), Number(nights));
                                    console.log("Dat phong thanh cong:", booking?.getDetails());
                                    getMenuChoice();
                                });
                            });
                        });
                        break;
                    case "4":
                        rl.question("Nhap ID phong de tra: ", (roomId) => {
                            this.hotelManager.releaseRoom(Number(roomId));
                            console.log("Phong da duoc tra.");
                            getMenuChoice();
                        });
                        break;
                    case "5":
                        this.hotelManager.listAvailableRooms();
                        getMenuChoice();
                        break;
                    case "6":
                        rl.question("Nhap ID khach hang: ", (customerId) => {
                            this.hotelManager.listBookingsByCustomer(Number(customerId));
                            getMenuChoice();
                        });
                        break;
                    case "7":
                        const revenue = this.hotelManager.calculateTotalRevenue();
                        console.log("Tong doanh thu: ", revenue);
                        getMenuChoice();
                        break;
                    case "8":
                        this.hotelManager.getRoomTypesCount();
                        getMenuChoice();
                        break;
                    case "9":
                        rl.question("Nhap ID phong de ap dung giam gia: ", (roomId) => {
                            rl.question("Nhap ti le giam gia: ", (discountRate) => {
                                this.hotelManager.applyDiscountToRoom(Number(roomId), parseFloat(discountRate));
                                getMenuChoice();
                            });
                        });
                        break;
                    case "10":
                        rl.question("Nhap ID phong de hien thi dich vu bo sung: ", (roomId) => {
                            this.hotelManager.getRoomServices(Number(roomId));
                            getMenuChoice();
                        });
                        break;
                    case "11":
                        rl.question("Nhap ID phong de hien thi chinh sach huy phong: ", (roomId) => {
                            this.hotelManager.getCancellationPolicy(Number(roomId));
                            getMenuChoice();
                        });
                        break;
                    case "12":
                        console.log("Thoat chuong trinh.");
                        rl.close();
                        break;
                    default:
                        console.log("Lua chon khong hop le. Vui long nhap lai.");
                        getMenuChoice();
                        break;
                }
            });
        };

        getMenuChoice();
    }
}

const app = new Main();
app.boostrap();
