(() => {

  const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple"

  // ---------------「gameState」オブジェクトを作る--------------------//
  // - クイズアプリのデータ管理用オブジェクト

  const gameState = {
    // fetchで取得したクイズデータの配列(results)を保持する
    quizzes : [],
    // 現在何問目のクイズに取り組んでいるのかをインデックス番号で保持する
    currentIndex : 0,
    // 正答数を保持する
    numberOfCorrects : 0
  };
  
})();