export function add(a, b) {
    let carry = 0;
    let result = '';
    let maxLength = Math.max(a.length, b.length);

    for (let i = 0; i < maxLength; i++) {
        const sum = Number(a[a.length - 1 - i] || 0) + Number(b[b.length - 1 - i] || 0) + carry;
        carry = sum > 9 ? 1 : 0;
        result = (sum % 10) + result;
    }

    if (carry > 0) {
        result = carry + result;
    }

    return result;
}
  
export function multiply(a, b) {
    let result = '0';

    for (let i = b.length - 1; i >= 0; i--) {
        let carry = 0;
        let tempResult = '';

        for (let j = a.length - 1; j >= 0; j--) {
            const product = Number(b[i]) * Number(a[j]) + carry;
            carry = Math.floor(product / 10);
            tempResult = (product % 10) + tempResult;
        }

        if (carry > 0) {
            tempResult = carry + tempResult;
        }

        for (let k = 0; k < b.length - 1 - i; k++) {
            tempResult += '0';
        }

        result = add(result, tempResult);
    }

    return result;
}
  
export function subtract(a, b) {
    let borrow = 0;
    let result = '';
    let maxLength = Math.max(a.length, b.length);

    for (let i = 0; i < maxLength; i++) {
        const diff = Number(a[a.length - 1 - i] || 0) - Number(b[b.length - 1 - i] || 0) - borrow;
        borrow = diff < 0 ? 1 : 0;
        result = Math.abs(diff % 10) + result;
    }

    return result.replace(/^0+/, '');
}
  
export function divide(a, b) {
    if (b === '0') {
        throw new Error('Cannot divide by zero');
    }

    if (a === '0') {
        return '0';
    }

    let quotient = '';
    let remainder = '';

    for (let i = 0; i < a.length; i++) {
        remainder += a[i];

        if (Number(remainder) < Number(b) && i !== a.length - 1) {
            quotient += '0';
        } else {
            let count = 0;

            while (Number(remainder) >= Number(b)) {
                remainder = subtract(remainder, b);
                count++;
            }

        quotient += count.toString();
        }
    }

    return [quotient.replace(/^0+/, ''), remainder];
}