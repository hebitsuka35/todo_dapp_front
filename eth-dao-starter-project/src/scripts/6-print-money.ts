import sdk from "./1-initialize-sdk.js";

const token = sdk.getContract("0x5A38aEDD0A024673E3A6678bf25B13F76B4aaD6b","token");

(async()=>{
    try{
        const amount = 1000000;
        await(await token).mint(amount);
        const totalSupply = await(await token).totalSupply();

        console.log(
            "There now is",
            totalSupply.displayValue,
            "$TSC in circulation"
        );
    }catch(error){
        console.error("Failed to print money",error);
    }
})();