module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
         fontFamily:{
            'montserrat': ['Montserrat', 'sans-serif']
        },
        extend: {},
    },
    plugings: [
        require( 'daisyui' ),
    ],
    daisyui: {
        themes: [ 'night']
    },
}