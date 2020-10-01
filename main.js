(() => {

  const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple"

  // ---------------「gameState」オブジェクトを作る--------------------//
  // - クイズアプリのデータ管理用オブジェクト

  const gameState = {
    // fetchで取得したクイズデータの配列(results)を保持する
    quizzes: [],
    // 現在何問目のクイズに取り組んでいるのかをインデックス番号で保持する
    currentIndex: 0,
    // 正答数を保持する
    numberOfCorrects: 0
  };

  // ------------HTMLのid値がセットされているDOMを取得する--------------//

  const questionElement = document.getElementById('question');
  const resultElement = document.getElementById('result');
  const answersContainer = document.getElementById('answers');
  const restartButton = document.getElementById('restart_btn');

  //----------------ページの読み込みが完了したらクイズ情報を取得する---------------//

  window.addEventListener('load', (event) => {
    //クイズ情報の取得をおこなう
    fetchQuizData();
  })

  //----------「Restart」ボタンをクリックしたら再度クイズデータを取得する----------//

  restartButton.addEventListener('click', (event) => {
    //クイズ情報の取得をおこなう
    fetchQuizData();
  })

  //-----------------------`fetchQuizData関数`を実装する-------------------------//
  const fetchQuizData = () => {

  //....................Webページ上の表示をリセットする......................//
  questionElement.textContent = 'Now loading...';
  resultElement.textContent = '';
  restartButton.hidden = true;

  //......API_URLとFetch API(fetchメソッド)を使ってAPI経由でデータを取得する.....//
    fetch(API_URL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        gameState.quizzes = data.result;
        gameState.currentIndex = 0;
        gameState.numberOfCorrects = 0;

        //クイズを開始する処理を実装する
      });
  };

})();