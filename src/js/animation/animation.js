import Vue from "vue"
import { giftTitle } from "../const.js"
import an1 from "../../components/animations/animations1.vue";
import an2 from "../../components/animations/animations2.vue";
import an6 from "../../components/animations/animations6.vue";
import an7 from "../../components/animations/animations7.vue";

Vue.component("an1", an1);
Vue.component("an2", an2);
Vue.component("an6", an6);
Vue.component("an7", an7);

var config = {
    [giftTitle.liuxing]: an1,
    [giftTitle.xin]: an2,
    [giftTitle.taikong]: an6,
    [giftTitle.tianshi]: an7
}

export default { config: config };
