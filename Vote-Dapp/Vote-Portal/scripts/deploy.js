// Javascriptの非同期処理を解決するため、async-await構文を設定する。mainに実行結果を格納する。
const main = async() =>{
  // hardhatネットワークのアカウントを取得する。deployerに格納する。
  const [deployer] = await hre.ethers.getSigners();
  // deployerのアカウント残高を取得する。accountBalanceに格納する。
  const accountBalance = await deployer.getBalance();
  //VotePortalコントラクトをコンパイルする。コンパイル後のファイルはartifactsファイルに作成される。 
  const VoteContract = await hre.ethers.getContractFactory("VotePortal");
  // hardhatがEthereumネットワークをコントラクトのためだけに作成する。
  const VotePortal = await VoteContract.deploy();
  // デプロイ元コントラクトアドレスを表示する。
  console.log("デプロイ元コントラクトアドレス：",deployer.address);
  //デプロイ元コントラクトアドレスの残高を文字列に変換して表示する。
  console.log("デプロイ元アドレスのアカウント残高：",accountBalance.toString());
  // デプロイ先コントラクトアドレスを表示する。
  console.log("デプロイ先コントラクトアドレス：",VotePortal.address);
};

// Javascriptの非同期処理を解決するため、async-await構文を設定する。runMainに実行結果を格納する。
const runMain = async() =>{
  // try-catch構文にて、原則と例外処理を定義する。
  try{
    // mainの処理を実行する。
    await main();
    // 正常動作し終了する。
    process.exit(0);
  // 例外処理を定義する。エラーを表示する。
  }catch(error){
    // errorオブジェクトを呼び出して表示する。
    console.error(error);
    // 異常動作として終了する。
    process.exit(1);
  }
};
// 上記で定義したrunMain関数を実行する。
runMain();