/* eslint-disable  no-restricted-syntax */
export default function clearObject(oj){
    let newoj = {...oj}
    for (let i in newoj) {
        if(Object.prototype.hasOwnProperty.call(newoj, i)){
            if (oj[i] === null || oj[i] === undefined) {
                delete oj[i]
            }
        }
    }
    return oj
}