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
        gameState.quizzes = data.results;
        gameState.currentIndex = 0;
        gameState.numberOfCorrects = 0;

        //クイズを開始する処理を実装する
        setNextQuiz();
      });
  };

  //________________________'setNextQuiz'関数を実装する__________________________//
  const setNextQuiz = () => {

    //............................表示要素をリセットする...........................//
    questionElement.textContent = '';

    //解答を全て削除する処理を実装する（関数）
    removeAllAnswers();

    //................条件に応じて、次の問題の表示 or 結果を表示する...............//
    if (gameState.quizzes.length > gameState.currentIndex) {
      //次のクイズ出題
      // fetchQuizData();
      // console.log("tuginomonndai");
      const quiz = gameState.quizzes[gameState.currentIndex];
      makeQuiz(quiz);
    }
    //結果を表示
    else {
      // console.log("syuuryou");
      finishQuiz();
    }

  };
  
  //__________________________'finishQuiz'関数を実装する_________________________________//
  const finishQuiz = () => {
    //正答数を表示する
    resultElement.textContent = `${gameState.numberOfCorrects} / ${gameState.quizzes.length} correct`
    //「Restart」ボタンを表示する
    restartButton.hidden = false;
  };
  
  //________________________'removeAllAnswers'関数を実装する_____________________________//
  const removeAllAnswers = () => {
    //解答を全て削除する
    while(answersContainer.firstChild) {
      answersContainer.removeChild(answersContainer.firstChild);
    }
  };

  //_____________________________'makeQuiz'関数を実装する__________________________________//
  const makeQuiz = (quiz) => {
    //クイズデータを元にWebページ上に問題と解答リストを表示する
    const answers = buildAnswers(quiz);
    questionElement.textContent = unescapeHTML(quiz.question);
    
    answers.forEach((answer, index) =>{
      const liElement = document.createElement('li');
      liElement.textContent = unescapeHTML(answer);
      answersContainer.appendChild(liElement);
      console.log(answer);
      
      
      //解答をクリックしたら、正解・不正解のチェックをする
      liElement.addEventListener('click', (event) => {
        const correctAnswer = unescapeHTML(quiz.correct_answer);
      if(correctAnswer === liElement.textContent) {
        gameState.numberOfCorrects++;
        alert('せいかい！');
      }
      else {
        alert(`まちがい！正解は ${correctAnswer}だよ`);
        console.log(`こたえ：${correctAnswer}`);
      }
      //setNextQuiz関数を実行して次の問題をセットする(最後の問題の場合は結果を表示する。)
      gameState.currentIndex++;
      setNextQuiz();
    });
  });
  };



  //________________________正解・不正解の解答をシャッフルする_____________________________//
  const buildAnswers = (quiz) => {
    const answers = [
      quiz.correct_answer,
      ...quiz.incorrect_answers //...を使うと配列を展開してくれる
    ];
    console.log(answers);
    return shuffle(answers);
  };


  //_______________________________'shuffle'関数を実装する_______________________________//
  const shuffle = (array) => {
    //引数で受け取った配列内の値をシャッフルする
    const newArray = array.slice();

    for(let i = newArray.length - 1; i >= 0; i--) {
    //0〜iのランダムな数値を取得
      const rand = Math.floor(Math.random() * (i + 1));

    //配列の数値を入れ替える
      [newArray[i], newArray[rand]] = [newArray[rand], newArray[i]];
    }
    //コピー後のシャッフルした配列を返す
    return newArray;
  };

  //___________________________'unescapeHTML'関数を実装する_________________________________//
  const unescapeHTML = (str) => {
    const div = document.createElement("div");
    div.innerHTML = str.replace(/</g,"&lt;")
                       .replace(/>/g,"&gt;")
                       .replace(/ /g, "&nbsp;")
                       .replace(/\r/g, "&#13;")
                       .replace(/\n/g, "&#10;");

    return div.textContent || div.innerText;
  };
})();