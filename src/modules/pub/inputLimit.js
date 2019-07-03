export function limit2Float(e){
	var reg =  /^[0-9]+([.]{1}[0-9]{1,2})?$/
    let val = e.target.value.replace(/\ /g, "")
    let length = val.length
    if(val.indexOf('.')!=val.lastIndexOf('.')&&val.indexOf('.')>=0){
      e.target.value = parseFloat(val)
    }else if(val.indexOf('.')==(length-1)){
      return
    }else if(length&&!reg.test(val)){
      val = parseFloat(val)
      if((val+'').indexOf('.')<(length-3)){
        //val = val.toFixed(2)
        val = (val+'').substr(0,(val+'').indexOf('.')+3)
      }
      e.target.value = val
    }
}