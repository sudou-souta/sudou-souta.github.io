var imageElements = [];
let flag = false;
// 画像をX座標、Y座標に配置する関数
function placeImage(x, y, imagePath, id) {
  var imageElement = document.createElement('img');
  imageElement.src = imagePath;
  imageElement.style.position = 'absolute';
  imageElement.style.left = x + 'px';
  imageElement.style.top = y + 'px';
  imageElement.id = id; // 識別子を追加

  document.body.appendChild(imageElement);
  imageElements.push(imageElement); // 配列に画像要素を追加
}


// 乱数生成関数
function randint(min,max){
    let randomint = Math.floor( Math.random() * (max + 1 - min) ) + min ;
    return randomint;
}

// ツリーをランダムに表示する関数
function tree_out(){
    let x_y_array = []
    const window_width = window.innerWidth - 50;
    const window_height = window.innerHeight - 50;
    // 木を配置するx座標、Y座標をランダムに決定(5,window_???)
    let random_min = 5;
    let count = 0;
    while (true){
	if (count == 5){
	    break;
	} else {
            // X座標
            let x =  randint(random_min,window_width);
            // Y座標
            let y = randint(random_min,window_height);
	    x_y_array.push([x,y]);
	    
            // 表示
	    let str_count = String(count);
	    let tree_id = "count_${str_count}";
            placeImage(x, y,"tree.png",tree_id);
	    count = count + 1;
	}
    }
    return x_y_array;
}

// ステータスを見る関数
async function showStatus(HP,maya,money) {
  let str_hp = String(HP);
  let str_maya = String(maya);
  let str_money = String(money);
  await showRetroAlert(`HP: ${str_hp}, MAYA: ${str_maya}, MONEY: ${str_money}`);
}

// プレイヤー表示関数
function playerout(){
    placeImage(700,300,"player.png","player");
}

// ホームレスを50%の確率で表示させる関数
// ホームレスを50%の確率で表示させる関数
function homeless_out() {
  let x_y_array = [];
  let rand = randint(1, 2);
  if (rand === 1) {
    // 表示
    // ランダムに座標を決めて表示
    const window_width = window.innerWidth - 50;
    const window_height = window.innerHeight - 50;
    // ホームレスを配置するx座標、Y座標をランダムに決定(5,window_???)
    let random_min = 5;
    let count = 0;
    // X座標
    let x = randint(random_min, window_width);
    // Y座標
    let y = randint(random_min, window_height);
    x_y_array.push([x, y]);
    // 表示
    placeImage(x, y, "homeless.png", "homeless");
    return x_y_array;
  } else {
    return false;
  }
}


function removeImageById(id) {
  var indexToRemove = -1;
  for (var i = 0; i < imageElements.length; i++) {
    if (imageElements[i].id === id) {
      indexToRemove = i;
      break;
    }
  }

  if (indexToRemove !== -1) {
    var removedElement = imageElements.splice(indexToRemove, 1)[0];
    removedElement.parentNode.removeChild(removedElement);
  }
}

// ホームレスを削除する関数
function removeHomeless() {
  removeImageById("homeless");
  x_y_homeless = null; // x_y_homelessをnullに設定
}

function getImagePositionById(id) {
  var imageElement = document.getElementById(id);

  if (imageElement) {
    var imageRect = imageElement.getBoundingClientRect();
    var x = imageRect.left + window.scrollX;
    var y = imageRect.top + window.scrollY;

      return [x,y];
  } else {
    return null;
  }
}

// Y座標UP
function ArrowUp(){
    const window_width = window.innerWidth - 50;
    const window_height = window.innerHeight - 50;
    // playerのy座標を5px上に上げる
    // playerのx座標、y座標を取得
    let player_x_y = getImagePositionById("player");
    let x = player_x_y[0]
    let y = player_x_y[1];
    let after_y = y-5;
    if (after_y < 50){
	display_outer();
    } 
    // playerを消す
    removeImageById("player");
    // 配置
    placeImage(x,after_y,"player.png","player");
    //近くにホームレスがいたら
    homeless_near_out();
    // 敵
    robber_why_out(x,after_y);
}

