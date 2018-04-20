function promiseMap (arr, fn, concurrency = 1) {
    return new Promise((resolve, reject) => {
        let running = 0;
        let completed = 0;
        let started = 0;
        let ret = [];

        function run () {
            if (completed >= arr.length) {
                return resolve(ret);
            }

            while (running < concurrency && started < arr.length) {
                running++;
                started++;

                let index = started - 1;
                fn.call(arr[index], arr[index], index)
                    .then((value) => {
                        running--;
                        completed++;
                        ret[index] = value;
                        run();
                    })
                    .catch(reject);
            }
        }
        run();
    });
}

promiseMap([1, 2, 3], (item, index) => {
    if (index === 0) {
        console.log('-----并行-----');
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('item', item);
            console.log('index', index);
            resolve(item + 1);
        }, 1000);
    });
}, 3).then((ret) => {
    console.log('ret', ret);
    promiseMap([1, 2, 3], (item, index) => {
        if (index === 0) {
            console.log('-----串行-----');
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('item', item);
                console.log('index', index);
                resolve(item + 1);
            }, 1000);
        });
    }, 1).then((ret) => {
        console.log('ret', ret);
    });
});