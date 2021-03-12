const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
console.log('Loading next configuration...');

const compress = false;

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        console.log('Development mode');
        return {
            compress,
            ...defaultConfig
        }
    }

    console.log('Production mode');
    return {
        compress,
        ...defaultConfig
    }
}
