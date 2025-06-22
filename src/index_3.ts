/** 세 번째 실습 */
enum Role {
  LIBRARIAN, // 사서
  MEMBER, // 멤버
}

abstract class User {
  constructor(public name: string, public age: number) { }
  abstract getRole(): Role;
}

class Member extends User {
  constructor(name: string, age: number) { // 생성자 정의
    super(name, age); // 초기화 목적
  }
  getRole(): Role {
    return Role.MEMBER;
  }
}

class Librarian extends User {
  constructor(name: string, age: number) {
    super(name, age);
  }
  getRole(): Role {
    return Role.LIBRARIAN;
  }
}

class Book {
  constructor(public title: string, public author: string, public pDate: Date) { }
}

interface RentManager {
  getBooks(): Book[];
  addBook(user: User, book: Book): void;
  removeBook(user: User, book: Book): void;
  rentBook(user: Member, book: Book): void;
  returnBook(user: Member, book: Book): void;
}

class Library implements RentManager {

  private books: Book[] = [];
  private rentedBooks: Map<string, Book> = new Map<string, Book>();

  getBooks(): Book[] {
    let temp: Book[] = [];
    for (const element of this.books) {
      temp.push(JSON.parse(JSON.stringify(element)));
    }

    return temp;
  }
  addBook(user: User, book: Book): void {
    if (user.getRole() !== Role.LIBRARIAN) {
      return;
    }

    this.books.push(book);

  }
  removeBook(user: User, book: Book): void {
    if (user.getRole() !== Role.LIBRARIAN) {
      return;
    }
    let idx: number = this.books.findIndex(item => item.title === book.title && item.author === book.author && item.pDate === book.pDate);
    this.books.splice(idx, 1);
  }
  rentBook(user: Member, book: Book): void {
    if (user.getRole() !== Role.MEMBER) {
      return;
    }
    if (!this.rentedBooks.has(user.name)) {
      this.rentedBooks.set(user.name, book);
      console.log(`${user.name}님이 [${book.title}] 책을 빌렸습니다.`);
    } else {
      console.log(
        `${user.name}님은 이미 다른 책을 대여중이라 빌릴 수 없습니다.`
      );
    }


  }
  returnBook(user: Member, book: Book): void {
    if (user.getRole() !== Role.MEMBER) {
      return;
    }
    if (this.rentedBooks.get(user.name) === book) {
      this.rentedBooks.delete(user.name);
      console.log(`${user.name}님이 [${book.title}] 책을 반납했어요!`);
    } else {
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