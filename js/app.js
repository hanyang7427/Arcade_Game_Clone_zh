
// 此文件参考了https://zhuanlan.zhihu.com/p/30492515
// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y) {
    // Enemy的坐标
    this.x = x;
    this.y = y;
    this.speed = 150 + Math.random()*150;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;
    if (this.x>500){
        this.x = -100;
        this.y = (Math.floor(Math.random()*3)+1)*85-30;
    }

};

// 此为游戏必须的函数，用来在屏幕上画出敌人
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function (x,y) {
    // Player的坐标
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
// 处理达到河
Player.prototype.update = function () {
    if(this.y  < 77) {
        this.x = 200;
        this.y = 385;
        alert('YOU WIN!')
    }
};

//处理上下左右
Player.prototype.handleInput = function (allowKeys) {
    switch (allowKeys){
        case 'left':
            if (this.x>0){this.x -= 100;} break;
        case 'right':
            if (this.x<400){this.x += 100;} break;
        case 'up':
            if (this.y>=77){this.y -=77;} break;
        case 'down':
            if (this.y<385){this.y +=77;} break;
    }
};
// 此为游戏必须的函数，用来在屏幕上画出玩家
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 检查碰撞
Player.prototype.checkCollections = function(){
    allEnemies.map(ememy=>{
        if (Math.abs(ememy.x - this.x) <99 && Math.abs(ememy.y - this.y) < 76){
            this.x = 200;
            this.y = 385;
        }
    })
    };

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(200,385);
var allEnemies = [];
for(var i=0;i<3;i++){
    var enemy = new Enemy(0,(Math.floor(Math.random()*3)+1)*85 - 30);
    allEnemies.push(enemy);
}

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
