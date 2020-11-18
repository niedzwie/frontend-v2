import get from "@/utils/getters";
import stageUtils from "@/views/Stats/stageUtils";

export default {
    initData() {
        get.items.all().forEach(item => {
            get.items.lowestSanityByItemId(item.itemId);
        });

        get.stages.all().forEach(stage => {
            stageUtils.getSanityValue(stage.stageId);
        });
    }
}