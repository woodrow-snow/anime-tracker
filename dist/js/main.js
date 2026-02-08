import { Util } from "./utilites.mjs";

async function init() {
    await Util.loadHeaderNavFooter();
    Util.navigation();
}

init();