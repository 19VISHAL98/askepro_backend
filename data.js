
//  let n= [1,2,3]

// let m  =[['a'], ['b'], ['c']]
// let d=[];
// for(let i = 0 ; i<n.length  && i<m.length; i++){
// var  value = `{${n[i]} : ${m[i]}}`
// d.push(value)
// }
// console.log(d)

let n =[1, 2, 3,];
let m = ["a","b","c"]

m.forEach(k => {
    n.forEach(i => {
        console.log(i, k)
    });
};