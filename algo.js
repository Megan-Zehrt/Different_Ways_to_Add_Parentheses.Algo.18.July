// 241. Different Ways to Add Parentheses



// Given a string expression of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. You may return the answer in any order.

// The test cases are generated such that the output values fit in a 32-bit integer and the number of different results does not exceed 104.

 





/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function(expression) {
    let memo = new Map();

    function compute(expression) {
        if (memo.has(expression)) {
            return memo.get(expression);
        }

        let results = [];
        for (let i = 0; i < expression.length; i++) {
            let char = expression[i];
            if (char === '+' || char === '-' || char === '*') {
                let leftPart = compute(expression.substring(0, i));
                let rightPart = compute(expression.substring(i + 1));
                
                for (let left of leftPart) {
                    for (let right of rightPart) {
                        let result;
                        if (char === '+') {
                            result = left + right;
                        } else if (char === '-') {
                            result = left - right;
                        } else if (char === '*') {
                            result = left * right;
                        }
                        results.push(result);
                    }
                }
            }
        }

        if (results.length === 0) {
            results.push(parseInt(expression));
        }

        memo.set(expression, results);
        return results;
    }

    return compute(expression);
};
