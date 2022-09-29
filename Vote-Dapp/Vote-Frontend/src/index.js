// javascriptのフレームワークであるreactからReactをインポートする。
import React from 'react';
// react-dom（仮想DOM）からReactDomモジュールをインポートする。
import ReactDOM from 'react-dom';
// AppファイルからAppをインポートする
import App from './App';
//rootのIDをもつDOM要素（コンテナ）にAppの要素をレンダリングする。
ReactDOM.render(<App />, document.getElementById('root'));
