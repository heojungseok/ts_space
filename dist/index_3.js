"use strict";
/** 세 번째 실습 */
var Role;
(function (Role) {
    Role[Role["LIBRARIAN"] = 0] = "LIBRARIAN";
    Role[Role["MEMBER"] = 1] = "MEMBER";
})(Role || (Role = {}));
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Member extends User {
    constructor(name, age) {
        super(name, age); // 초기화 목적
    }
    getRole() {
        return Role.MEMBER;
    }
}
class Librarian extends User {
    constructor(name, age) {
        super(name, age);
    }
    getRole() {
        return Role.LIBRARIAN;
    }
}
class Book {
    constructor(title, author, pDate) {
        this.title = title;
        this.author = author;
        this.pDate = pDate;
    }
}
class Library {
    constructor() {
        this.books = [];
        this.rentedBooks = new Map();
    }
    getBooks() {
        let temp = [];
        for (const element of this.books) {
            temp.push(JSON.parse(JSON.stringify(element)));
        }
        return temp;
    }
    addBook(user, book) {
        if (user.getRole() !== Role.LIBRARIAN) {
            return;
        }
        this.books.push(book);
    }
    removeBook(user, book) {
        if (user.getRole() !== Role.LIBRARIAN) {
            return;
        }
        let idx = this.books.findIndex(item => item.title === book.title && item.author === book.author && item.pDate === book.pDate);
        this.books.splice(idx, 1);
    }
    rentBook(user, book) {
        if (user.getRole() !== Role.MEMBER) {
            return;
        }
        if (!this.rentedBooks.has(user.name)) {
            this.rentedBooks.set(user.name, book);
            console.log(`${user.name}님이 [${book.title}] 책을 빌렸습니다.`);
        }
        else {
            console.log(`${user.name}님은 이미 다른 책을 대여중이라 빌릴 수 없습니다.`);
        }
    }
    returnBook(user, book) {
        if (user.getRole() !== Role.MEMBER) {
            return;
        }
        if (this.rentedBooks.get(user.name) === book) {
            this.rentedBooks.delete(user.name);
            console.log(`${user.name}님이 [${book.title}] 책을 반납했어요!`);
        }
        else {
            console.log(`${user.name}님은 [${book.title}] 책을 빌린적이 없어요!`);
        }
    }
}
function main() {
    const myLibrary = new Library();
    const librarian = new Librarian("르탄이", 30);
    const member1 = new Member("예비개발자", 30);
    const member2 = new Member("독서광", 28);
    const book = new Book("TypeScript 문법 종합반", "강창민", new Date());
    const book2 = new Book("금쪽이 훈육하기", "오은영", new Date());
    const book3 = new Book("요식업은 이렇게!", "백종원", new Date());
    myLibrary.addBook(librarian, book);
    myLibrary.addBook(librarian, book2);
    myLibrary.addBook(librarian, book3);
    const books = myLibrary.getBooks();
    console.log("대여할 수 있는 도서 목록:", books);
    myLibrary.rentBook(member1, book);
    myLibrary.rentBook(member2, book2);
    myLibrary.returnBook(member1, book);
    myLibrary.returnBook(member2, book2);
}
main();
