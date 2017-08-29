var a = {
    num: 1,
}
a.b = a;

function isCircularObjEasyFn(obj) {
    try {
        JSON.stringify(obj);
    } catch (err) {
        if (err.message === 'Converting circular structure to JSON') {
            return true;
        } else {
            return false;
        }
    }
    return false;
}
console.log(a);
console.log(isCircularObjEasyFn(a));

function isCircularObj(obj, stack = []) {
    if (stack.indexOf(obj) > -1) {
        return true;
    }
    stack.push(obj);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let value = obj[key];
            if (typeof value === 'object') {
                if (stack.indexOf(value) > -1) {
                    return true;
                }
                stack.push(value);
                if (!isCircularObj(value, stack)) {
                    return true;
                } else {
                    stack.pop();
                }
            }
        }
    }
    stack.pop();
    return false;
}
var b = {
    arr: [1, 2],
}
var c = {
    arr: [1, 2],
}
var d = {
    arr: [1, 2],
}
c.d = c.arr;
d.e = d;
console.log(isCircularObj(b));
console.log(isCircularObj(c));
// 引用父对象为环
console.log(isCircularObj(d));


