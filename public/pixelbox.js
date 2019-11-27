let pageSize = [$(window).width(),$(window).height()];
let mousePos = [0,0]; //actual coordinates
let mouseMov = [0,0]; //movement from -1 to 1
let frameList = [];

$(document).ready(()=>{
  pbRun();
})

function pbCreate (target,bkg,images,str,size,overlap,display) {
  //Find the number of layers based on the arguments provided
  const layerCount = Math.min(images.length,str.length);
  //Find the ratio of the img to the frame size
  const ratio = [display[0]/size[0],display[0]/size[0]];

  //Add the background to the frame
  $(target).css('background',`url(${bkg})`);
  $(target).css('background-size',`${display[0]}px ${display[1]}px`);
  $(target).css('width',display[0]);
  $(target).css('height',display[1]);

  let layerSize = [(size[0]+(overlap[0]*2))*ratio[0],(size[1]+(overlap[1]*2))*ratio[1]];

  //Create the layer jQuery objects
  const layers = [];
  for (let i=0; i<layerCount; i++) {
    //Create and style the layers
    const newLayer = $(`<div class='pb-layer'></div>`);
    newLayer.css('background',`url(${images[i]})`);
    newLayer.css('background-size',`${layerSize[0]}px ${layerSize[1]}px`);
    newLayer.css('background-position','center');
    newLayer.css('width',layerSize[0]);
    newLayer.css('height',layerSize[1]);
    newLayer.css('left',-(overlap[0]*ratio[0]));
    newLayer.css('top',-(overlap[1]*ratio[1]))
    console.log('Full width:',display[0]+(overlap[0]*ratio[0]));
    //Add the layers to the array and the frame
    layers.push(newLayer);
    $(target).append(newLayer);
  }



  //Create the attributes object
  const attr = {target,bkg,images,str,size,display,overlap,layers,layerCount,ratio};
  console.log('Attributes:',attr)

  //Save the attributes to the frame's data
  $(target).data('attr',attr);
  //Save the frame attributes to the list of frames
  frameList.push(attr);
}

function pbRun () {
  //Adjust what the page size is

  $(window).resize(()=>{
    pageSize = [$(window).width(),$(window).height()];
  });
  //Find the mousePos and calculate mouseMov
  $(document).mousemove(()=>{
    mousePos = [event.pageX,event.pageY];
    mouseMov = [
      ((mousePos[0]/pageSize[0])*2)-1,
      ((mousePos[1]/pageSize[1])*2)-1
    ];
    //Update frames
    pbUpdate();
  });
}

function pbUpdate () {
  for (let i=0; i<frameList.length; i++) {

    const frame = frameList[i];

    //Find the positions of the frame
    for (let j=0; j<frame.layerCount; j++) {

       let layerX = -Math.round(frame.overlap[0]*(frame.str[j]*frame.ratio[0])*mouseMov[0]);
       let layerY = -Math.round(frame.overlap[1]*(frame.str[j]*frame.ratio[1])*mouseMov[1]);
       frame.layers[j].css('transform',`translate(
           ${layerX}px,
           ${layerY}px`)
    }

  }
}
