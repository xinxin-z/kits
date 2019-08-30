/* 
  我们将来在开发的时候，肯定会有很多重复使用的代码
  这些代码我们应该封装起来，以提高工作效率

  怎么封装呢？
    通常我们喜欢把方法封装到对象身上
*/
var kits = {};

kits.dispatchZero = function (num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

// 把方法都放到对象的身上
// 获取当前时间
kits.formatDate = function () {
  var date = new Date();
  // 把年月日时分秒获取
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = this.dispatchZero(month);
  var day = date.getDate();
  day = this.dispatchZero(day);
  var hour = date.getHours();
  hour = this.dispatchZero(hour);
  var minute = this.dispatchZero(date.getMinutes());
  var second = this.dispatchZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}



//  randomInt  获取n到m之间的随机整数
kits.randomInt = function(n,m){
  return Math.floor(Math.random() * (m-n+1) + n);
}



// 常见的给id的方式1
// 当前时间戳 + 大的随机数
kits.getId = function(){
  // 返回一个不容易重复的id
  let date = new Date();
  let time = date.getTime();// 得到的是从1970年1月1日到现在为止的毫秒总数
  // 然后在得到一个足够大的随机数，把毫秒和随机数相连，作为新的id
  let r = this.randomInt(100000,999999);
  // 把两个数字连起来
  let id = time + '' + r;
  return id;
}





// 获取随机颜色 randomRGBColor
kits.randomColor=function () {
  var r = random(0, 255);
  var g = random(0, 255);
  var b = random(0, 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// 每隔一段时间 , 调用第一个参数作为函数一次
// setInterval(function () {
//   // 修改body的背景颜色为随机颜色
//   document.body.style.backgroundColor = randomColor();
// }, 5000);






// randomHexColor  获取一个随机的十六进制的颜色
  //定义一个函数，实现随机生成十六进制颜色值
  kits.randomHexColor =function getColor(){
    //定义字符串变量colorValue存放可以构成十六进制颜色值的值
    var colorValue="0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
    //以","为分隔符，将colorValue字符串分割为字符数组["0","1",...,"f"]
    var colorArray = colorValue.split(",");
     var color="#";//定义一个存放十六进制颜色值的字符串变量，先将#存放进去
      //使用for循环语句生成剩余的六位十六进制值
     for(var i=0;i<6;i++){
          //colorArray[Math.floor(Math.random()*16)]随机取出
         // 由16个元素组成的colorArray的某一个值，然后将其加在color中，
         //字符串相加后，得出的仍是字符串
          color+=colorArray[Math.floor(Math.random()*16)];
     }
     return color;
}
//测试函数
//  console.log(getColor());


//5. getLocalDataArray(key)  从localStorage里面根据指定的键(key)获取一个数组
// 从本地存储中读取复杂数据
kits.getArray=kits.getLocalDataArray=function (key) {
  let json=localStorage.getItem(key);
  let arr=JSON.parse(json);
  return arr||[];
  
}

//6. saveLocalDataArray(key,arr)   将一个数组(arr)以指定的键(key)存储到localStorage里面
// 要存储的复杂数据 默认是存储json格式字符串
kits.setData=kits.saveLocalDataArray=function (key,arr) {
  let json=JSON.stringify(arr);
  localStorage.setItem(key,json);
}

//7. appendDataIntoArray(key,data)  向localStorage里面指定键(key)的数组数据追加一个数据对象（data）
kits.appendDataIntoArray=function (key,data) {
  arr=this.getLocalDataArray(key,arr);
  arr=arr||[];
  arr.unshift(data);
  this.saveLocalDataArray(key.arr);
}


//8. deleteLocalDataById(key,id)   根据对应的id从localStorage中指定键(key)的数组中删除一条数据
kits.deleteLocalDataById=function (key,id) {
  arr=this.getLocalDataArray(key,arr);
  arr=arr||[];
  arr.forEach((e,i)=>{
    if(e.id==id.id){
      arr.splice(0,1);
    }
  })
  this.saveLocalDataArray(key,arr);
}


//9. modifyLocalDataById(key,id,data)  根据id修改localStorage里面的指定键(key)的数组数据
kits.modifyLocalDataById=function (key,id,data) {
  arr=this.getLocalDataArray(key,arr);
  arr=arr||[];
  arr.forEach((e,i)=>{
    if(e.id==id.id){
      e.id=data.id;
      e.content=data.content;
    }
  })
this.saveLocalDataArray(key,arr);
}