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
    for (let key in obj) {
        if (typeof obj === 'object' && obj.hasOwnProperty(key)) {
            let curObj = obj[key];
            if (stack.indexOf(curObj) !== -1) {
                return true;
            }
            stack.push(curObj);
            if (!isCircularObj(curObj, stack)) {
                return true;
            }
        }
    }
    return false;
}
console.log(a);
console.log(isCircularObj(a));


