import sdk from "./1-initialize-sdk.js";

// ガバナンスコントラクトのアドレスを設定します
const vote = sdk.getContract("0x391da075D0147F990030dD99c094006686691A09", "vote");

// ERC-20 コントラクトのアドレスを設定します。
const token = sdk.getContract("0x9f97394D3DAec9E4622dd3fA501d0C80416142bb", "token");

(async () => {
  try {
    // 必要に応じて追加のトークンを作成する権限をトレジャリーに与えます
    await (await token).roles.grant("minter", (await vote).getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // ウォレットのトークン残高を取得します
    const ownedTokenBalance = await (await token).balanceOf(
      process.env.WALLET_ADDRESS!
    );

    // 保有する供給量の 90% を取得します
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = Number(ownedAmount) / 100 * 90;

    // 供給量の 90% をガバナンスコントラクトへ移動します
    await (await token).transfer(
      (await vote).getAddress(),
      percent90
    );

    console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();