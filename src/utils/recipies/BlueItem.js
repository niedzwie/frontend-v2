import GreenItem from "@/utils/recipies/GreenItem";
import {
    alloyOffset,
    deviceOffset, gelOffset, grindstoneOffset,
    ketonOffset, kohlOffset, manganeseOffset,
    orirockOffset,
    orironOffset,
    polyesterOffset, rmaOffset,
    sugarOffset
} from "@/utils/recipies/ItemOffsets";
import get from "@/utils/getters";

class BlueItem {
    itemOffset;
    multiplier;

    constructor(itemOffset, multiplier = 4) {
        this.itemOffset = itemOffset;
        this.multiplier = multiplier;
    }

    getSanityValue() {
        const lowestFarmingSanity = Number(get.items.lowestStageSanityByItemId(30003 + this.itemOffset));
        const craftingSanity = GreenItem.getSanityFor(30002 + this.itemOffset) * this.multiplier;

        if (craftingSanity > 0) {
            return Math.min(lowestFarmingSanity, craftingSanity);
        } else {
            return lowestFarmingSanity;
        }
    }
}

const itemsDb = {
    // Orirock Cluster
    30013: new BlueItem(orirockOffset, 5),
    // Sugar Pack
    30023: new BlueItem(sugarOffset),
    // Polyester Pack
    30033: new BlueItem(polyesterOffset),
    // Oriron Cluster
    30043: new BlueItem(orironOffset),
    // Aketon
    30053: new BlueItem(ketonOffset),
    // Integrated Device
    30063: new BlueItem(deviceOffset),
    // Loxi Kohl
    30073: new BlueItem(kohlOffset),
    // Manganese Ore
    30083: new BlueItem(manganeseOffset),
    // Grindstone:
    30093: new BlueItem(grindstoneOffset),
    // RMA70-12
    30103: new BlueItem(rmaOffset),
    // Coagulating Gel
    31013: new BlueItem(gelOffset),
    // Loxic Kohl
    31023: new BlueItem(alloyOffset)
}

export default {
    getSanityFor(itemId) {
        const itemRecipe = itemsDb[itemId];
        if (itemRecipe) {
            return itemRecipe.getSanityValue();
        } else {
            return null;
        }
    }
}