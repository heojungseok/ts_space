"use strict";
function assignGrade(average) {
    if (average >= 90) {
        return 'A';
    }
    else if (average < 90 && average >= 80) {
        return 'B';
    }
    else if (average < 80 && average >= 70) {
        return 'C';
    }
    else if (average < 70 && average >= 60) {
        return 'D';
    }
    else {
        return 'F';
    }
}
function calculateAverage(student) {
    let scores = student.scores;
    let avg = 0;
    avg += scores.korean;
    avg += scores.math;
    avg += scores.society;
    avg += scores.science;
    avg += scores.english;
    return avg / Object.keys(scores).length;
}
function createStudent(name, age, korean, math, society, science, english) {
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
function printResult(student) {
    const average = calculateAverage(student); // 평균 
    const grade = assignGrade(average); // 학점
    console.log(`${student.name} (${student.age}세) - 평균: ${average.toFixed(2)}, 학점: ${grade}`);
}
function main_first() {
    const spartan = createStudent('Spartan', 30, 95, 89, 76, 90, 97);
    printResult(spartan);
}
main_first();
let beverages = [];
let orders = [];
function isAdmin(user) {
    return user.role === "admin";
}
function isCustomer(user) {
    return user.role === "customer";
}
function addBeverage(user, name, price) {
    if (!isAdmin(user)) {
        console.log("권한이 없습니다.");
        return;
    }
    const newBeverage = { name, price };
    beverages.push(newBeverage);
}
function removeBeverage(user, beverageName) {
    if (!isAdmin(user)) {
        console.log("권한이 없습니다.");
        return;
    }
    beverages = beverages.filter((beverage) => beverage.name !== beverageName);
}
function getBeverages(user) {
    if (!user) {
        return [];
    }
    return beverages;
}
function findBeverage(beverageName) {
    return beverages.find((beverage) => beverage.name === beverageName);
}
function placeOrder(user, beverageName) {
    if (!isCustomer(user)) {
        console.log("권한이 없습니다.");
        return -1;
    }
    const beverage = findBeverage(beverageName);
    if (!beverage) {
        console.log("해당 음료를 찾을 수 없습니다.");
        return -1;
    }
    const newOrder = {
        orderId: orders.length + 1,
        customerId: user.id,
        customerName: user.name,
        beverageName,
        status: "placed",
    };
    orders.push(newOrder);
    return newOrder.orderId;
}
function completeOrder(user, orderId) {
    if (!isAdmin(user)) {
        console.log("권한이 없습니다.");
        return;
    }
    const order = orders.find((order) => order.orderId === orderId);
    if (order) {
        order.status = "completed";
        console.log(`[고객 메시지] ${order.customerName}님~ 주문하신 ${order.beverageName} 1잔 나왔습니다~`);
    }
}
function pickUpOrder(user, orderId) {
    if (!isCustomer(user)) {
        console.log("권한이 없습니다.");
        return;
    }
    const order = orders.find((order) => order.orderId === orderId && order.customerId === user.id);
    if (order && order.status === "completed") {
        order.status = "picked-up";
        console.log(`[어드민 메시지] 고객 ID[${order.customerId}]님이 주문 ID[${orderId}]을 수령했습니다.`);
    }
}
function main_second() {
    const admin = {
        id: 1,
        name: "바리스타",
        role: "admin",
    };
    // 유저 생성
    const member1 = {
        id: 2,
        name: "르탄이",
        role: "customer",
    };
    const member2 = {
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
    console.log(`안녕하세요~ ${member1.name} 고객님! 별다방에 오신 것을 환영합니다. 저희는 ${JSON.stringify(getBeverages(member1))}를 판매하고 있습니다.`);
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
    console.log(`안녕하세요~ ${member2.name} 고객님! 별다방에 오신 것을 환영합니다. 저희는 ${JSON.stringify(getBeverages(member2))}를 판매하고 있습니다.`);
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
