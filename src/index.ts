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

  function main(): void {
	const spartan = createStudent('Spartan', 30, 95, 89, 76, 90, 97);
	printResult(spartan);
}

main();