/**
 * 첫 번째 실습
 */
interface Student {
    name: string;
    age: number;
    scores: {
        korean: number;
        math: number;
        society: number;
        science: number;
        english: number;
    };
  }

function assignGrade(average: number): string { 
    if (average >= 90) {
        return 'A';
    } else if (average < 90 && average >= 80) {
        return 'B';
    } else if (average < 80 && average >= 70) {
        return 'C';
    } else if (average < 70 && average >= 60) {
        return 'D';
    } else {
        return 'F';
    }
    
}

function calculateAverage(student: Student): number { 
    
    let scores = student.scores;
    let avg = 0;
    avg += scores.korean;
    avg += scores.math;
    avg += scores.society;
    avg += scores.science;
    avg += scores.english;
    
    return avg / Object.keys(scores).length;

}

function createStudent(name: string, age: number, korean: number, math: number, society: number, science: number, english: number): Student {
    return {
      name,
      age,
      scores: {
        korean,
        math,
        society,
        science,
        english,
      },
    };
  }

  function printResult(student: Student): void {
    const average = calculateAverage(student); // 평균 
    const grade = assignGrade(average); // 학점
    console.log(`${student.name} (${student.age}세) - 평균: ${average.toFixed(2)}, 학점: ${grade}`);
  }

  function main_first(): void {
	const spartan = createStudent('Spartan', 30, 95, 89, 76, 90, 97);
	printResult(spartan);
}

main_first();

/**
 * 두 번째 실습
 */
interface Beverage {
  name: string;
  price: number;
}

interface User {
  id: number;
  name: string;
  role: "admin" | "customer";
}

interface Order {
  orderId: number;
  customerId: number;
  customerName: string;
  beverageName: string;
  status: "placed" | "completed" | "picked-up";
}

let beverages: Beverage[] = [];
let orders: Order[] = [];

function isAdmin(user: User): boolean {
  return user.role === "admin";
}

function isCustomer(user: User): boolean {
  return user.role === "customer";
}

function addBeverage(user: User, name: string, price: number): void {
  if (!isAdmin(user)) {
    console.log("권한이 없습니다.");
    return;
  }

  const newBeverage: Beverage = { name, price };
  beverages.push(newBeverage);
}

function removeBeverage(user: User, beverageName: string): void {
  if (!isAdmin(user)) {
    console.log("권한이 없습니다.");
    return;
  }

  beverages = beverages.filter((beverage) => beverage.name !== beverageName);
}

function getBeverages(user: User): Beverage[] {
  if (!user) {
    return [];
  }
  return beverages;
}

function findBeverage(beverageName: string): Beverage | undefined {
  return beverages.find((beverage) => beverage.name === beverageName);
}

function placeOrder(user: User, beverageName: string): number {
  if (!isCustomer(user)) {
    console.log("권한이 없습니다.");
    return -1;
  }

  const beverage = findBeverage(beverageName);
  if (!beverage) {
    console.log("해당 음료를 찾을 수 없습니다.");
    return -1;
  }

  const newOrder: Order = {
    orderId: orders.length + 1,
    customerId: user.id,
    customerName: user.name,
    beverageName,
    status: "placed",
  };
  orders.push(newOrder);
  return newOrder.orderId;
}

function completeOrder(user: User, orderId: number): void {
  if (!isAdmin(user)) {
    console.log("권한이 없습니다.");
    return;
  }

  const order = orders.find((order) => order.orderId === orderId);
  if (order) {
    order.status = "completed";
    console.log(
      `[고객 메시지] ${order.customerName}님~ 주문하신 ${order.beverageName} 1잔 나왔습니다~`
    );
  }
}

function pickUpOrder(user: User, orderId: number): void {
  if (!isCustomer(user)) {
    console.log("권한이 없습니다.");
    return;
  }

  const order = orders.find(
    (order) => order.orderId === orderId && order.customerId === user.id
  );
  if (order && order.status === "completed") {
    order.status = "picked-up";
    console.log(
      `[어드민 메시지] 고객 ID[${order.customerId}]님이 주문 ID[${orderId}]을 수령했습니다.`
    );
  }
}

function main_second() {
  const admin: User = {
    id: 1,
    name: "바리스타",
    role: "admin",
  };

  // 유저 생성
  const member1: User = {
    id: 2,
    name: "르탄이",
    role: "customer",
  };

  const member2: User = {
    id: 3,
    name: "꿈꾸는개발자",
    role: "customer",
  };

  // 음료 등록
  addBeverage(admin, "아메리카노", 4000);
  addBeverage(admin, "카페라떼", 4500);
  addBeverage(admin, "에스프레소", 3000);

  // 음료 삭제
  removeBeverage(admin, "에스프레소");

  console.log(
    `안녕하세요~ ${
      member1.name
    } 고객님! 별다방에 오신 것을 환영합니다. 저희는 ${JSON.stringify(
      getBeverages(member1)
    )}를 판매하고 있습니다.`
  );
  // 음료 주문
  const orderId1 = placeOrder(member1, "아메리카노");
  if (orderId1 > 0) {
    setTimeout(() => {
      // 음료 제작 완료
      completeOrder(admin, orderId1);
      // 음료 수령
      pickUpOrder(member1, orderId1);
    }, 1000);
  }

  console.log(
    `안녕하세요~ ${
      member2.name
    } 고객님! 별다방에 오신 것을 환영합니다. 저희는 ${JSON.stringify(
      getBeverages(member2)
    )}를 판매하고 있습니다.`
  );
  // 음료 주문
  const orderId2 = placeOrder(member2, "카페라떼");
  if (orderId2 > 0) {
    setTimeout(() => {
      // 음료 제작 완료
      completeOrder(admin, orderId2);
      // 음료 수령
      pickUpOrder(member2, orderId2);
    }, 3000);
  }
}

main_second();