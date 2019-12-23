anime({
    targets: '.card',
    translateY: [50,0],
    opacity: [0,1],
    scale:[0.95,1],
    // duration: 2000,
    delay: anime.stagger(70,{start: 200})
})
anime({
    targets: 'input , i , textarea',
    translateY: [50,0],
    opacity: [0,1],
    scale:[0.95,1],
    skewY:[10,0], 
    // duration: 2000,
    delay: anime.stagger(70,{start: 200, from: 'center'})
})