// Y座標DOWN
function ArrowDown(){
    // playerのy座標を5px下に下げる
    // playerのx座標、y座標を取得                                                                                                                                                                          
    let player_x_y = getImagePositionById("player");
    let x = player_x_y[0]
    let y = player_x_y[1];
    let after_y = y+5;
    const window_height = window.innerHeight - 50;
    if (after_y > window_height){
	display_outer();
    }
    // playerを消す                                                                                                                                                                                        
    removeImageById("player");
    // 配置                                                                                                                                                                                                
    placeImage(x,after_y,"player.png","player");
    homeless_near_out();
    robber_why_out(x,after_y);
}

// X座標UP
function ArrowLeft(){
    const window_width = window.innerWidth - 50;
    const window_height = window.innerHeight - 50;
    // playerのx座標を5px上げる                                                                                                                                                                        
    // playerのx座標、y座標を取得                                                                                                                                                                          
    let player_x_y = getImagePositionById("player");
    let x = player_x_y[0]
    let y = player_x_y[1];
    let after_x = x+5;
    if (after_x > window_width){
	display_outer();
    }
    // playerを消す                                                                                                                                                                                        
    removeImageById("player");
    // 配置                                                                                                                                                                                                
    placeImage(after_x,y,"player.png","player");
    homeless_near_out();
    robber_why_out(after_x,y)
}

// X座標DOWN(右)
function ArrowRight(){
    // playerのx座標を5px下げる
    // playerのx座標、y座標を取得                                                                                                                                                                          
    let player_x_y = getImagePositionById("player");
    let x = player_x_y[0]
    let y = player_x_y[1];
    let after_x = x-5;
    const window_width = window.innerWidth - 50;
    if (after_x < 50){
	display_outer();
    }
    // playerを消す                                                                                                                                                                                    
    removeImageById("player");
    // 配置                                                                                                                                                                                                
    placeImage(after_x,y,"player.png","player");
    homeless_near_out();
    robber_why_out(after_x,y)
}

        
// 保存する関数
function save(){
    localStorage.setItem('hp', HP);
    localStorage.setItem('maya', maya);
    localStorage.setItem('money', money);
}

// 画面が切れた時
function display_outer(){
    // セーブしてリロード
    save();
    // リロード
    window.location.reload();

}
// 労働
async function work() {
  if (HP < 20) {
    await showRetroAlert("あなたは働けません。");
  } else {
    // HP減らす
    HP = HP - 20;
    if (HP > 1){
        await showRetroAlert("働いた場合あなたは死ぬため、働けません");	  
    }
    // MONEY増やす
    money = Number(money) + 10;
    await save();
    await showRetroAlert("体力は大事に使ってください。労働しました");
  }
}

function near_homeless() {
  // プレイヤーのx,y座標を取得
  let player_x_y = getImagePositionById("player");
  let x = player_x_y[0];
  let y = player_x_y[1];

  // ホームレスが表示されていない場合はfalseを返す
  if (x_y_homeless === null) {
    return false;
  }

  let x_homeless = x_y_homeless[0][0];
  let y_homeless = x_y_homeless[0][1];
  let distance = Math.sqrt((x - x_homeless) ** 2 + (y - y_homeless) ** 2);
  if (distance <= 10) {
    return true;
  } else {
    return false;
  }

}

function homeless_help(){
    let num_money = Number(money);
    if (num_money < 10){
	showRetroAlert("あなたはホームレスを助けることはできません");
	showRetroAlert("ホームレス：お互い、頑張ろうな!");
    } else {
        money = Number(money) - 10;
        maya = Number(maya) + 5;
        let homeless_ans_pattern = randint(1,3)
	save();
        if (homeless_ans_pattern == 1){
	    showRetroAlert("ホームレス：ありがとう、ありがとう。本当にありがとう。君は命の恩人だ。");
	    showRetroAlert("Player は ホームレス を助けた。ホームレス は Playerに最大限の感謝をしている");
        } else if (homeless_ans_pattern == 2){
	    showRetroAlert("ホームレス：いいのか！？本当に!?ありがとう!");
	    showRetroAlert("Player は ホームレス を助けた。ホームレス は Playerに最大限の感謝をしている");
        } else{
	    showRetroAlert("ホームレス：...");
	    showRetroAlert("Player は ホームレス を助けた。ホームレス は Playerに最大限の感謝をしている");
        }
    }
}

