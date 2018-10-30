let asyncAdd = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            }else{
                reject('Arguments must be a number');
            }
        }, 1000);
    });
};

let somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hey. It worked");
        // reject('Unable to fulfill promise');
    }, 3000);
});

somePromise.then((message) => {
    console.log('Success: ', message);
}).catch((message) => {
    console.log('Error: ', message);
});

asyncAdd(10,10).then((res) => {
    console.log(`${10} + ${10} = ${res}`);
    return asyncAdd(res, 33);
}).then((res) => {
    console.log(`${10} + ${10} + ${33} = ${res}`);
}).catch((err) => {
    console.log('Error: ', err);
})