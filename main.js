// session
let HP = localStorage.getItem("hp");
let maya = localStorage.getItem("maya");
let money = localStorage.getItem("money");
if (!HP || !maya || !money){
    HP = 100;
    maya = 0;
    money = 0;
}
// 木をランダムに表示
let x_y_array = tree_out();
// プレイヤーを表示
playerout();
let x_y_homeless = null; // ホームレスの座標を格納する変数を定義
let homeless_status = homeless_out();
if (homeless_status == false) {
  // 確率外れたら何もしない
} else {
  x_y_homeless = homeless_status; // ホームレスの座標を代入
}
if (Number(HP) < 1){
    showRetroAlert("あなたは体力不足で死んだ");
    // session クリア                                                                                                                                                                                    
    localStorage.clear();
    HP = 100;
    maya = 0;
    money=0;
    location.reload();
}
document.addEventListener('keydown', function(event) {
  if (event.key === 'v') {
      showStatus(HP,maya,money);
  } else if (event.key === 'w'){
      ArrowUp();
  } else if (event.key === 's'){
      ArrowDown();
  } else if (event.key === 'd'){
      ArrowLeft();
  } else if (event.key === 'a'){
      ArrowRight();
  // 保存 
  } else if (event.key == 'h'){
      showRetroAlert("saveしました");
      save();
  } else if (event.key == 'r'){
      // 労働
      work();
      showStatus(HP,maya,money);
      save();
  } else if (event.key == 'b'){
      // money10でHP5
      convert();
  }
});
