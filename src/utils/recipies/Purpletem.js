import {
    alloyOffset,
    deviceOffset, gelOffset, grindstoneOffset,
    ketonOffset, kohlOffset, manganeseOffset,
    orirockOffset,
    orironOffset,
    polyesterOffset, rmaOffset,
    sugarOffset
} from "@/utils/recipies/ItemOffsets";
import BlueItem from "@/utils/recipies/BlueItem";
import get from "@/utils/getters";

 class PurpleItem {
    constructor(itemOffset, ...craftingMatsOffsets) {
        this.itemOffset = itemOffset;
        this.craftingMatsOffsets = craftingMatsOffsets;
    }

    getSanityValue() {
        const lowestFarmingSanity = Number(get.items.lowestStageSanityByItemId(30004 + this.itemOffset));
        const craftingSanity = this.craftingMatsOffsets
            .map(craftingMatOffset => BlueItem.getSanityFor(30003 + craftingMatOffset))
            .reduce((agg, sanity) => agg + sanity, 0)
        return Math.min(lowestFarmingSanity, craftingSanity);
    }
}

const itemsDb = {
    // Orirock Concentration
    30014: new PurpleItem(orirockOffset, orirockOffset, orirockOffset, orirockOffset, orirockOffset),
    // Sugar Lump
    30024: new PurpleItem(sugarOffset, sugarOffset, sugarOffset, orironOffset, manganeseOffset),
    // Polyester Lump
    30034: new PurpleItem(polyesterOffset, polyesterOffset, polyesterOffset, ketonOffset, kohlOffset),
    // Oriron Block
    30044: new PurpleItem(orironOffset, orironOffset, orironOffset, deviceOffset, polyesterOffset),
    // Keton Colloid
    30054: new PurpleItem(ketonOffset, ketonOffset, ketonOffset, sugarOffset, manganeseOffset),
    // Optimized Device
    30064: new PurpleItem(deviceOffset, deviceOffset, orirockOffset, orirockOffset, grindstoneOffset),
    // White Horse Kohl
    30074: new PurpleItem(kohlOffset, kohlOffset, sugarOffset, rmaOffset),
    // Manganese Trihydrate
    30084: new PurpleItem(manganeseOffset, manganeseOffset, manganeseOffset, polyesterOffset, kohlOffset),
    // Grindstone Pentahydrate
    30094: new PurpleItem(grindstoneOffset, grindstoneOffset, orironOffset, deviceOffset),
    // RMA70-24
    30104: new PurpleItem(rmaOffset, rmaOffset, orirockOffset, orirockOffset, ketonOffset),
    // Polymerized Gel
    31014: new PurpleItem(gelOffset, orironOffset, gelOffset, alloyOffset),
    // Incandescent Alloy Black
    31024: new PurpleItem(alloyOffset, deviceOffset, grindstoneOffset, alloyOffset),
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