// 敵を発生させる関数
// 移動した後に10%の確率で発生する
async function robber_why_out(x,y){
    let rand = randint(1,250);
    if (rand == 236){
	// 発生
	// 配置
	// 合計10マヤを与えないとずっと攻撃してくる
	placeImage(700,300,"hukurou.png","robber");
	await showRetroAlert("モクロー があらわれた!");
	// ループ
	let gave_maya = 0;
	let count = 0;
	while (true){
	    if (Number(HP) < 1){
		await showRetroAlert("あなたは体力不足で死んだ");
                // local strage  クリア
		localStorage.clear();
		localStorage.setItem('hp', 100);
                localStorage.setItem('maya', 0);
                localStorage.setItem('money', 0);
                location.reload();
	    } else if (Number(gave_maya) == 10){
		await showRetroAlert("モクロー は 可視化され、 かわいいモクロー へ進化した");
		// 画像削除
		break;
	    } else if (Number(count) == 10){
		await showRetroAlert("モクロー は疲れて逃げた");
		removeImageById("robber");
		break;
	    } else {
		let str_hp = String(HP);
		let str_maya = String(maya);
		let text = `現在のステータス:HP:${str_hp},MAYA:${str_maya}  2マヤを与えますか?`
		let res = await showConfirm(text)
		if (res == true){
		    // 与える
		    if (Number(maya) < 2){
			await showRetroAlert("あなたは2マヤを与えられません");
		    } else {
		        maya = Number(maya) - 2;
		        gave_maya = Number(gave_maya) + 2;
			save();
		    }
		}
		await showRetroAlert("モクローが攻撃してきた!");
                HP = Number(HP) - 2;
		save();
		count = Number(count) + 1;
	    }
	}
    }
}
// ホームレスが近くにいたら
async function homeless_near_out(){
    if (near_homeless()){
        // flagがfalseなら表示、trueだったら表示しない                                                                                                                                                     
        if (flag == false){
            // 助けるか                                                                                                                                                                                    
            let res = await showConfirm("ホームレスを助けますか?");
            // 助ける                                                                                                                                                                                      
            if (res == true){
                homeless_help();
                //ホームレスを削除                                                                                                                                                                         
                removeHomeless();
            // 助けない                                                                                                                                                                                    
            } else{
                flag = true;
            }
        } else {
            // true                                                                                                                                                                                        
            // 何もしない                                                                                                                                                                                  
        }
    }
}

function convert(){
    // money10でHP5                                                                                                                                                                                      
      if (money > 10) {
          showRetroAlert("あなたはエナジードリンクを買うことはできません");
      } else{
          money = Number(money) - 10;
          HP = Number(HP) + 5;
          save();
          showRetroAlert("Player はエナジードリンクを買って飲み、体力を回復させた");
          let text = `HP:${HP}, maya:${maya}, money:${money}`;
          showRetroAlert(text);
      }
}

function showRetroAlert(message) {
    return new Promise((resolve) => {
        document.getElementById('retroAlertMessage').innerText = message;
        document.getElementById('retroAlert').style.display = 'flex';
        document.getElementById('retroAlert').onclick = () => {
            closeRetroAlert();
            resolve();
        };
    });
}

   
function closeRetroAlert() {
    document.getElementById('retroAlert').style.display = 'none';
}

function showConfirm(message) {
    return new Promise((resolve) => {
        document.getElementById('customConfirmMessage').innerText = message;
        document.getElementById('customConfirm').style.display = 'flex';
        document.getElementById('confirmYes').addEventListener('click', () => {
            handleConfirm(true, resolve);
        });
        document.getElementById('confirmNo').addEventListener('click', () => {
            handleConfirm(false, resolve);
        });
    });
}

function handleConfirm(result, resolve) {
    document.getElementById('customConfirm').style.display = 'none';
    resolve(result);
}

