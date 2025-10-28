# Node Calculator Project

Welcome to the **Node.js Calculator** documentation!

## 📘 Overview
This project is a simple calculator implemented in Node.js.
It performs basic arithmetic operations and is tested with Jest.
The entire build, test, and deployment process is automated using Jenkins and GitHub Actions.

---

## ⚙️ Functions

| Function   | Description                        | Example               |
|-------------|------------------------------------|-----------------------|
| `add(a,b)` | Returns the sum of `a` and `b`     | `add(3,2) → 5`        |
| `subtract(a,b)` | Returns the difference          | `subtract(5,2) → 3`   |
| `multiply(a,b)` | Returns the product            | `multiply(3,2) → 6`   |
| `divide(a,b)` | Returns the quotient (error if `b=0`) | `divide(6,3) → 2` |
| `modulus(a,b)` | Returns the remainder           | `modulus(7,3) → 1`    |

---

## 🧪 Testing
Run all tests locally using:
```bash
npm test

