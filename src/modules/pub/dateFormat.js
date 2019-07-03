export function dateFormat(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
	if (date == "" || date == undefined || date == null) {
		return ""
	} else {
		date = new Date(date)
	}
	if (fmt == "" || fmt == undefined || fmt == null) {
		return "";
	}
	var o = {
		"M+": date.getMonth() + 1,
		//月份 
		"d+": date.getDate(),
		//日 
		"h+": date.getHours(),
		//小时 
		"m+": date.getMinutes(),
		//分 
		"s+": date.getSeconds(),
		//秒 
		"q+": Math.floor((date.getMonth() + 3) / 3),
		//季度 
		"S": date.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

export function getDate(date, useless) {
	if (date != '' && date != undefined) {
		return date.substring(5, date.length - 3)
	}
	return ""
}

export function getAfterDate(date, days) {
	var time = (new Date(date)).getTime()
	return new Date(time + days * 24 * 60 * 60 * 1000)
}
export function getBeforeDate(date, days) {
	var time = (new Date(date)).getTime()
	return new Date(time - days * 24 * 60 * 60 * 1000)
}

//获得某月的最后一天
export function getLastDay(year, month) {
	//取当前的年份
	var new_year = year;
	//取下一个月的第一天，方便计算（最后一天不固定）
	var new_month = month++;
	if (month > 12) {
		//月份减
		new_month -= 12;
		//年份增
		new_year++;
	}
	//取当年当月中的第一天
	var new_date = new Date(new_year, new_month, 1);
	//获取当月最后一天日期
	return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();
}
export function getCurrentMonth(currentDate = (new Date())) {
	var d = new Date(currentDate)
	var y = d.getFullYear()
	var m = d.getMonth() + 1
	return {
		s: y + '-' + m + '-' + '01',
		e: y + '-' + m + '-' + getLastDay(y,m)
	}
}