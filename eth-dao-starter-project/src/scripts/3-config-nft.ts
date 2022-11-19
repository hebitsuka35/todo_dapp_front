import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

// 先ほどメモして残していた editionDrop のコントラクトアドレスをこちらに記載してください
const editionDrop = sdk.getContract("0x6F8816B8979877801b64A4342E9477833e9224F9", "edition-drop");

(async () => {
  try {
    await (await editionDrop).createBatch([
      {
        name: "Member's Limited Sauna Hat",
        description:
          "Tokyo Sauna Collective にアクセスすることができる限定アイテムです",
        image: readFileSync("src/scripts/assets/NFT.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();