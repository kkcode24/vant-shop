// 过滤空值，返回新对象
export function filterEmpyKey(data) {
    let obj = {};
    Object.keys(data).forEach(item => {
      if(data[item]!==null && data[item] !== ''&&typeof(data[item])!=='undefined'&&!obj[item]){
        obj[item] = data[item];
      }
    })
    return obj;
}