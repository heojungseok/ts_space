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
function main() {
    const spartan = createStudent('Spartan', 30, 95, 89, 76, 90, 97);
    printResult(spartan);
}
main();
