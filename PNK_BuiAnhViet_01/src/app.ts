class Person{
    public id: number;
    public name: string;
    public email: string;
    public phone: string;

    constructor(id: number, name: string, email: string, phone:string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    getDetails(): void{
        console.log("Thông tin của khách hàng");
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Phone: ${this.phone}`);
    }

}

abstract class Room{
    public roomId: number;
    public type: string;
    public pricePerNight: number;
    public isAvailable: boolean;

    constructor(roomId: number, type: string, pricePerNight: number, isAvailable: boolean){
        this.roomId = roomId;
        this.type = type;
        this.pricePerNight  = pricePerNight;
        this.isAvailable = isAvailable;
    }

    bookRoom(): void{
        this.isAvailable = false;
    }

    releaseRoom():void{
        this.isAvailable = true;
    }

    abstract calculateCost(nights: number): number;

    abstract getAdditionalServices():void

    abstract applyDiscount(discountRate: number): number;

    abstract getCancellationPolicy():void;
}


class StandarRoom extends Room{
    constructor(roomId: number, type: string, pricePerNight: number,isAvailable: boolean){
        super(roomId,type,pricePerNight,isAvailable);
    }

    override calculateCost(nights: number): number {
        return this.pricePerNight*nights;
    }

    override getAdditionalServices(): void{

    }

    override applyDiscount(discountRate: number): number {
        return this.pricePerNight*discountRate;
    }

    override getCancellationPolicy(): void {
        console.log("Hoàn lại 100% nếu hủy trước 1 ngày.");
    }
}

class DeluxeRoom extends Room{
    constructor(roomId: number, type: string, pricePerNight: number,isAvailable: boolean){
        super(roomId,type,pricePerNight,isAvailable);
    }

    override calculateCost(nights: number): number {
        return this.pricePerNight*nights;
    }

    override getAdditionalServices(): void{

    }

    override applyDiscount(discountRate: number): number {
        return this.pricePerNight*discountRate;
    }

    override getCancellationPolicy(): void {
        console.log("Hoàn lại 50% nếu hủy trước 2 ngày.");
    }
}

class SuiteRoom extends Room{
    constructor(roomId: number, type: string, pricePerNight: number,isAvailable: boolean){
        super(roomId,type,pricePerNight,isAvailable);
    }

    override calculateCost(nights: number): number {
        return this.pricePerNight*nights;
    }

    override getAdditionalServices(): void{

    }

    override applyDiscount(discountRate: number): number {
        return this.pricePerNight*discountRate;
    }

    override getCancellationPolicy(): void {
        console.log("Không hoàn lại tiền nếu hủy.");
    }
}

class Booking{
    public bookingId: number;
    public customer: Person;
    public room: Room;
    public nights: number;
    public totalCost: number;

    constructor(bookingId: number, customer: Person, room: Room, nights: number, totalCost: number){
        this.bookingId = bookingId;
        this.customer = customer;
        this.room = room;
        this. nights = nights;
        this.totalCost = totalCost;
    }

    getDetails(): void{
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

type roomType = "StandarRoom" | "DeluxeRoom" | "SuiteRoom";

class HotelManager{
    public rooms: Room[];
    public bookings: Booking[];
    public customers: Person[];

    constructor(){
        this.rooms = [];
        this.bookings = [];
        this.customers = [];
    }

    addRoom(type: roomType, pricePerNight: number): void{
        switch (type){
            case "StandarRoom":
                let roomStand: StandarRoom = new StandarRoom(Math.random(),type,pricePerNight,false);
                this.rooms.push(roomStand);
                break;
            case "DeluxeRoom":
                let roomDelux: DeluxeRoom = new DeluxeRoom(Math.random(),type,pricePerNight,false);
                this.rooms.push(roomDelux);
                break;
            case "SuiteRoom":
                let roomSuite: SuiteRoom = new SuiteRoom(Math.random(),type,pricePerNight,false);
                this.rooms.push(roomSuite);
                break;
        }
    }

    addCustomer(name: string, email: string, phone: string): Person{
        let customer: Person = new Person(Math.random(),name,email,phone);
        this.customers.push(customer);
        return customer;
    }

    bookRoom(customerId: number, roomId: number, nights: number): Booking{
        let customer = this.customers.find(cu => cu.id);
        let room = this.rooms.find(r => r.roomId);
        if(customer === undefined || room === undefined){
            console.log("Không tìm thấy");
            return this.bookings[-1];
        }else{
            let total: number = room.calculateCost(nights);
            let booking = new Booking(Math.random(),customer,room,nights,total);
            this.bookings.push(booking);
            return booking;
        }
    }

    releaseRoom(roomId: number): void{
        let room = this.rooms.find(r=>r.roomId === roomId);
        if(room === undefined){
            console.log("Không tìm thấy");
        }else{
            room.releaseRoom();
        }
    }

    listAvailableRooms(): void{
        console.log("Danh sách phòng còn trống:");
        this.rooms.filter(function(element: Room, index: number){
            if(element.isAvailable === true){
                console.log(`RoomId: ${element.roomId}`);
                console.log(`Type: ${element.type}`);
                console.log(`Price per Night: ${element.pricePerNight}`);
                console.log(`Trạng thái phòng: ${element.isAvailable}`);
                console.log("-------------------------------------------");
            }
        })
    }

    listBookingsByCustomer(customerId: number): void{
        console.log("Danh sách đặt phòng của một khách hàng");
        this.bookings.filter(function(element: Booking, index: number){
            if(element.customer.id === customerId){
                element.getDetails();
                console.log("--------------------");
            }
        })
    }

    calculateTotalRevenue(): number{
        return this.bookings.reduce((acc, curent) => acc + curent.totalCost,0);
    }

    getRoomTypesCount(): void{
        let sumStand: number =0;
        let sumDulex: number = 0;
        let sumSuite: number = 0;

        this.rooms.reduce((acc, curr) => {
            acc[curr.type] = (acc[curr.type] || 0) +1;
            return acc;
        },{});

    }

}

class Main{
    public hotelManager: HotelManager;
    constructor(){
        this.hotelManager = new HotelManager();
    }

    boostrap(){
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

        let check: boolean = true;

        while(check){
            let input: string = String("Hãy nhập vào từ 1-10 để điều khiển chương trình")
            switch (input){
                case "1":
            }
        }
    }
}