import run from './run';
import clean from './clean';
import copy from './copy';
import bundle from './bundle_npm';

async function pack() {
    console.log("PACKAGING COMPONENTS");
    await run(clean);
    await run(copy);
    await run(bundle);
}

export default pack;
