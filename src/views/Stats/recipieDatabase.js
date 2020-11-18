import itemUtils from "@/views/Stats/itemUtils";

const orirockOffset = 10;
const sugarOffset = 20;
const polyesterOffset = 30;
const orironOffset = 40;
const ketonOffset = 50;
const deviceOffset = 60;
const kohlOffset = 70;
const manganeseOffset = 80;
const grindstoneOffset = 90;
const rmaOffset = 100;
const gelOffset = 1010;
const alloyOffset = 1020;

function calculateGreenItem(itemOffset) {
    return () => {
        const lowestFarmingSanity = Number(itemUtils.getLowestSanityPerItem(30002 + itemOffset));
        const craftingSanity = Number(itemUtils.getLowestSanityPerItem(30001 + itemOffset)) * 3;
        return Math.min(lowestFarmingSanity, craftingSanity);
    }
}

function calculateBlueItem(itemOffset, multiplier = 4) {
    return () => {
        const lowestFarmingSanity = Number(itemUtils.getLowestSanityPerItem(30003 + itemOffset));
        const craftingSanity = calculateGreenItem(itemOffset)() * multiplier;

        if (craftingSanity > 0) {
            return Math.min(lowestFarmingSanity, craftingSanity);
        } else {
            return lowestFarmingSanity;
        }

    }
}

// TODO: Orirock Concentration fixen
function calculatePurpleItem(itemOffset, ...craftingMatsOffsets) {
    return () => {
        const lowestFarmingSanity = Number(itemUtils.getLowestSanityPerItem(30004 + itemOffset));
        const craftingSanity = craftingMatsOffsets
            .map(craftingMatOffset => calculateBlueItem(craftingMatOffset)())
            .reduce((agg, sanity) => agg + sanity, 0)
        return Math.min(lowestFarmingSanity, craftingSanity);
    }
}

function calculateBattleRecord(offset, factor) {
    return () => {
        const lowestSanityCurrent = Number(itemUtils.getLowestSanityPerItem(2000 + offset));
        const lowestSanityPrevious = offset <= 0 ? 0 : Number(itemUtils.getLowestSanityPerItem(2000 + offset - 1));
        const craftingSanity = lowestSanityPrevious * factor;
        if (craftingSanity > 0) {
            return Math.min(lowestSanityCurrent, craftingSanity);
        } else {
            return lowestSanityCurrent;
        }

    }
}

const lowestCraftingValueDatabase = {
    // Orirock Cube
    30012: calculateGreenItem(orirockOffset),
    // Sugar
    30022: calculateGreenItem(sugarOffset),
    // Polyester
    30032: calculateGreenItem(polyesterOffset),
    // Oriron
    30042: calculateGreenItem(orironOffset),
    // Polyketon
    30052: calculateGreenItem(ketonOffset),
    // Device
    30062: calculateGreenItem(deviceOffset),
    // Orirock Cluster
    30013: calculateBlueItem(orirockOffset, 5),
    // Sugar Pack
    30023: calculateBlueItem(sugarOffset),
    // Polyester Pack
    30033: calculateBlueItem(polyesterOffset),
    // Oriron Cluster
    30043: calculateBlueItem(orironOffset),
    // Aketon
    30053: calculateBlueItem(ketonOffset),
    // Integrated Device
    30063: calculateBlueItem(deviceOffset),
    // Orirock Concentration
    30014: calculatePurpleItem(orirockOffset, orirockOffset, orirockOffset, orirockOffset, orirockOffset),
    // Sugar Lump
    30024: calculatePurpleItem(sugarOffset, sugarOffset, sugarOffset, orironOffset, manganeseOffset),
    // Polyester Lump
    30034: calculatePurpleItem(polyesterOffset, polyesterOffset, polyesterOffset, ketonOffset, kohlOffset),
    // Oriron Block
    30044: calculatePurpleItem(orironOffset, orironOffset, orironOffset, deviceOffset, polyesterOffset),
    // Keton Colloid
    30054: calculatePurpleItem(ketonOffset, ketonOffset, ketonOffset, sugarOffset, manganeseOffset),
    // Optimized Device
    30064: calculatePurpleItem(deviceOffset, deviceOffset, orirockOffset, orirockOffset, grindstoneOffset),
    // White Horse Kohl
    30074: calculatePurpleItem(kohlOffset, kohlOffset, sugarOffset, rmaOffset),
    // Manganese Trihydrate
    30084: calculatePurpleItem(manganeseOffset, manganeseOffset, manganeseOffset, polyesterOffset, kohlOffset),
    // Grindstone Pentahydrate
    30094: calculatePurpleItem(grindstoneOffset, grindstoneOffset, orironOffset, deviceOffset),
    // RMA70-24
    30104: calculatePurpleItem(rmaOffset, rmaOffset, orirockOffset, orirockOffset, ketonOffset),
    // Polymerized Gel
    31014: calculatePurpleItem(gelOffset, orironOffset, gelOffset, alloyOffset),
    // Incandescent Alloy Black
    31024: calculatePurpleItem(alloyOffset, deviceOffset, grindstoneOffset, alloyOffset),
    2002: calculateBattleRecord(2, 2),
    2003: calculateBattleRecord(3, 2.5),
    2004: calculateBattleRecord(4, 2)
}

export default {
    getSanityValue(itemId) {
        const itemRecipe = lowestCraftingValueDatabase[itemId];
        if (itemRecipe) {
            return itemRecipe()
        } else {
            return itemUtils.getLowestSanityPerItem(itemId);
        }
    }
}