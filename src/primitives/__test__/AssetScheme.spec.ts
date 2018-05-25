import { AssetScheme } from "..";

test("toJSON", () => {
    const assetScheme = new AssetScheme({
        metadata: "abcd",
        amount: 111,
        registrar: null,
    });
    expect(AssetScheme.fromJSON(assetScheme.toJSON())).toEqual(assetScheme);
});
