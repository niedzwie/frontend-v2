
const goldId = "3003";
const carbonStickId = "3112";
const carbonBrickId = "3113";
const purpleCarbonBrickId = "3114"

export default {
    isRelevantStage(stageStats) {
        return stageStats.stageType !== "ACTIVITY";
        // const stageExistence = stageStats.existence[server];
        // const isPermanentStage = !stageExistence["openTime"] && !stageExistence["closeTime"]
        //
        // let isRelevant;
        // if (isPermanentStage) {
        //     isRelevant = true;
        // } else {
        //     const isOpen = formatter.checkTimeValid(stageExistence["openTime"], stageExistence["closeTime"])
        //     isRelevant = isOpen === 0;
        // }
        //
        // return isRelevant
    },
    isRelevantItem(item) {
        return item.itemType !== "ACTIVITY_ITEM" && item.itemType !== "FURN" && ![goldId, carbonStickId, carbonBrickId, purpleCarbonBrickId].includes(item.itemId)
    }
}