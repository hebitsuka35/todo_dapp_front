// SPDX-License-Identifier:MIT
// solidityのバージョンを宣言する。
pragma solidity ^0.8.17;
// concole.solをインポートする。
import "hardhat/console.sol";
// VotePortalコントラクトを作成する。
contract VotePortal{
    // NerCandidateイベントの作成
    event NewCandidate(address indexed from,uint timestamp);
    // // CandidacyListという構造体を作成する。
    struct CandidacyList{
        address Candidacy; //立候補したユーザのアドレス
    //     string manifest; //立候補したユーザのマニフェスト
        uint256 timestamp; //立候補した瞬間のタイムスタンプ
    }
    // // 構造体の配列を格納すための変数CandidacyListsを宣言する。これにより、ユーザがフロントエンドから立候補したマニュフェストを保持することができる。
    CandidacyList[] CandidacyLists;
// VotePortal-CandidacyListsと表示するコンストラクタを設定する。
    constructor(){ console.log("VotePortal - CandidacyList");}
    
    // function Candidacy() public {
        // console.log("%s candidate!", msg.sender);

    //Candidacy関数を設定する。
    function Candidacy()public{
        console.log("%s candidate",msg.sender);
    //     // マニフェストをCandidacyListsの配列に格納する。
        CandidacyLists.push(CandidacyList(msg.sender,block.timestamp));
    //     // コントラクト側でemitされたイベントに対する通知をフロントエンドで取得できるようにする。
        emit NewCandidate(msg.sender,block.timestamp);
    }
    // 構造体配列のCandidacyListsをフロントエンドアプリから表示できるようにするGetAllCandidacyList関数を追加する。
    function GetAllCandidacyList() public view returns(CandidacyList[] memory){
         return CandidacyLists;
    }
}