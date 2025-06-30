const { default: daisyui } = require("daisyui");
const { plugin } = require("postcss");

module.exports ={
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme:{
        extend:{},
    },
    plugins:[
        require('daisyui'),
    ],
    daisyui: {
        themes: ['night']
    }
}