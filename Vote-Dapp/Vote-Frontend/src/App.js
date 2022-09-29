// reactからReactとuseEffect、useStateをインポートする。
import React,{useEffect,useState} from "react";
// ethers変数を使えるようにインポートする。
import {ethers} from "ethers";
// ABIファイルを含むVotePortal.jsonファイルをインポートする。
import abi from "./utils/VotePortal.json";
// App関数を定義する。
const App = () => {
    // ユーザのウォレットを保存するために使用する状態変数を定義する。
    const[CurrentAccount,SetCurrentAccount] = useState("");
    // コントラクトアドレスを定義する。
    const contractAddress = "0xef0e70a0E92e4757F1959c7F5BCd91Fb10ECe40e";
    // ABIの内容を参照する変数を作成
    const contractABI = abi.abi;
    // すべてのCandidacyを保存する状態変数を定義する。
    const[SetAllCandidacy] = useState([]);
    // ユーザの現在のアカウントを表示する。この段階ではCurrentAccountは空である。
    console.log("CurrentAccount:",CurrentAccount);    
    // ウォレットが接続されているかチェックする。window.ethereumに接続できること、つまりMetaMaskに接続できることを確認する。
    const CheckIfWalletIsConnected = async() =>{
        try{
        // Webサイトを訪問したユーザがMetaMaskを持っているか確認する。
            const {ethereum} = window;
            // MetaMaskを持っていない場合
            if(!ethereum){
                // 「MetaMaskを確認してください。」と表示する。
                console.log("MetaMaskを確認してください。");
                return;
            // MetaMaskを持っている場合
            } else{
                // 「MetaMasを持っています。」と表示する。
                console.log("MetaMaskを持っています。",ethereum);
            }
            // AccountsにWEBサイトを訪れたユーザのウォレットアカウントを格納する。複数の場合もあるので、sをつけている。eth_accountsは空の配列または単一のアカウントアドレスを返すメソッドである。
            const Accounts = await ethereum.request({method:"eth_accounts"});
            // アカウントの文字列がゼロでない場合　つまり　1つでもアカウントがある場合
            if(Accounts.length !==0){
                // Accountsの配列の1番目をAccountに格納する。
                const Account = Accounts[0];
                // 接続されたアカウントが見つかりました。と表示する。
                console.log("続されたアカウントが見つかりました。",Account);
                // CurrentAcountにユーザのアカウントアドレスを格納する。
                SetCurrentAccount(Account);
            //アカウントの文字列がゼロの場合　つまりアカウントがない場合
            }else{
                // 接続されたアカウントがありません。と表示する。
                console.log(" 接続されたアカウントがありません。");
            }
        // 例外処理を記載する。エラーオブジェクトを呼び出す。
        }catch(error){
            // エラーを表示する。
            console.log(error);
        }
    };
    //connectWalletメソッドを実装する。
    const ConnectWallet = async()=>{
        // try-catch構文にて例外処理を定義する。
        try{
            // Webサイトを訪問したユーザがMetaMaskを持っているか確認する。
            const {ethereum} = window;
            // MetaMaskを持っていない場合
            if(!ethereum){
                // MetaMaskを設定してください。と表示する。
                alert("MetaMaskを設定してください。");
                // 実行する。
                return;
            }
            // MetaMaskを持っている場合は、接続許可を求める。eth_requestAccountsメソッドによりMetaMaskからユーザに接続確認を求める。
            const Accounts = await ethereum.request({method:"eth_requestAccounts"});
            // 最初のアドレスをCurrentAddressに格納する。
            console.log("接続されたアドレス: ",Accounts[0]);
            SetCurrentAccount(Accounts[0]);
        }catch(error){
            console.log(error);
        }
    };
    const Candidacy = async()=>{
        try{
            //ユーザーがMetaMaskを持っているか確認する。
            const {ethereum} = window;
            // MetaMaskを持っている場合
            if(ethereum){
                // providerを設定する。ユーザhブロックチェーン上のノードにアクセスができるようになる。
                const provider = new ethers.providers.Web3Provider(ethereum);
                // ユーザのウォレットアドレスを抽象化する。providerを作成し、provider.getSigner()関数を呼び出すだけで、ユーザはウォレットアドレスを使用してトランザクションに署名し、ブロックチェーンネットワークに送信ができる。
                const signer = provider.getSigner();
                // コントラクトへの接続をしている。
                const VotePortalContract = new ethers.Contract(
                    // コントラクトのデプロイ先のアドレス
                    contractAddress,
                    // コントラクトのABI
                    contractABI,
                    // provider(読み取りのみ)もしくはsigner（読み書き両方できる）
                    signer
                );
                // コントラクトに立候補する
                const CandidancyTxn =await VotePortalContract.Candidacy();
                console.log("Candidating -",CandidancyTxn.hash);
                await CandidancyTxn.wait();
                console.log("Candidated -",CandidancyTxn.hash);
                // //CandidacyAddressの変数に立候補したアドレスを格納する。
                // let CandidacyAddress = await VotePortalContract.Candidacy();
                // CandidacyAddressがstand in Chairman electionと表示する。
                // console.log("%d stand in an Chairman election.",CandidacyAddress.toString());
                // コントラクトのCassndidancy関数を呼び出しCandidancyAddress変数に格納する。
                // let CandidancyAddress;
                // CandidancyAddress = await VotePortalContract.Candidancy();
                // CandidancyAddressを表示する。
                // console.log("%d stand in an Chairman election.",CandidacyAddress.toString());
                // 2週間の選挙期間が始まる。と表示する。
                console.log("2週間の選挙期間が始まる。");
                console.log("Signer",signer);
                // let CandidancyList = await VotePortalContract.GetAllCandidacyList();
                // console.log("%d",CandidacyList.toString());
            }else{
                console.log("Ethereum object doesn't exist!");
            }
        }catch(error){
            console.log(error);
        }
    };

    const GetAllCandidacyList = async()=>{
        try{
            //ユーザーがMetaMaskを持っているか確認する。
            const {ethereum} = window;
            // MetaMaskを持っている場合
            if(ethereum){
                // providerを設定する。ユーザhブロックチェーン上のノードにアクセスができるようになる。
                const provider = new ethers.providers.Web3Provider(ethereum);
                // ユーザのウォレットアドレスを抽象化する。providerを作成し、provider.getSigner()関数を呼び出すだけで、ユーザはウォレットアドレスを使用してトランザクションに署名し、ブロックチェーンネットワークに送信ができる。
                const signer = provider.getSigner();
                // コントラクトへの接続をしている。
                const VotePortalContract = new ethers.Contract(
                    // コントラクトのデプロイ先のアドレス
                    contractAddress,
                    // コントラクトのABI
                    contractABI,
                    // provider(読み取りのみ)もしくはsigner（読み書き両方できる）
                    signer
                );
                // コントラクトからGetAllCandidacyListを呼び出す
                const CandidacyLists = await VotePortalContract.GetAllCandidacyList();
                // UIに必要なアドレス　タイムスタンプを呼び出す
                const CandidacyCleaned = CandidacyLists.map((Candidacylist) =>{
                    return{
                        address:Candidacy.Candidacy,
                        timestamp:new Date(Candidacy.timestamp * 1000),
                    };
                });
                // React Stateにデータを格納する
                SetAllCandidacy(CandidacyCleaned);
            }else{
                console.log("Ethereum object doesn't exist!");
             }
         } catch (error) {
             console.log(error);
        }
    };
    // Webページがロードされたときに下記の関数を実行する。
    useEffect(()=>{
        // ウォレットが接続されているかチェックする。
        CheckIfWalletIsConnected();
    },[]);

    // emitされたイベントに反応する。
    useEffect(()=>{
        let VotePortalContract;

        const onNewCandidate = (from,timestamp) => {
            console.log("NewCandidate",from,timestamp);
            SetAllCandidacy((prevState) => [
                ...prevState,
                {
                    address:from,
                    timestamp:new Date(timestamp * 1000),
                },
            ]);
        };
    /* NewWaveイベントがコントラクトから発信されたときに、情報を受け取ります */
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        VotePortalContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );
        VotePortalContract.on("NewCandidate", onNewCandidate);
    }
    /*メモリリークを防ぐために、NewCandidateのイベントを解除します*/
    // return () => {
    // if (VotePortalContract) {
    //   VotePortalContract.off("NewCandidate", onNewCandidate);
    //         }
    //     };
    }, []);
    
    // 実行内容を記載する。
    return(
        // MetaMaskを接続してください。と表示する。
        <div>
        <div>*****************************************************</div>
        <div>1.MetaMaskを接続してください。</div>
        <div>*****************************************************</div>
        {/* MetaMaskを接続する。のボタンを表示する。 */}
        <div>
            {/* ウォレット接続ボタンを実装する。 */}
            {/* ウォレット接続されていない場合 */}
            {!CurrentAccount&&(
            <button onClick={ConnectWallet}>MetaMaskを接続する。</button>)}
            {/* ウォレット接続されている場合 */}
            {CurrentAccount&&(
            <button onClick={ConnectWallet}>MetaMaskに接続されている。</button>)}
        </div>
        <div>
            {/* 立候補ボタンを実装する */}
            <div>*****************************************************</div>
            <div>2.立候補希望者は、会長に立候補してください。</div>
            <div>*****************************************************</div>
            {/* {立候補していない場合} */}
            <button onClick={Candidacy}>立候補する。</button>
        </div>
        <div>
            {/* 立候補者リストを実装する */}
            <div>*****************************************************</div>
            <div>3.立候補者リストを表示する。</div>
            <div>*****************************************************</div>
            <button onClick={GetAllCandidacyList}>立候補者リスト</button>
        </div>
        </div>
    );
};
export default App;