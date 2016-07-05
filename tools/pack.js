import run from './run';
import clean from './clean';
import copy from './copy_components';
import bundle from './bundle';
import render from './render';

async function pack() {
    console.log("PACKAGING COMPONENTS");
    await run(clean);
    await run(copy);
    await run(bundle);
}

export default pack;
