const app = new Vue({
  el: '#app', // Vueが管理する一番外側のDOM要素
  vuetify: new Vuetify(),
  data: {
    // Vue内部で使いたい変数は全てこの中に定義する
    ID: '', //パラメーター「ID」格納変数
    Place: '', //パラメーター「Place」格納変数
    Description: '',
    Cost: '',
    dataList: [], // データ表示用配列
  },
  methods: {
    // データベースからデータを取得する関数
    readData: async function() {
      //SELECT用のAPIを呼び出し      
      const response = await axios.get('https://m3h-honshou-fapitravel.azurewebsites.net/api/SELECT'); 
      //結果をコンソールに出力
      console.log(response.data);      
      //結果リストを表示用配列に代入
      this.dataList = response.data.List;
    },
    
    // DBにデータを追加する関数
    addData: async function() {
      //Placeの入力チェック（空白なら終了）
      if(!this.Place){
        console.log("旅行した場所が入力されていません。");
        return;
      }    
      //POSTメソッドで送るパラメーターを作成
      const param = {
        Place : this.Place,
        Description : this.Description,
        Cost : this.Cost
      };
      //INSERT用のAPIを呼び出し
      const response = await axios.post('https://m3h-honshou-fapitravel.azurewebsites.net/api/INSERT',param);
      //結果をコンソールに出力
      console.log(response.data);
    },
    
    //DBのデータを削除する関数
    deleteData: async function(ID) {
      this.ID = ID
      //POSTメソッドで送るパラメーターを作成
      const param = {
        ID : this.ID
      };
      //DELETE用のAPIを呼び出し
      const response = await axios.post('https://m3h-honshou-fapitravel.azurewebsites.net/api/DELETE',param);
      //結果をコンソールに出力
      console.log(response.data);
    },
    
    //DBのデータを更新する関数
    updateData: async function(ID) {
      this.ID = ID
      //POSTメソッドで送るパラメータを作成
      const param = {
        ID : this.ID,
        Place : this.Place,
        Description : this.Description,
        Cost : this.Cost
      };
      //UPDATE用のAPIを呼び出し
      const response = await axios.post('https://m3h-honshou-fapitravel.azurewebsites.net/api/UPDATE',param);
      //結果をコンソールに出力
      console.log(response.data);
    },
  }, 
});