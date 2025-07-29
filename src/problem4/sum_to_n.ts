
// O(1)
function sum_to_n_a(n: number): number {

    // O(1)
    if (n === 0) return 0;

    // O(n)
    if (n < 0) {
        return -sum_to_n_a(-n);
    }
    // O(1)
    return (n * (n + 1)) / 2; // Gauss's formula: n(n+1)/2
}

// O(n)
function sum_to_n_b(n: number): number {
    // O(1)
    if (n === 0) return 0;

    // O(1)
    let sum = 0;

    // O(n)
    if (n > 0) {

        // O(n)
        for (let i = 1; i <= n; i++) {
            // O(1)
            sum += i;
        }
    } else {
        // O(n)
        for (let i = n; i <= -1; i++) {
            // O(1)
            sum += i;
        }
    }


    return sum;
}

// O(n)
function sum_to_n_c(n: number): number {

    // O(1)
    if (n===0) return 0;

    // O(n)
    const numbers = Array.from({ length:Math.abs(n) }, (_, i) => i + 1); // Create an array from 1 to n 

    // O(n)
    if (n < 0) {
        numbers.reverse();
    }

    // O(n)
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

export { sum_to_n_a, sum_to_n_b, sum_to_n_c };

if (require.main === module) {  
    console.log("Testing sum_to_n_a implementation:");

    const testCases = [0, 1, 5, 10, -5, -1];

    testCases.forEach(n => {
        const result = sum_to_n_a(n);
        console.log(`n=${n}: ${result}`);
    });

    console.log("\nTesting sum_to_n_b implementation:");
    testCases.forEach(n => {
        const result = sum_to_n_b(n);
        console.log(`n=${n}: ${result}`);
    });

    console.log("\nTesting sum_to_n_c implementation:");
    testCases.forEach(n => {
        const result = sum_to_n_c(n);
        console.log(`n=${n}: ${result}`);
    });
}
